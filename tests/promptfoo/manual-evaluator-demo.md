# Manual Evaluator Demonstration

## Overview

This document demonstrates the custom evaluation system we've created for the article_guardrail_review command. Due to Node.js version compatibility issues with some dependencies, we'll demonstrate the functionality through code analysis and manual testing.

## Created Custom Evaluators

### 1. Article Approval Evaluator (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/article-approval-evaluator.ts`)
**Purpose**: Evaluates the correctness of APPROVED/BLOCKED/NEEDS REVISION decisions.

**Features**:
- Determines expected decision based on test file path and content
- Validates decision accuracy with smart reasoning about edge cases
- Provides detailed scoring with format compliance and summary quality bonuses
- Handles reasonable decision variations (e.g., BLOCKED vs NEEDS REVISION for violations)

**Key Functions**:
- `determineExpectedDecision()`: Maps file paths to expected outcomes
- `isReasonableDecision()`: Allows for reasonable judgment differences
- `calculateResponseQuality()`: Assesses overall response quality

### 2. Violation Detection Evaluator (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/violation-detection-evaluator.ts`)
**Purpose**: Evaluates accuracy and completeness of violation detection.

**Features**:
- Analyzes expected violations based on file content and naming patterns
- Calculates precision, recall, F1-score, and accuracy metrics
- Enforces critical failure conditions for must-detect violations
- Provides detailed violation count and severity assessment

**Performance Thresholds**:
- Minimum accuracy: 70% (80% for clean articles)
- Minimum recall: 80% for articles with expected violations
- Critical violations cannot be missed

### 3. Format Compliance Evaluator (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/format-compliance-evaluator.ts`)
**Purpose**: Validates output format and structure compliance.

**Required Elements**:
- Header: "## Guardrail Review Results"
- Status field with valid values (APPROVED/BLOCKED/NEEDS REVISION)
- Summary section with meaningful content
- Proper Markdown formatting

**Quality Checks**:
- Logical organization and flow
- Appropriate response length (100-5000 characters)
- Error handling for edge cases (empty files, missing files)

### 4. Response Quality Evaluator (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/response-quality-evaluator.ts`)
**Purpose**: Assesses response quality and explanation clarity across multiple dimensions.

**Quality Dimensions**:
- **Summary Quality**: Clarity, conciseness, informativeness
- **Explanation Clarity**: Specific details, technical accuracy, reasoning
- **Actionability**: Clear recommendations and actionable steps
- **Completeness**: Thorough coverage of all aspects
- **Professional Tone**: Appropriate formality and objectivity
- **Evidence-Based**: Supporting examples and references

**Scoring Weights**:
- Summary Quality: 25%
- Explanation Clarity: 25%
- Actionability: 20%
- Completeness: 15%
- Professional Tone: 10%
- Evidence-Based: 5%

## Supporting Utilities

### 1. Response Parser (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/utils/response-parser.ts`)
**Features**:
- Extracts status, summary, and violation details from Claude responses
- Validates format compliance
- Parses violation items with severity and location information
- Generates response metrics for evaluation

### 2. Violation Classifier (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/utils/violation-classifier.ts`)
**Violation Categories**:
- Confidential Information (API keys, credentials) - Critical severity
- Personal Information (emails, phone numbers) - High severity
- Security Exploits (SQL injection, XSS) - Critical severity
- Hate Speech (discriminatory content) - High severity
- Medical Advice (without disclaimers) - Medium severity
- Political Bias (partisan content) - Medium severity
- False Information (misinformation) - Medium severity
- Inappropriate Content (explicit material) - Medium severity

**Features**:
- Pattern-based classification with confidence scoring
- Expected violation inference from file paths and content
- Detection accuracy calculation with precision/recall metrics

### 3. Metrics Calculator (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/utils/metrics-calculator.ts`)
**Comprehensive Metrics**:
- **Detection Metrics**: Accuracy, precision, recall, F1-score
- **Format Metrics**: Structure compliance, required elements
- **Quality Metrics**: Summary quality, explanation clarity, actionability
- **Performance Metrics**: Response efficiency, length appropriateness

