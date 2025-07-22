# Promptfoo Testing Framework - Usage Guide

## Overview

This guide explains how to run tests, interpret results, and use the Promptfoo testing framework effectively.

## Running Tests

### Basic Commands

#### Run All Tests
```bash
npm run test:all
```
Executes the complete test suite including all digest types and article generation.

#### Run Specific Test Suites

```bash
# Release digest tests only
npm run test:release

# AI news tests only
npm run test:news

# Trending repositories tests only
npm run test:trending

# Article generation tests only
npm run test:article

# Run basic smoke tests
npm run test:basic
```

### Advanced Usage

#### Run with Custom Configuration
```bash
npx promptfoo eval -c configs/custom-config.yaml
```

#### Run with Specific Providers
```bash
# Test with GPT-4 only
npx promptfoo eval -c configs/release-digest.yaml --filter-providers gpt-4

# Test with Claude only
npx promptfoo eval -c configs/ai-news.yaml --filter-providers claude-3
```

#### Run with Custom Variables
```bash
npx promptfoo eval -c configs/release-digest.yaml --var "date:2024-03-15"
```

### Parallel Execution

Run multiple test suites in parallel:
```bash
npm run test:parallel
```

### Continuous Testing

Watch mode for development:
```bash
npm run test:watch
```

## Understanding Test Results

### Console Output

Test results appear in the console with color coding:
- 🟢 **Green**: Test passed
- 🔴 **Red**: Test failed
- 🟡 **Yellow**: Test passed with warnings
- ⚪ **Gray**: Test skipped

Example output:
```
=== Test Results ===
Release Digest Tests: 12/15 passed (80%)
  ✓ Repository structure validation
  ✓ Error message detection
  ✗ Date format validation - Expected YYYY-MM-DD
  
AI News Tests: 20/20 passed (100%)
  ✓ All tests passed
```

### Test Reports

#### HTML Report
Generated at `test-results/report.html`:
```bash
npm run test:report
open test-results/report.html
```

#### JSON Report
Raw test data at `test-results/results.json`:
```json
{
  "results": [
    {
      "test": "release-digest",
      "provider": "gpt-4",
      "score": 0.85,
      "passed": true,
      "metrics": {
        "structure": 1.0,
        "content": 0.8,
        "formatting": 0.75
      }
    }
  ]
}
```

#### CSV Export
Export results for analysis:
```bash
npm run export:csv
```

### Metrics Explained

#### Content Quality Metrics
- **Structure Score** (0-1): Adherence to expected format
- **Relevance Score** (0-1): Content relevance to the topic
- **Completeness Score** (0-1): Coverage of required elements

#### Performance Metrics
- **Response Time**: Time to generate content
- **Token Usage**: Number of tokens consumed
- **Cost Estimate**: Estimated API cost

#### Validation Metrics
- **Format Compliance**: Markdown formatting correctness
- **Language Detection**: Japanese content percentage
- **Error Rate**: Frequency of error messages

## Interpreting Common Results

### Success Patterns

1. **High Structure Score (>0.9)**
   - Output follows expected format consistently
   - All required sections present
   - Proper markdown formatting

2. **Good Content Coverage (>0.8)**
   - Comprehensive information gathering
   - Relevant details included
   - No major omissions

### Failure Patterns

1. **Low Structure Score (<0.5)**
   - Missing required sections
   - Incorrect formatting
   - Unexpected output structure

2. **Content Issues**
   - Hallucinated information
   - Missing critical data
   - Language mixing (English in Japanese content)

## Working with Test Data

### Custom Test Cases

Add test cases to `test-data/custom/`:
```yaml
- vars:
    date: "2024-03-15"
    repository: "langchain"
  assert:
    - type: contains
      value: "LangChain"
    - type: javascript
      value: "output.includes('## リリース情報')"
```

### Data Validation

Validate test data before running:
```bash
npm run validate:data
```

## Debugging Tests

### Verbose Mode

Run tests with detailed logging:
```bash
npm run test:debug
```

### Single Test Execution

Debug a specific test case:
```bash
npx promptfoo eval -c configs/release-digest.yaml --max-concurrency 1 --verbose
```

### Environment Variables for Debugging

```bash
# Enable debug logging
DEBUG=promptfoo:* npm run test:all

# Increase timeout for slow responses
TEST_TIMEOUT=60000 npm run test:all

# Disable retry on failures
MAX_RETRIES=0 npm run test:all
```

## Best Practices

### 1. Regular Testing

- Run tests before committing changes
- Use pre-commit hooks for automatic testing
- Schedule daily regression tests

### 2. Test Data Management

- Keep test data up-to-date
- Use realistic scenarios
- Cover edge cases

### 3. Result Analysis

- Review failed tests immediately
- Track metrics over time
- Document recurring issues

### 4. Performance Optimization

- Run expensive tests separately
- Use caching for repeated tests
- Parallelize independent test suites

## Integration with CI/CD

### GitHub Actions

Tests run automatically on:
- Push to main branch
- Pull request creation
- Scheduled daily runs

View results in:
- GitHub Actions tab
- Pull request comments
- Artifact downloads

### Local Pre-commit

Install pre-commit hook:
```bash
npm run install:hooks
```

## Generating Reports

### Weekly Summary
```bash
npm run report:weekly
```

### Monthly Analytics
```bash
npm run report:monthly
```

### Custom Reports
```bash
npm run report:custom -- --from 2024-03-01 --to 2024-03-31
```

## Next Steps

- Review [Architecture Documentation](./ARCHITECTURE.md) for system design
- Read [Development Guide](./DEVELOPMENT.md) to create custom tests
- Check [Troubleshooting Guide](./TROUBLESHOOTING.md) for common issues