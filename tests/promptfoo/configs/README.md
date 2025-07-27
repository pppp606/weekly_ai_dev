# Test Configurations

This directory contains test configuration files for various Claude Code commands.

## Available Test Configurations

### article-guardrail-review.yaml
Tests for the `article_guardrail_review` command that validates weekly AI digest articles for content policy compliance.

**Test Cases:**
1. Clean article review (should pass)
2. Article with multiple violations (should be blocked)
3. Empty article handling
4. Missing file handling
5. Output format verification

**Run with:**
```bash
npm run test:article-guardrail
# or
CLAUDE_CODE_TEST_MODE=true npx promptfoo eval --config configs/article-guardrail-review.yaml
```

## Test Environment

All tests use mock data to ensure reproducibility:
- Fixed date: 2025-07-21
- Mock articles in `mocks/articles/`
- Mock resources in `mocks/resources/2025-07-21/`

## Adding New Tests

To add tests for a new command:

1. Create a new configuration file: `configs/[command-name].yaml`
2. Add mock data if needed in `mocks/`
3. Update the provider if special handling is required
4. Add a npm script in `package.json`

## Test Results

Test results are saved to:
- Individual test results: `test-results/[command-name]-results.json`
- HTML report: Run `npx promptfoo view` after tests