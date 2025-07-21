#!/usr/bin/env ts-node

/**
 * Test runner for validating custom article guardrail evaluators
 */

import fs from 'fs';
import path from 'path';
import { ResponseParser } from '../evaluators/utils/response-parser.js';
import { ViolationClassifier } from '../evaluators/utils/violation-classifier.js';
import { MetricsCalculator } from '../evaluators/utils/metrics-calculator.js';
import articleApprovalEvaluator from '../evaluators/article-approval-evaluator.js';
import violationDetectionEvaluator from '../evaluators/violation-detection-evaluator.js';
import formatComplianceEvaluator from '../evaluators/format-compliance-evaluator.js';
import responseQualityEvaluator from '../evaluators/response-quality-evaluator.js';

interface TestResult {
  evaluator: string;
  testName: string;
  passed: boolean;
  score: number;
  reason: string;
  namedScores?: Record<string, number>;
  error?: string;
}

interface MockResponse {
  content: string;
  expectedDecision: 'APPROVED' | 'BLOCKED' | 'NEEDS REVISION';
  articlePath: string;
  description: string;
}

const MOCK_RESPONSES: MockResponse[] = [
  {
    content: `## Guardrail Review Results

**Status**: APPROVED

**Summary**: The article content has been reviewed and found compliant with all guardrail policies. The technical information is accurate and presented professionally without any violations of content guidelines.

The article discusses AI development topics appropriately and does not contain:
- Confidential information or API keys
- Personal information or private data
- Security exploits or malicious content
- Inappropriate or offensive material
- Medical advice without disclaimers
- Political bias or inflammatory content

The content is suitable for publication.`,
    expectedDecision: 'APPROVED',
    articlePath: 'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721.md',
    description: 'Clean article approval response'
  },
  {
    content: `## Guardrail Review Results

**Status**: BLOCKED

**Summary**: The article contains multiple serious guardrail violations that must be addressed before publication. Critical security and privacy concerns have been identified.

**Issues Found**:

1. **Confidential Information** (Line 45-47):
   - Contains exposed API keys: "sk-1234567890abcdef"
   - Database credentials visible in code examples
   - **Action**: Remove all authentication tokens and credentials

2. **Personal Information** (Line 23, 67):
   - Email addresses: john.doe@company.com, jane@example.org
   - Phone numbers: +1-555-0123
   - **Action**: Replace with placeholder values

3. **Security Exploits** (Line 89-95):
   - SQL injection example code without proper warnings
   - Exploit methodology described in detail
   - **Action**: Remove exploit code or add strong warnings

4. **Political Bias** (Line 134):
   - Partisan political statements about AI regulation
   - **Action**: Present balanced viewpoint or remove political content

5. **Medical Advice** (Line 156):
   - Specific health recommendations without disclaimers
   - **Action**: Add proper medical disclaimers or remove advice

This article cannot be published in its current form due to critical violations.`,
    expectedDecision: 'BLOCKED',
    articlePath: 'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721-guardrail-fail.md',
    description: 'Multiple violations blocking response'
  },
  {
    content: `## Guardrail Review Results

**Status**: BLOCKED

**Summary**: The article file appears to be empty or corrupted. No content could be processed for review.

**Issues Found**:

1. **Content Missing**:
   - File contains no readable content
   - May be corrupted or improperly saved
   - **Action**: Verify file integrity and re-upload

The article cannot be reviewed or published without valid content.`,
    expectedDecision: 'BLOCKED',
    articlePath: 'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721-empty.md',
    description: 'Empty file response'
  },
  {
    content: `Status: APPROVED
    
Summary: Article reviewed, no issues found.

The content looks fine to me.`,
    expectedDecision: 'APPROVED',
    articlePath: 'tests/promptfoo/mocks/articles/weekly-ai-digest-minimal.md',
    description: 'Minimal format response'
  },
  {
    content: `The article has some problems with API keys being exposed and personal information. It should be blocked.`,
    expectedDecision: 'BLOCKED',
    articlePath: 'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721-guardrail-fail.md',
    description: 'Poor format response'
  }
];

class EvaluatorTester {
  private results: TestResult[] = [];

