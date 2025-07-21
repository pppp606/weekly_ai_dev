# Promptfoo Testing Infrastructure

This directory contains the testing infrastructure for Weekly AI Dev digest commands using promptfoo.

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
npm run test:specific configs/release-digest.yaml
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
  - claude-code

prompts:
  - .claude/commands/vibecoding_release_digest.md

tests:
  - vars:
      date: "2024-01-15"
    assert:
      - type: contains
        value: "Release Information"
      - type: javascript
        value: "output.includes('GitHub')"
```

## Custom Provider

The `claude-code-provider.ts` simulates the Claude Code environment and:
- Loads command context from `.claude/commands/` files
- Sets up proper environment context
- Executes commands through the Anthropic API
- Returns structured responses for evaluation

## Next Steps

1. Create test suites for each command in `configs/`
2. Add mock data in `mocks/` for consistent testing
3. Implement custom evaluators in `evaluators/` for domain-specific validation
4. Set up CI/CD integration for automated testing