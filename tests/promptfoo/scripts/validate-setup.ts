#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import yaml from 'js-yaml';

interface ValidationResult {
  category: string;
  item: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details?: string;
}

class SetupValidator {
  private results: ValidationResult[] = [];
  private readonly projectRoot = path.resolve('.');

  private log(message: string, color: 'green' | 'red' | 'yellow' | 'blue' = 'blue'): void {
    console.log(chalk[color](message));
  }

  private addResult(category: string, item: string, status: 'pass' | 'fail' | 'warn', message: string, details?: string): void {
    this.results.push({ category, item, status, message, details });
  }

  private checkFileExists(filePath: string, category: string, description: string): boolean {
    const fullPath = path.join(this.projectRoot, filePath);
    const exists = fs.existsSync(fullPath);
    
    this.addResult(
      category,
      description,
      exists ? 'pass' : 'fail',
      exists ? `Found: ${filePath}` : `Missing: ${filePath}`,
      exists ? undefined : `Create the file at: ${fullPath}`
    );

    return exists;
  }

  private checkDirectoryExists(dirPath: string, category: string, description: string): boolean {
    const fullPath = path.join(this.projectRoot, dirPath);
    const exists = fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
    
    this.addResult(
      category,
      description,
      exists ? 'pass' : 'fail',
      exists ? `Found directory: ${dirPath}` : `Missing directory: ${dirPath}`,
      exists ? undefined : `Create the directory: mkdir -p ${fullPath}`
    );

    return exists;
  }

  private checkNodeModule(moduleName: string): boolean {
    try {
      require.resolve(moduleName);
      this.addResult(
        'Dependencies',
        moduleName,
        'pass',
        `${moduleName} is available`
      );
      return true;
    } catch (e) {
      this.addResult(
        'Dependencies',
        moduleName,
        'fail',
        `${moduleName} is not installed`,
        `Install with: npm install ${moduleName}`
      );
      return false;
    }
  }

  private checkPromptfooInstallation(): void {
    try {
      const version = execSync('npx promptfoo --version', { encoding: 'utf8', timeout: 10000 }).trim();
      this.addResult(
        'Tools',
        'Promptfoo',
        'pass',
        `Promptfoo is installed (version: ${version})`
      );
    } catch (e) {
      this.addResult(
        'Tools',
        'Promptfoo',
        'fail',
        'Promptfoo is not available',
        'Install with: npm install -g promptfoo'
      );
    }
  }

  private checkTsxInstallation(): void {
    try {
      const version = execSync('npx tsx --version', { encoding: 'utf8', timeout: 10000 }).trim();
      this.addResult(
        'Tools',
        'TSX',
        'pass',
        `TSX is installed (version: ${version})`
      );
    } catch (e) {
      this.addResult(
        'Tools',
        'TSX',
        'fail',
        'TSX is not available',
        'Install with: npm install -D tsx'
      );
    }
  }