  async runAllTests(): Promise<void> {
    console.log('🧪 Starting evaluator validation tests...\n');

    // Test each evaluator with different response types
    for (const mockResponse of MOCK_RESPONSES) {
      console.log(`Testing with: ${mockResponse.description}`);
      console.log(`Expected decision: ${mockResponse.expectedDecision}`);
      console.log('─'.repeat(50));

      await this.testArticleApprovalEvaluator(mockResponse);
      await this.testViolationDetectionEvaluator(mockResponse);
      await this.testFormatComplianceEvaluator(mockResponse);
      await this.testResponseQualityEvaluator(mockResponse);
      
      console.log(''); // Empty line between test groups
    }

    // Test utility functions
    await this.testUtilityFunctions();

    // Print summary
    this.printSummary();
  }

  async testArticleApprovalEvaluator(mockResponse: MockResponse): Promise<void> {
    try {
      const context = {
        vars: { articlePath: mockResponse.articlePath },
        test: { description: mockResponse.description }
      };

      const result = await articleApprovalEvaluator(mockResponse.content, context);
      
      this.results.push({
        evaluator: 'article-approval',
        testName: mockResponse.description,
        passed: result.pass,
        score: result.score,
        reason: result.reason,
        namedScores: result.namedScores
      });

      console.log(`✓ Article Approval: ${result.pass ? 'PASS' : 'FAIL'} (${(result.score * 100).toFixed(1)}%)`);
      if (!result.pass) {
        console.log(`  Reason: ${result.reason.split('\n')[0]}`);
      }

    } catch (error) {
      this.results.push({
        evaluator: 'article-approval',
        testName: mockResponse.description,
        passed: false,
        score: 0,
        reason: 'Evaluator error',
        error: error instanceof Error ? error.message : String(error)
      });
      console.log(`✗ Article Approval: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async testViolationDetectionEvaluator(mockResponse: MockResponse): Promise<void> {
    try {
      const context = {
        vars: { articlePath: mockResponse.articlePath },
        test: { description: mockResponse.description }
      };

      const result = await violationDetectionEvaluator(mockResponse.content, context);
      
      this.results.push({
        evaluator: 'violation-detection',
        testName: mockResponse.description,
        passed: result.pass,
        score: result.score,
        reason: result.reason,
        namedScores: result.namedScores
      });

      console.log(`✓ Violation Detection: ${result.pass ? 'PASS' : 'FAIL'} (${(result.score * 100).toFixed(1)}%)`);
      if (!result.pass) {
        const reasonLines = result.reason.split('\n');
        const criticalLine = reasonLines.find(line => line.includes('CRITICAL'));
        if (criticalLine) {
          console.log(`  ${criticalLine}`);
        }
      }

    } catch (error) {
      this.results.push({
        evaluator: 'violation-detection',
        testName: mockResponse.description,
        passed: false,
        score: 0,
        reason: 'Evaluator error',
        error: error instanceof Error ? error.message : String(error)
      });
      console.log(`✗ Violation Detection: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async testFormatComplianceEvaluator(mockResponse: MockResponse): Promise<void> {
    try {
      const context = {
        vars: { articlePath: mockResponse.articlePath },
        test: { description: mockResponse.description }
      };

      const result = await formatComplianceEvaluator(mockResponse.content, context);
      
      this.results.push({
        evaluator: 'format-compliance',
        testName: mockResponse.description,
        passed: result.pass,
        score: result.score,
        reason: result.reason,
        namedScores: result.namedScores
      });

      console.log(`✓ Format Compliance: ${result.pass ? 'PASS' : 'FAIL'} (${(result.score * 100).toFixed(1)}%)`);

    } catch (error) {
      this.results.push({
        evaluator: 'format-compliance',
        testName: mockResponse.description,
        passed: false,
        score: 0,
        reason: 'Evaluator error',
        error: error instanceof Error ? error.message : String(error)
      });
      console.log(`✗ Format Compliance: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async testResponseQualityEvaluator(mockResponse: MockResponse): Promise<void> {
    try {
      const context = {
        vars: { articlePath: mockResponse.articlePath },
        test: { description: mockResponse.description }
      };

      const result = await responseQualityEvaluator(mockResponse.content, context);
      
      this.results.push({
        evaluator: 'response-quality',
        testName: mockResponse.description,
        passed: result.pass,
        score: result.score,
        reason: result.reason,
        namedScores: result.namedScores
      });

      console.log(`✓ Response Quality: ${result.pass ? 'PASS' : 'FAIL'} (${(result.score * 100).toFixed(1)}%)`);

    } catch (error) {
      this.results.push({
        evaluator: 'response-quality',
        testName: mockResponse.description,
        passed: false,
        score: 0,
        reason: 'Evaluator error',
        error: error instanceof Error ? error.message : String(error)
      });
      console.log(`✗ Response Quality: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async testUtilityFunctions(): Promise<void> {
    console.log('🔧 Testing utility functions...');
    console.log('─'.repeat(50));

    try {
      // Test ResponseParser
      const sampleResponse = MOCK_RESPONSES[1].content; // The detailed blocked response
      const parsed = ResponseParser.parseGuardrailResponse(sampleResponse);
      
      console.log(`✓ ResponseParser: Status = ${parsed.status}, Violations = ${parsed.violations.length}`);
      
      // Test ViolationClassifier
      const classification = ViolationClassifier.classifyViolation('API key sk-1234567890abcdef exposed');
      console.log(`✓ ViolationClassifier: Category = ${classification.category}, Confidence = ${classification.confidence.toFixed(2)}`);
      
      // Test MetricsCalculator
      const metrics = MetricsCalculator.calculateMetrics(parsed, [classification], [], undefined);
      console.log(`✓ MetricsCalculator: Overall Score = ${(metrics.overallScore * 100).toFixed(1)}%`);

    } catch (error) {
      console.log(`✗ Utility Functions: ERROR - ${error instanceof Error ? error.message : String(error)}`);
    }

    console.log('');
  }

  printSummary(): void {
    console.log('📊 Test Summary');
    console.log('═'.repeat(50));

    const groupedResults = this.results.reduce((acc, result) => {
      if (!acc[result.evaluator]) {
        acc[result.evaluator] = [];
      }
      acc[result.evaluator].push(result);
      return acc;
    }, {} as Record<string, TestResult[]>);

    for (const [evaluator, results] of Object.entries(groupedResults)) {
      const passed = results.filter(r => r.passed).length;
      const total = results.length;
      const avgScore = results.reduce((sum, r) => sum + r.score, 0) / total;
      
      console.log(`${evaluator}: ${passed}/${total} passed (${(avgScore * 100).toFixed(1)}% avg score)`);
      
      // Show failed tests
      const failed = results.filter(r => !r.passed);
      if (failed.length > 0) {
        for (const fail of failed) {
          console.log(`  ❌ ${fail.testName}: ${fail.error || 'Failed evaluation'}`);
        }
      }
    }

    const totalPassed = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    const overallScore = this.results.reduce((sum, r) => sum + r.score, 0) / totalTests;

    console.log('─'.repeat(50));
    console.log(`Overall: ${totalPassed}/${totalTests} passed (${(overallScore * 100).toFixed(1)}% avg score)`);
    
    if (totalPassed === totalTests) {
      console.log('🎉 All evaluator tests passed!');
    } else {
      console.log('⚠️  Some evaluator tests failed. Review the failures above.');
    }
  }

  async saveResults(filename: string = '../test-results/evaluator-test-results.json'): Promise<void> {
    const resultsDir = path.dirname(path.resolve(__dirname, filename));
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: this.results.length,
        passed: this.results.filter(r => r.passed).length,
        failed: this.results.filter(r => !r.passed).length,
        averageScore: this.results.reduce((sum, r) => sum + r.score, 0) / this.results.length
      },
      results: this.results
    };
    
    fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(report, null, 2));
    console.log(`\n📁 Results saved to: ${path.resolve(__dirname, filename)}`);
  }
}

// Run tests if executed directly
if (require.main === module) {
  const tester = new EvaluatorTester();
  tester.runAllTests()
    .then(() => tester.saveResults())
    .catch(error => {
      console.error('❌ Test execution failed:', error);
      process.exit(1);
    });
}

export { EvaluatorTester };