**Overall Scoring**:
- Detection Performance: 40% weight
- Format Compliance: 20% weight
- Response Quality: 30% weight
- Performance Efficiency: 10% weight

## Test Configuration Updates

### Updated Files:
1. `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/configs/article-guardrail-review.yaml`
2. `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/configs/test-suites/guardrail-scenarios.yaml`
3. `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/configs/evaluator-validation.yaml` (new)

**Integration**:
- All test configurations now include custom evaluators alongside existing assertions
- Evaluators are applied selectively based on test relevance
- Comprehensive evaluation for complex test scenarios

## Test Runner Scripts

### 1. Main Test Runner (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/run-evaluator-tests.sh`)
**Features**:
- Comprehensive test execution plan
- Dependency checking and setup
- Multiple test suite execution
- Detailed result reporting
- Command-line options (--verbose, --quick, --evaluator-only)

### 2. Quick Test Runner (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/run-quick-evaluator-test.sh`)
**Purpose**: Fast validation of evaluator functionality

### 3. Evaluator Unit Tests (`/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/scripts/test-evaluators.ts`)
**Mock Test Scenarios**:
- Clean article approval (expected: APPROVED)
- Multiple violations (expected: BLOCKED with 5+ violation types)
- Empty file handling (expected: BLOCKED with error handling)
- Minimal format testing (expected: format compliance issues)
- Poor format response (expected: low quality scores)

## Evaluation Criteria and Thresholds

### Pass/Fail Thresholds:
- **Article Approval**: 50% minimum score, correct or reasonable decision
- **Violation Detection**: 60% minimum score, no critical violations missed
- **Format Compliance**: 70% minimum score, required elements present
- **Response Quality**: 60% minimum score, adequate across all dimensions

### Success Metrics:
- Overall test pass rate: 80%
- Article approval accuracy: 90%
- Violation detection accuracy: 80%
- Format compliance rate: 90%
- Response quality minimum: 60%

## Validation Status

✅ **Completed**:
- All four custom evaluators implemented
- Comprehensive utility functions created
- Test configurations updated
- Test runner scripts created
- Documentation and validation framework

⚠️ **In Progress**:
- Manual testing due to dependency compilation issues
- Basic functionality validated through simple tests

## Usage Instructions

### To run evaluator tests (when dependencies are resolved):

```bash
# Quick validation
./run-quick-evaluator-test.sh

# Full test suite
./run-evaluator-tests.sh

# Evaluator unit tests only
./run-evaluator-tests.sh --evaluator-only

# With verbose output
./run-evaluator-tests.sh --verbose
```

### Manual Testing:

```bash
# Basic functionality check
node scripts/simple-evaluator-test.js

# Individual evaluator testing (when TypeScript is available)
npx ts-node scripts/test-evaluators.ts
```

## Expected Results

When the system is fully operational, you should see:

1. **Article Approval Tests**: High accuracy in decision classification
2. **Violation Detection Tests**: Precise identification of security, privacy, and content violations
3. **Format Compliance Tests**: Consistent adherence to output structure requirements
4. **Response Quality Tests**: Professional, clear, and actionable guardrail reviews

The system provides granular metrics and detailed feedback to help improve the article_guardrail_review command's performance over time.

## Files Created

**Evaluators** (4 files):
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/article-approval-evaluator.ts`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/violation-detection-evaluator.ts`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/format-compliance-evaluator.ts`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/response-quality-evaluator.ts`

**Utilities** (3 files):
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/utils/response-parser.ts`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/utils/violation-classifier.ts`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/evaluators/utils/metrics-calculator.ts`

**Test Scripts** (4 files):
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/run-evaluator-tests.sh`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/run-quick-evaluator-test.sh`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/scripts/test-evaluators.ts`
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/scripts/simple-evaluator-test.js`

**Configuration** (1 file):
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/configs/evaluator-validation.yaml`

**Documentation** (1 file):
- `/Users/takuto/Dev/weekly_ai_dev/tests/promptfoo/manual-evaluator-demo.md` (this file)

## Summary

The custom evaluation system has been successfully implemented with sophisticated metrics and comprehensive testing capabilities. While full automated testing requires dependency resolution, the evaluator logic is complete and ready for validation once the environment is properly configured.