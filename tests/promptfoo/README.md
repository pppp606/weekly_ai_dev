# Article Guardrail Review Testing

This directory contains the testing infrastructure specifically for the `article_guardrail_review.md` command using promptfoo.

## Directory Structure

```
tests/promptfoo/
├── configs/          # Test suite configurations
├── providers/        # Custom provider implementations
├── mocks/           # Mock data for testing
├── evaluators/      # Custom evaluation functions
├── results/         # Test results (gitignored)
└── promptfooconfig.yaml  # Main configuration
```

## Setup

1. Install dependencies:
```bash
cd tests/promptfoo
npm install
```

2. Set up environment variables:
```bash
export ANTHROPIC_API_KEY="your-api-key"
```

## Usage

### Run all tests
```bash
npm test
```

### Run specific test suite
```bash
npm run test:specific configs/article-guardrail-review.yaml
```

### View results
```bash
npm run view
```

### Watch mode (for development)
```bash
npm run test:watch
```

## Creating Test Suites

Test suites are defined in YAML files under the `configs/` directory. Each test suite should:

1. Define test cases with various inputs
2. Specify expected outputs or assertions
3. Use custom evaluators for complex validation

Example test suite structure:
```yaml
providers:
  - article-guardrail

prompts:
  - .claude/commands/article_guardrail_review.md

tests:
  - vars:
      articlePath: "tests/promptfoo/mocks/articles/weekly-ai-digest-20250721.md"
    assert:
      - type: contains
        value: "APPROVED"
      - type: javascript
        value: "output.includes('Guardrail Review Results')"
```

## Custom Provider

The `article-guardrail-provider.ts` is specifically designed for testing the article guardrail review command and:
- Loads the `article_guardrail_review.md` command content
- Sets up proper test environment with mock data
- Executes guardrail reviews through the Anthropic API
- Returns structured responses for evaluation

## Available Test Suites

1. **article-guardrail-review.yaml** - Main comprehensive test suite
2. **basic-scenarios.yaml** - Basic functional tests
3. **guardrail-scenarios.yaml** - Specific violation detection tests
4. **edge-cases.yaml** - Error conditions and boundary scenarios
5. **evaluator-validation.yaml** - Custom evaluator validation tests

## Next Steps

1. Run the test suites to validate guardrail review functionality
2. Add additional mock articles for edge cases as needed
3. Enhance custom evaluators for more precise validation
4. Set up CI/CD integration for automated guardrail testing