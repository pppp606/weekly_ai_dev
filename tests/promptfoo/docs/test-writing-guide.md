# Test Writing Guide

This guide explains how to write effective tests for the Weekly AI Dev Digest commands using Promptfoo.

## Test Structure

Each test file follows this structure:

```yaml
description: "Test description"
providers:
  - id: mock-claude
    config:
      scenario: "specific-scenario"

prompts:
  - file://path/to/command.md

tests:
  - description: "What this test validates"
    vars:
      date: "2024-01-15"
    assert:
      - type: custom
        id: evaluation-name
```

## Writing New Tests

### 1. Create a Test File

Create a new YAML file in `tests/` directory:

```yaml
# tests/new-feature-test.yaml
description: "Test for new feature"
```

### 2. Define Test Scenarios

Add test cases with specific scenarios:

```yaml
tests:
  - description: "Should handle edge case X"
    vars:
      date: "2024-01-15"
      # Add other variables as needed
    assert:
      - type: custom
        id: content-quality
        threshold: 0.8
```

### 3. Use Appropriate Evaluators

Available evaluators:

- `content-quality`: Validates article content meets standards
- `safety-check`: Ensures no harmful content
- `language-consistency`: Checks language is Japanese
- `command-execution`: Validates command runs successfully
- `format-validation`: Checks output format

### 4. Add Mock Data

If your test needs specific mock responses, add them to `providers/mock-data/`:

```typescript
// providers/mock-data/custom-responses.ts
export const customScenarios = {
  'new-scenario': {
    // Define mock responses
  }
};
```

## Best Practices

### 1. Test Isolation

Each test should be independent:

```yaml
tests:
  - description: "Test A - Independent"
    vars:
      date: "2024-01-15"
      scenario: "test-a-data"
    
  - description: "Test B - Also Independent"  
    vars:
      date: "2024-01-16"
      scenario: "test-b-data"
```

### 2. Descriptive Names

Use clear, descriptive test names:

```yaml
# Good
- description: "Should include trending repositories when GitHub API returns data"

# Bad
- description: "Test 1"
```

### 3. Edge Cases

Always test edge cases:

```yaml
tests:
  # Happy path
  - description: "Successfully generates article with all data sources"
    
  # Edge cases
  - description: "Handles empty GitHub trending data gracefully"
  - description: "Continues when Reddit API is unavailable"
  - description: "Manages rate limiting scenarios"
```

### 4. Assertions

Use multiple assertions for thorough validation:

```yaml
assert:
  - type: custom
    id: content-quality
    threshold: 0.8
  - type: contains
    value: "週刊AIニュース"
  - type: not-contains
    value: "error"
  - type: javascript
    value: "output.length > 1000"
```

## Command-Specific Testing

### Article Generation Tests

```yaml
# tests/article-generation.yaml
tests:
  - description: "Generates complete weekly article"
    vars:
      date: "2024-01-15"
    assert:
      - type: custom
        id: content-quality
      - type: contains
        value: "リリース情報"
      - type: contains  
        value: "トレンドリポジトリ"
```

### Data Collection Tests

```yaml
# tests/data-collection.yaml
tests:
  - description: "Collects GitHub releases"
    vars:
      date: "2024-01-15"
      command: "vibecoding_release_digest"
    assert:
      - type: custom
        id: command-execution
      - type: contains
        value: "GitHub"
```

## Advanced Testing

### 1. Conditional Testing

```yaml
tests:
  - description: "Weekend edition includes extra content"
    vars:
      date: "2024-01-14"  # Sunday
    assert:
      - type: javascript
        value: |
          const isWeekend = new Date('2024-01-14').getDay() % 6 === 0;
          return isWeekend ? output.includes('週末特集') : true;
```

### 2. Performance Testing

```yaml
assert:
  - type: latency
    threshold: 5000  # Max 5 seconds
```

### 3. Multi-Step Testing

```yaml
tests:
  - description: "Full pipeline execution"
    vars:
      commands:
        - vibecoding_release_digest
        - ai_news_digest
        - generate_weekly_article
    assert:
      - type: custom
        id: pipeline-success
```

## Debugging Tests

### 1. Verbose Output

```bash
# Run with debug output
npm run test:debug
```

### 2. Inspect Mock Responses

```bash
# View mock data for a scenario
npm run mock:inspect -- scenario-name
```

### 3. Test Single File

```bash
# Test specific file
npx promptfoo eval -c promptfooconfig.yaml tests/specific-test.yaml
```

## Contributing Tests

1. Write tests for new features
2. Update tests when changing functionality
3. Ensure all tests pass before committing
4. Document complex test scenarios
5. Add mock data for new external dependencies

## Examples

See the `tests/` directory for examples:
- `article-guardrails.yaml` - Comprehensive content validation
- `command-execution.yaml` - Command functionality tests
- `edge-cases.yaml` - Error handling and edge cases