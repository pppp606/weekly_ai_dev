#!/usr/bin/env ts-node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

interface TestResult {
  description: string;
  status: 'pass' | 'fail';
  duration: number;
  error?: string;
}

interface TestReport {
  total: number;
  passed: number;
  failed: number;
  duration: number;
  timestamp: string;
  results: TestResult[];
}

/**
 * Generates test reports from Promptfoo output
 */
class TestReportGenerator {
  private outputDir: string;
  private reportPath: string;

  constructor() {
    this.outputDir = join(__dirname, '../output');
    this.reportPath = join(__dirname, '..');
  }

  /**
   * Generate comprehensive test report
   */
  async generate(): Promise<void> {
    console.log('📊 Generating test report...');

    try {
      // Parse test results
      const results = await this.parseTestResults();
      
      // Generate JSON report
      const jsonReport = this.generateJsonReport(results);
      writeFileSync(
        join(this.reportPath, 'test-report.json'),
        JSON.stringify(jsonReport, null, 2)
      );

      // Generate HTML report
      const htmlReport = this.generateHtmlReport(jsonReport);
      writeFileSync(
        join(this.reportPath, 'test-report.html'),
        htmlReport
      );

      // Generate Markdown summary
      const mdSummary = this.generateMarkdownSummary(jsonReport);
      writeFileSync(
        join(this.reportPath, 'test-summary.md'),
        mdSummary
      );

      console.log('✅ Test reports generated successfully!');
      console.log(`  📄 JSON: test-report.json`);
      console.log(`  🌐 HTML: test-report.html`);
      console.log(`  📝 Markdown: test-summary.md`);

      // Print summary
      this.printSummary(jsonReport);
    } catch (error) {
      console.error('❌ Failed to generate report:', error);
      process.exit(1);
    }
  }

  /**
   * Parse test results from output files
   */
  private async parseTestResults(): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    // Find all output files
    const pattern = join(this.outputDir, '**/*.json');
    const files = await glob(pattern);

    for (const file of files) {
      try {
        const content = readFileSync(file, 'utf-8');
        const data = JSON.parse(content);

        // Extract test results based on Promptfoo output format
        if (data.results) {
          data.results.forEach((result: any) => {
            results.push({
              description: result.description || 'Unknown test',
              status: result.pass ? 'pass' : 'fail',
              duration: result.duration || 0,
              error: result.error || result.failureReason,
            });
          });
        }
      } catch (error) {
        console.warn(`⚠️  Failed to parse ${file}:`, error);
      }
    }

    return results;
  }

  /**
   * Generate JSON report
   */
  private generateJsonReport(results: TestResult[]): TestReport {
    const passed = results.filter(r => r.status === 'pass').length;
    const failed = results.filter(r => r.status === 'fail').length;
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

    return {
      total: results.length,
      passed,
      failed,
      duration: totalDuration,
      timestamp: new Date().toISOString(),
      results,
    };
  }

  /**
   * Generate HTML report
   */
  private generateHtmlReport(report: TestReport): string {
    const passRate = ((report.passed / report.total) * 100).toFixed(1);
    const statusColor = report.failed === 0 ? '#22c55e' : '#ef4444';

    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promptfoo Test Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9fafb;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .stat-label {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .stat-value {
            font-size: 32px;
            font-weight: bold;
            color: #111827;
        }
        .results {
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .result {
            padding: 15px 20px;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .result:last-child {
            border-bottom: none;
        }
        .status {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .status.pass {
            background-color: #22c55e;
        }
        .status.fail {
            background-color: #ef4444;
        }
        .result-description {
            flex-grow: 1;
        }
        .result-duration {
            color: #6b7280;
            font-size: 14px;
        }
        .error {
            margin-top: 10px;
            padding: 10px;
            background-color: #fef2f2;
            border-radius: 4px;
            color: #991b1b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Promptfoo Test Report</h1>
            <p style="color: #6b7280;">Generated at ${new Date(report.timestamp).toLocaleString('ja-JP')}</p>
        </div>

        <div class="stats">
            <div class="stat">
                <div class="stat-label">Total Tests</div>
                <div class="stat-value">${report.total}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Passed</div>
                <div class="stat-value" style="color: #22c55e;">${report.passed}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Failed</div>
                <div class="stat-value" style="color: #ef4444;">${report.failed}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Pass Rate</div>
                <div class="stat-value" style="color: ${statusColor};">${passRate}%</div>
            </div>
        </div>

        <div class="results">
            <h2 style="padding: 20px 20px 10px;">Test Results</h2>
            ${report.results.map(result => `
                <div class="result">
                    <div class="status ${result.status}"></div>
                    <div class="result-description">
                        ${result.description}
                        ${result.error ? `<div class="error">${result.error}</div>` : ''}
                    </div>
                    <div class="result-duration">${result.duration}ms</div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Generate Markdown summary
   */
  private generateMarkdownSummary(report: TestReport): string {
    const passRate = ((report.passed / report.total) * 100).toFixed(1);

    let md = `# Test Summary

Generated at: ${new Date(report.timestamp).toLocaleString('ja-JP')}

## Overview

- **Total Tests**: ${report.total}
- **Passed**: ${report.passed}
- **Failed**: ${report.failed}
- **Pass Rate**: ${passRate}%
- **Total Duration**: ${(report.duration / 1000).toFixed(2)}s

## Results

`;

    // Group by status
    const passed = report.results.filter(r => r.status === 'pass');
    const failed = report.results.filter(r => r.status === 'fail');

    if (failed.length > 0) {
      md += '### ❌ Failed Tests\n\n';
      failed.forEach(result => {
        md += `- ${result.description}\n`;
        if (result.error) {
          md += `  - Error: ${result.error}\n`;
        }
      });
      md += '\n';
    }

    if (passed.length > 0) {
      md += '### ✅ Passed Tests\n\n';
      passed.forEach(result => {
        md += `- ${result.description} (${result.duration}ms)\n`;
      });
    }

    return md;
  }

  /**
   * Print summary to console
   */
  private printSummary(report: TestReport): void {
    const passRate = ((report.passed / report.total) * 100).toFixed(1);

    console.log('\n📊 Test Summary:');
    console.log(`  Total: ${report.total}`);
    console.log(`  ✅ Passed: ${report.passed}`);
    console.log(`  ❌ Failed: ${report.failed}`);
    console.log(`  📈 Pass Rate: ${passRate}%`);
    console.log(`  ⏱️  Duration: ${(report.duration / 1000).toFixed(2)}s`);

    if (report.failed > 0) {
      console.log('\n❌ Failed tests:');
      report.results
        .filter(r => r.status === 'fail')
        .forEach(r => {
          console.log(`  - ${r.description}`);
          if (r.error) {
            console.log(`    Error: ${r.error}`);
          }
        });
    }
  }
}

// CLI execution
if (require.main === module) {
  const generator = new TestReportGenerator();
  generator.generate();
}

export { TestReportGenerator };