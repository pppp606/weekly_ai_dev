#!/usr/bin/env tsx

import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

interface TestSuite {
  name: string;
  configPath: string;
  description: string;
}

interface TestResults {
  suite: string;
  passed: number;
  failed: number;
  total: number;
  duration: number;
  errors: string[];
}

class TestRunner {
  private testSuites: TestSuite[] = [
    {
      name: 'basic-scenarios',
      configPath: 'tests/promptfoo/configs/test-suites/basic-scenarios.yaml',
      description: 'Basic functional tests for article guardrail review'
    },
    {
      name: 'guardrail-scenarios',
      configPath: 'tests/promptfoo/configs/test-suites/guardrail-scenarios.yaml',
      description: 'Tests for specific guardrail violation detection'
    },
    {
      name: 'edge-cases',
      configPath: 'tests/promptfoo/configs/test-suites/edge-cases.yaml',
      description: 'Edge cases and error condition tests'
    }
  ];

  private resultsDir = 'tests/test-results';
  private allResults: TestResults[] = [];

  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories(): void {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  private log(message: string, color: 'green' | 'red' | 'yellow' | 'blue' = 'blue'): void {
    console.log(chalk[color](message));
  }

  private async runSingleTest(suite: TestSuite): Promise<TestResults> {
    this.log(`\n🧪 Running ${suite.name} tests...`, 'blue');
    this.log(`   ${suite.description}`, 'blue');

    const startTime = Date.now();
    const configPath = path.resolve(suite.configPath);
    
    if (!fs.existsSync(configPath)) {
      throw new Error(`Test configuration not found: ${configPath}`);
    }

    try {
      // Run promptfoo with the specific config
      const command = `npx promptfoo eval -c "${configPath}"`;
      const output = execSync(command, { 
        encoding: 'utf8',
        cwd: path.resolve('.'),
        timeout: 300000 // 5 minute timeout
      });

      const duration = Date.now() - startTime;

      // Parse results from output or result file
      const resultFile = path.join(this.resultsDir, `${suite.name}-results.json`);
      let results: TestResults = {
        suite: suite.name,
        passed: 0,
        failed: 0,
        total: 0,
        duration,
        errors: []
      };

      if (fs.existsSync(resultFile)) {
        try {
          const resultData = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
          results = this.parsePromptfooResults(resultData, suite.name, duration);
        } catch (e) {
          results.errors.push(`Failed to parse result file: ${e}`);
        }
      } else {
        // Parse from command output if result file not available
        results = this.parseCommandOutput(output, suite.name, duration);
      }

      if (results.failed > 0) {
        this.log(`   ❌ ${results.failed}/${results.total} tests failed`, 'red');
      } else {
        this.log(`   ✅ All ${results.total} tests passed`, 'green');
      }

      return results;

    } catch (error: any) {
      const duration = Date.now() - startTime;
      this.log(`   ❌ Test suite failed: ${error.message}`, 'red');
      
      return {
        suite: suite.name,
        passed: 0,
        failed: 1,
        total: 1,
        duration,
        errors: [error.message]
      };
    }
  }

  private parsePromptfooResults(resultData: any, suiteName: string, duration: number): TestResults {
    const results: TestResults = {
      suite: suiteName,
      passed: 0,
      failed: 0,
      total: 0,
      duration,
      errors: []
    };

    if (resultData.results && Array.isArray(resultData.results)) {
      results.total = resultData.results.length;
      
      for (const result of resultData.results) {
        if (result.success === true || (result.score && result.score >= 0.8)) {
          results.passed++;
        } else {
          results.failed++;
          if (result.error) {
            results.errors.push(result.error);
          }
        }
      }
    }

    return results;
  }

  private parseCommandOutput(output: string, suiteName: string, duration: number): TestResults {
    const results: TestResults = {
      suite: suiteName,
      passed: 0,
      failed: 0,
      total: 0,
      duration,
      errors: []
    };

    // Basic parsing - look for common patterns in promptfoo output
    const lines = output.split('\n');
    for (const line of lines) {
      if (line.includes('✓') || line.includes('PASS')) {
        results.passed++;
        results.total++;
      } else if (line.includes('✗') || line.includes('FAIL')) {
        results.failed++;
        results.total++;
      } else if (line.includes('ERROR')) {
        results.errors.push(line.trim());
      }
    }

    // If we couldn't parse anything, assume at least one test ran
    if (results.total === 0) {
      results.total = 1;
      if (output.includes('error') || output.includes('Error')) {
        results.failed = 1;
        results.errors.push('Test execution failed');
      } else {
        results.passed = 1;
      }
    }

    return results;
  }

  private generateReport(): void {
    this.log('\n📊 Test Results Summary', 'blue');
    this.log('='.repeat(50), 'blue');

    let totalPassed = 0;
    let totalFailed = 0;
    let totalTests = 0;
    let totalDuration = 0;

    for (const result of this.allResults) {
      totalPassed += result.passed;
      totalFailed += result.failed;
      totalTests += result.total;
      totalDuration += result.duration;

      const status = result.failed === 0 ? '✅' : '❌';
      const duration = (result.duration / 1000).toFixed(1);
      
      this.log(`${status} ${result.suite}: ${result.passed}/${result.total} passed (${duration}s)`, 
               result.failed === 0 ? 'green' : 'red');

      if (result.errors.length > 0) {
        for (const error of result.errors.slice(0, 3)) { // Show first 3 errors
          this.log(`   📝 ${error}`, 'yellow');
        }
        if (result.errors.length > 3) {
          this.log(`   📝 ... and ${result.errors.length - 3} more errors`, 'yellow');
        }
      }
    }

    this.log('='.repeat(50), 'blue');
    const overallStatus = totalFailed === 0 ? '✅' : '❌';
    const totalDurationSec = (totalDuration / 1000).toFixed(1);
    
    this.log(`${overallStatus} Overall: ${totalPassed}/${totalTests} tests passed (${totalDurationSec}s)`, 
             totalFailed === 0 ? 'green' : 'red');

    // Save detailed report
    const reportPath = path.join(this.resultsDir, 'test-summary.json');
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        totalPassed,
        totalFailed,
        totalDuration,
        successRate: totalTests > 0 ? (totalPassed / totalTests * 100).toFixed(1) : '0'
      },
      suites: this.allResults
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log(`\n📋 Detailed report saved to: ${reportPath}`, 'blue');
  }

