#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';
import chalk from 'chalk';

interface ValidationResult {
  name: string;
  status: 'pass' | 'fail';
  message: string;
  details?: string[];
}

class DryRunValidator {
  private results: ValidationResult[] = [];
  
  private log(message: string, color: 'green' | 'red' | 'yellow' | 'blue' = 'blue'): void {
    console.log(chalk[color](message));
  }

  private addResult(name: string, status: 'pass' | 'fail', message: string, details?: string[]): void {
    this.results.push({ name, status, message, details });
  }

  private checkFileExists(filePath: string, description: string): boolean {
    try {
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        this.addResult(description, 'pass', `File exists: ${filePath}`);
        return true;
      } else {
        this.addResult(description, 'fail', `Path exists but is not a file: ${filePath}`);
        return false;
      }
    } catch (e) {
      this.addResult(description, 'fail', `File not found: ${filePath}`);
      return false;
    }
  }

  private validateYamlConfig(filePath: string, description: string): boolean {
    if (!this.checkFileExists(filePath, `${description} - File`)) {
      return false;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = yaml.load(content) as any;
      
      if (!parsed) {
        this.addResult(`${description} - YAML`, 'fail', 'Failed to parse YAML content');
        return false;
      }

      // Basic structure validation
      const issues = [];
      if (!parsed.description) issues.push('Missing description');
      if (!parsed.providers) issues.push('Missing providers');
      if (!parsed.prompts) issues.push('Missing prompts');
      if (!parsed.tests) issues.push('Missing tests');

      if (issues.length > 0) {
        this.addResult(`${description} - Structure`, 'fail', 'Invalid configuration structure', issues);
        return false;
      } else {
        this.addResult(`${description} - Structure`, 'pass', 'Valid YAML structure');
      }

      // Check provider and prompt paths
      if (parsed.providers && parsed.providers[0] && parsed.providers[0].id) {
        const providerPath = parsed.providers[0].id.replace('file://', '');
        if (!fs.existsSync(providerPath)) {
          this.addResult(`${description} - Provider`, 'fail', `Provider file not found: ${providerPath}`);
        } else {
          this.addResult(`${description} - Provider`, 'pass', `Provider file found: ${providerPath}`);
        }
      }

      if (parsed.prompts && parsed.prompts[0] && parsed.prompts[0].file) {
        const promptPath = parsed.prompts[0].file;
        if (!fs.existsSync(promptPath)) {
          this.addResult(`${description} - Prompt`, 'fail', `Prompt file not found: ${promptPath}`);
        } else {
          this.addResult(`${description} - Prompt`, 'pass', `Prompt file found: ${promptPath}`);
        }
      }

      return true;
    } catch (e: any) {
      this.addResult(`${description} - YAML`, 'fail', 'YAML parsing error', [e.message]);
      return false;
    }
  }

  private validateMockArticles(): void {
    const mockArticlesDir = 'mocks/articles';
    
    // Core test articles
    const coreArticles = [
      'weekly-ai-digest-20250721.md',
      'weekly-ai-digest-20250721-guardrail-fail.md',
      'weekly-ai-digest-20250721-empty.md',
      'weekly-ai-digest-minimal.md'
    ];

    for (const article of coreArticles) {
      const filePath = path.join(mockArticlesDir, article);
      this.checkFileExists(filePath, `Mock Article - ${article}`);
    }

    // Violation categories
    const violationTypes = [
      'confidential-info.md',
      'personal-info.md',
      'security-exploits.md',
      'malicious-code.md',
      'inappropriate-content.md',
      'hate-speech.md',
      'political-bias.md',
      'medical-advice.md',
      'false-info.md'
    ];

    for (const violation of violationTypes) {
      const filePath = path.join(mockArticlesDir, 'violations', violation);
      this.checkFileExists(filePath, `Violation Test - ${violation}`);
    }

    // Edge cases
    const edgeCases = [
      'metadata-only.md',
      'corrupted-file.md',
      'legitimate-security.md',
      'unicode-special-chars.md',
      'broken-links.md'
    ];

    for (const edgeCase of edgeCases) {
      const filePath = path.join(mockArticlesDir, 'edge-cases', edgeCase);
      this.checkFileExists(filePath, `Edge Case - ${edgeCase}`);
    }
  }

  private validateTestStructure(): void {
    // Check directory structure
    const requiredDirs = [
      'configs',
      'configs/test-suites',
      'providers',
      'mocks',
      'mocks/articles',
      'mocks/articles/violations',
      'mocks/articles/edge-cases',
      'scripts'
    ];

    for (const dir of requiredDirs) {
      try {
        const stats = fs.statSync(dir);
        if (stats.isDirectory()) {
          this.addResult(`Directory - ${dir}`, 'pass', `Directory exists: ${dir}`);
        } else {
          this.addResult(`Directory - ${dir}`, 'fail', `Path exists but is not a directory: ${dir}`);
        }
      } catch (e) {
        this.addResult(`Directory - ${dir}`, 'fail', `Directory not found: ${dir}`);
      }
    }
  }

  private generateReport(): void {
    this.log('\n🧪 Dry Run Test Results', 'blue');
    this.log('='.repeat(60), 'blue');

    let passed = 0;
    let failed = 0;

    for (const result of this.results) {
      const icon = result.status === 'pass' ? '✅' : '❌';
      const color = result.status === 'pass' ? 'green' : 'red';
      
      this.log(`${icon} ${result.name}: ${result.message}`, color);
      
      if (result.details && result.details.length > 0) {
        for (const detail of result.details) {
          this.log(`   📝 ${detail}`, 'yellow');
        }
      }

      if (result.status === 'pass') passed++;
      else failed++;
    }

    this.log('\n' + '='.repeat(60), 'blue');
    this.log(`📊 Summary: ${passed} passed, ${failed} failed`, failed === 0 ? 'green' : 'red');

    if (failed === 0) {
      this.log('\n✅ All validations passed! Test configuration is ready.', 'green');
    } else {
      this.log('\n❌ Some validations failed. Please fix the issues above.', 'red');
    }

    return failed === 0;
  }

  public async runDryTest(): Promise<boolean> {
    this.log('🔍 Running Dry Run Test for Article Guardrail Review', 'blue');
    
    // Validate test structure
    this.validateTestStructure();
    
    // Validate main command file
    this.checkFileExists('../../.claude/commands/article_guardrail_review.md', 'Guardrail Command');
    
    // Validate test configurations
    this.validateYamlConfig('configs/article-guardrail-review.yaml', 'Main Config');
    this.validateYamlConfig('configs/test-suites/basic-scenarios.yaml', 'Basic Scenarios');
    this.validateYamlConfig('configs/test-suites/guardrail-scenarios.yaml', 'Guardrail Scenarios');
    this.validateYamlConfig('configs/test-suites/edge-cases.yaml', 'Edge Cases');
    
    // Validate mock data
    this.validateMockArticles();
    
    // Generate report
    return this.generateReport();
  }
}

// Main execution
async function main() {
  const validator = new DryRunValidator();
  const success = await validator.runDryTest();
  
  if (!success) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}