  private validateYamlFile(filePath: string, category: string, description: string): boolean {
    const fullPath = path.join(this.projectRoot, filePath);
    
    if (!this.checkFileExists(filePath, category, description)) {
      return false;
    }

    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const parsed = yaml.load(content);
      
      if (parsed && typeof parsed === 'object') {
        this.addResult(
          category,
          `${description} (YAML)`,
          'pass',
          'YAML file is valid and parseable'
        );
        return true;
      } else {
        this.addResult(
          category,
          `${description} (YAML)`,
          'fail',
          'YAML file is not valid or empty'
        );
        return false;
      }
    } catch (e: any) {
      this.addResult(
        category,
        `${description} (YAML)`,
        'fail',
        'YAML file has syntax errors',
        e.message
      );
      return false;
    }
  }

  private checkTestConfiguration(): void {
    // Check main configuration file
    this.validateYamlFile(
      'tests/promptfoo/configs/article-guardrail-review.yaml',
      'Configuration',
      'Main test configuration'
    );

    // Check test suite configurations
    const testSuites = [
      'basic-scenarios.yaml',
      'guardrail-scenarios.yaml',
      'edge-cases.yaml'
    ];

    for (const suite of testSuites) {
      this.validateYamlFile(
        `tests/promptfoo/configs/test-suites/${suite}`,
        'Test Suites',
        suite
      );
    }

    // Check promptfooconfig.yaml
    this.validateYamlFile(
      'tests/promptfoo/promptfooconfig.yaml',
      'Configuration',
      'Promptfoo main config'
    );
  }

  private checkProviders(): void {
    const providers = [
      'tests/promptfoo/providers/claude-code-provider.ts',
      'tests/promptfoo/providers/mock-date-provider.ts'
    ];

    for (const provider of providers) {
      this.checkFileExists(provider, 'Providers', path.basename(provider));
    }
  }

  private checkMockData(): void {
    // Check existing mock articles
    const mockArticles = [
      'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721.md',
      'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721-guardrail-fail.md',
      'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721-empty.md'
    ];

    for (const article of mockArticles) {
      this.checkFileExists(article, 'Mock Data', path.basename(article));
    }

    // Check if we need additional mock data directories
    const mockDirs = [
      'tests/promptfoo/mocks/articles/violations',
      'tests/promptfoo/mocks/articles/edge-cases'
    ];

    for (const dir of mockDirs) {
      const exists = this.checkDirectoryExists(dir, 'Mock Data Directories', path.basename(dir));
      if (!exists) {
        this.addResult(
          'Mock Data Directories',
          path.basename(dir),
          'warn',
          `Directory ${dir} will be needed for comprehensive tests`,
          `Create with: mkdir -p ${path.join(this.projectRoot, dir)}`
        );
      }
    }
  }

  private checkCommandFile(): void {
    const commandFile = '.claude/commands/article_guardrail_review.md';
    const exists = this.checkFileExists(commandFile, 'Commands', 'Article Guardrail Review Command');
    
    if (exists) {
      try {
        const content = fs.readFileSync(path.join(this.projectRoot, commandFile), 'utf8');
        
        // Check for required sections
        const requiredSections = [
          'Review Checklist',
          'Confidential Information', 
          'Security Concerns',
          'Inappropriate Content',
          'Political and Religious Neutrality',
          'Legal and Ethical Compliance',
          'Professional Standards'
        ];

        let missingSections = [];
        for (const section of requiredSections) {
          if (!content.includes(section)) {
            missingSections.push(section);
          }
        }

        if (missingSections.length === 0) {
          this.addResult(
            'Commands',
            'Command Content',
            'pass',
            'All required sections found in command file'
          );
        } else {
          this.addResult(
            'Commands',
            'Command Content',
            'warn',
            `Missing sections: ${missingSections.join(', ')}`
          );
        }
      } catch (e: any) {
        this.addResult(
          'Commands',
          'Command Content',
          'fail',
          'Failed to read or parse command file',
          e.message
        );
      }
    }
  }

  private checkResultsDirectory(): void {
    this.checkDirectoryExists('tests/test-results', 'Output', 'Test Results Directory');
  }

  private checkPackageJson(): void {
    const packagePath = 'tests/promptfoo/package.json';
    const exists = this.checkFileExists(packagePath, 'Package Management', 'package.json');
    
    if (exists) {
      try {
        const packageContent = JSON.parse(fs.readFileSync(path.join(this.projectRoot, packagePath), 'utf8'));
        
        const requiredDeps = ['promptfoo', 'chalk', 'js-yaml'];
        const devDeps = ['tsx', '@types/node', 'typescript'];
        
        let missingDeps = [];
        
        for (const dep of requiredDeps) {
          if (!packageContent.dependencies?.[dep] && !packageContent.devDependencies?.[dep]) {
            missingDeps.push(dep);
          }
        }
        
        for (const dep of devDeps) {
          if (!packageContent.devDependencies?.[dep]) {
            missingDeps.push(`${dep} (dev)`);
          }
        }
        
        if (missingDeps.length === 0) {
          this.addResult(
            'Package Management',
            'Dependencies',
            'pass',
            'All required dependencies are listed'
          );
        } else {
          this.addResult(
            'Package Management',
            'Dependencies',
            'warn',
            `Missing dependencies: ${missingDeps.join(', ')}`
          );
        }
      } catch (e: any) {
        this.addResult(
          'Package Management',
          'package.json parsing',
          'fail',
          'Failed to parse package.json',
          e.message
        );
      }
    }
  }

  private generateReport(): void {
    this.log('\n🔍 Setup Validation Results', 'blue');
    this.log('='.repeat(60), 'blue');

    const categories = [...new Set(this.results.map(r => r.category))];
    let totalPassed = 0;
    let totalFailed = 0;
    let totalWarnings = 0;

    for (const category of categories) {
      this.log(`\n📂 ${category}:`, 'blue');
      
      const categoryResults = this.results.filter(r => r.category === category);
      
      for (const result of categoryResults) {
        let icon = '';
        let color: 'green' | 'red' | 'yellow' = 'green';
        
        switch (result.status) {
          case 'pass':
            icon = '✅';
            color = 'green';
            totalPassed++;
            break;
          case 'fail':
            icon = '❌';
            color = 'red';
            totalFailed++;
            break;
          case 'warn':
            icon = '⚠️';
            color = 'yellow';
            totalWarnings++;
            break;
        }
        
        this.log(`   ${icon} ${result.item}: ${result.message}`, color);
        if (result.details) {
          this.log(`      💡 ${result.details}`, 'yellow');
        }
      }
    }

    this.log('\n' + '='.repeat(60), 'blue');
    
    const total = totalPassed + totalFailed + totalWarnings;
    this.log(`📊 Summary: ${totalPassed} passed, ${totalFailed} failed, ${totalWarnings} warnings (${total} total)`, 'blue');

    if (totalFailed > 0) {
      this.log('\n❌ Setup validation failed. Please fix the issues above before running tests.', 'red');
    } else if (totalWarnings > 0) {
      this.log('\n⚠️ Setup validation passed with warnings. Some features may not work as expected.', 'yellow');
    } else {
      this.log('\n✅ Setup validation passed! All requirements are met.', 'green');
    }
  }

  public async validateSetup(): Promise<boolean> {
    this.log('🔍 Validating Test Setup for Article Guardrail Review', 'blue');
    
    // Check directory structure
    this.checkDirectoryExists('tests/promptfoo', 'Structure', 'Main test directory');
    this.checkDirectoryExists('tests/promptfoo/configs', 'Structure', 'Config directory');
    this.checkDirectoryExists('tests/promptfoo/providers', 'Structure', 'Providers directory');
    this.checkDirectoryExists('tests/promptfoo/mocks', 'Structure', 'Mock data directory');
    this.checkDirectoryExists('tests/promptfoo/scripts', 'Structure', 'Scripts directory');
    
    // Check core files
    this.checkCommandFile();
    this.checkTestConfiguration();
    this.checkProviders();
    this.checkMockData();
    this.checkResultsDirectory();
    this.checkPackageJson();
    
    // Check tools and dependencies
    this.checkPromptfooInstallation();
    this.checkTsxInstallation();
    this.checkNodeModule('chalk');
    this.checkNodeModule('js-yaml');
    
    this.generateReport();
    
    const hasFailures = this.results.some(r => r.status === 'fail');
    return !hasFailures;
  }

  public async checkTestReadiness(): Promise<void> {
    this.log('\n🎯 Testing Basic Functionality', 'blue');
    
    try {
      // Try to run a simple promptfoo command to verify it works
      execSync('npx promptfoo --help', { encoding: 'utf8', timeout: 10000 });
      this.log('✅ Promptfoo CLI is working', 'green');
    } catch (e) {
      this.log('❌ Promptfoo CLI test failed', 'red');
      this.log(`   Error: ${e}`, 'red');
    }
    
    // Check if we can parse the main command file
    try {
      const commandPath = path.join(this.projectRoot, '.claude/commands/article_guardrail_review.md');
      if (fs.existsSync(commandPath)) {
        const content = fs.readFileSync(commandPath, 'utf8');
        if (content.length > 100) { // Basic sanity check
          this.log('✅ Article guardrail command file is readable', 'green');
        } else {
          this.log('⚠️ Article guardrail command file seems too short', 'yellow');
        }
      }
    } catch (e) {
      this.log('❌ Failed to read article guardrail command file', 'red');
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: npx tsx validate-setup.ts [options]

Options:
  --quick, -q    Quick validation only (skip readiness test)
  --help, -h     Show this help message

Examples:
  npx tsx validate-setup.ts         # Full validation
  npx tsx validate-setup.ts --quick # Quick validation only
`);
    return;
  }

  const validator = new SetupValidator();
  
  const isValid = await validator.validateSetup();
  
  if (!args.includes('--quick') && !args.includes('-q')) {
    await validator.checkTestReadiness();
  }
  
  if (!isValid) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { SetupValidator };