  public async runAllTests(suiteNames?: string[]): Promise<void> {
    this.log('🚀 Starting Article Guardrail Review Tests', 'blue');
    
    const suitesToRun = suiteNames 
      ? this.testSuites.filter(suite => suiteNames.includes(suite.name))
      : this.testSuites;

    if (suitesToRun.length === 0) {
      this.log('❌ No test suites found to run', 'red');
      return;
    }

    this.log(`📋 Running ${suitesToRun.length} test suite(s)`, 'blue');

    for (const suite of suitesToRun) {
      try {
        const results = await this.runSingleTest(suite);
        this.allResults.push(results);
      } catch (error: any) {
        this.log(`❌ Failed to run ${suite.name}: ${error.message}`, 'red');
        this.allResults.push({
          suite: suite.name,
          passed: 0,
          failed: 1,
          total: 1,
          duration: 0,
          errors: [error.message]
        });
      }
    }

    this.generateReport();

    // Exit with error code if any tests failed
    const hasFailures = this.allResults.some(result => result.failed > 0);
    if (hasFailures) {
      process.exit(1);
    }
  }

  public listSuites(): void {
    this.log('📋 Available Test Suites:', 'blue');
    for (const suite of this.testSuites) {
      this.log(`   • ${suite.name}: ${suite.description}`, 'blue');
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const runner = new TestRunner();

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: npx tsx run-tests.ts [options] [suite-names...]

Options:
  --list, -l     List available test suites
  --help, -h     Show this help message

Examples:
  npx tsx run-tests.ts                           # Run all test suites
  npx tsx run-tests.ts basic-scenarios          # Run only basic scenarios
  npx tsx run-tests.ts basic-scenarios edge-cases # Run specific suites
  npx tsx run-tests.ts --list                   # List available suites
`);
    return;
  }

  if (args.includes('--list') || args.includes('-l')) {
    runner.listSuites();
    return;
  }

  const suiteNames = args.filter(arg => !arg.startsWith('--'));
  await runner.runAllTests(suiteNames.length > 0 ? suiteNames : undefined);
}

if (require.main === module) {
  main().catch(console.error);
}

export { TestRunner };