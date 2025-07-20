# BATS Testing Framework Guide

## Overview

This project uses BATS (Bash Automated Testing System) to ensure the reliability and quality of Claude commands in the weekly AI development digest pipeline.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test suites
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:watch         # TAP output format
```

## Test Structure

```
tests/
├── unit/                  # Individual command tests
│   ├── ai_tec_blog_digest.bats
│   ├── hacker_news_reddit_digest.bats
│   ├── ai_news_digest.bats
│   ├── ai_trending_repositories_digest.bats
│   ├── ai_events_digest.bats
│   ├── vibecoding_release_digest.bats
│   └── error_handling.bats
├── integration/           # Pipeline and workflow tests
│   ├── weekly_digest_pipeline.bats
│   └── generate_weekly_article.bats
├── helpers/              # Shared test utilities
│   ├── common.bash       # Common helper functions
│   └── mock_data.bash    # Mock data generators
└── README.md
```

## Writing Tests

### Basic Test Structure

```bash
#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    teardown_test_env
}

@test "descriptive test name" {
    # Test implementation
    [ -f "expected_file.md" ]
    file_contains "file.md" "expected_content"
}
```

### Helper Functions

#### Common Functions (`tests/helpers/common.bash`)

- `get_current_date()` - Get today's date in YYYY-MM-DD format
- `get_test_date()` - Get yesterday's date for testing
- `setup_test_resources(date)` - Create test resource directory
- `cleanup_test_resources(date)` - Remove test resources
- `file_exists_and_not_empty(file)` - Check file existence and content
- `file_contains(file, pattern)` - Check file content
- `verify_markdown_format(file)` - Validate markdown structure
- `contains_japanese(file)` - Check for Japanese characters

#### Mock Data Functions (`tests/helpers/mock_data.bash`)

- `get_mock_ai_blog_data()` - Generate mock blog article data
- `get_mock_hn_reddit_data()` - Generate mock community discussion data
- `get_mock_ai_news_data()` - Generate mock AI news data
- `get_mock_trending_repos_data()` - Generate mock repository data
- `get_mock_events_data()` - Generate mock event data
- `get_mock_release_data()` - Generate mock release information
- `create_mock_resources(date)` - Create all mock resource files

## Test Categories

### Unit Tests

Test individual Claude commands:
- Command file existence and structure
- Required content sections
- URL and source validation
- Execution step verification
- Output format compliance
- Mock data generation
- Error handling

#### Example Unit Test Pattern

```bash
@test "command file contains required sections" {
    file_contains "$COMMAND_FILE" "Execution Steps"
    file_contains "$COMMAND_FILE" "Output Format"
    file_contains "$COMMAND_FILE" "Target Criteria"
}

@test "output file can be created with correct format" {
    local output_file="${RESOURCE_DIR}/expected_output.md"
    get_mock_data > "$output_file"
    
    file_exists_and_not_empty "$output_file"
    verify_markdown_format "$output_file"
    contains_japanese "$output_file"
}
```

### Integration Tests

Test pipeline workflows and command interactions:
- End-to-end pipeline execution
- Multi-command data flow
- Resource file dependencies
- Sequential execution order
- Error recovery scenarios
- Article generation process

#### Example Integration Test Pattern

```bash
@test "pipeline creates all required resource files" {
    create_mock_resources "$TEST_DATE"
    
    # Verify all expected files exist
    file_exists_and_not_empty "${RESOURCE_DIR}/tech_blog_articles.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/community_discussions.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/ai_news_summary.md"
}

@test "article generation uses all available resources" {
    create_mock_resources "$TEST_DATE"
    
    # Test article generation logic
    local article_file="articles/weekly-ai-digest-${TEST_DATE//-/}.md"
    
    # Article should incorporate all resource data
    file_contains "$article_file" "技術ブログ"
    file_contains "$article_file" "コミュニティ"
    file_contains "$article_file" "ニュース"
}
```

### Error Handling Tests

Test various failure scenarios:
- Missing files and directories
- Invalid date formats
- Corrupted or empty files
- Network timeout simulation
- Permission errors
- Resource limitations

## Best Practices

### Test Design

1. **Use Descriptive Names**: Test names should clearly describe what is being tested
2. **Test One Thing**: Each test should verify a single aspect
3. **Use Helpers**: Leverage common functions to reduce duplication
4. **Mock External Dependencies**: Use mock data instead of real API calls
5. **Clean Up**: Always clean up test artifacts in teardown

### Mock Data

1. **Realistic Content**: Mock data should resemble actual command output
2. **Japanese Content**: Include Japanese text for language validation
3. **Valid URLs**: Use realistic but safe URLs
4. **Complete Structure**: Include all expected sections and metadata

### Error Testing

1. **Test Edge Cases**: Include tests for boundary conditions
2. **Graceful Degradation**: Verify system handles failures appropriately
3. **Recovery Scenarios**: Test ability to recover from partial failures
4. **Resource Constraints**: Test behavior under resource limitations

### Performance Considerations

1. **Fast Execution**: Tests should run quickly
2. **Parallel Safe**: Tests should not interfere with each other
3. **Minimal Resources**: Use only necessary resources
4. **Efficient Cleanup**: Clean up promptly to avoid resource leaks

## Local Development

Since these tests interact with Claude Code commands, they must be run locally where Claude Code is installed.

### Running Tests Locally

```bash
# Run all tests
npm test

# Check specific test output
npm run test:unit -- --verbose

# Run tests with TAP output
npm run test:watch
```

### Before Committing

It's recommended to run tests locally before committing changes to ensure Claude commands are working correctly.

## Troubleshooting

### Common Issues

1. **Test File Not Found**
   - Check file paths are relative to test directory
   - Verify helper functions are loaded correctly

2. **Mock Data Issues**
   - Ensure mock data functions return expected format
   - Check Japanese character encoding

3. **Permission Errors**
   - Verify test has write access to resource directories
   - Check file cleanup in teardown functions

4. **Date Format Issues**
   - Use helper functions for consistent date handling
   - Test with various date formats

### Debugging Tests

```bash
# Run single test file
bats tests/unit/ai_tec_blog_digest.bats

# Run specific test
bats tests/unit/ai_tec_blog_digest.bats -f "command file exists"

# Verbose output
bats tests/unit/ai_tec_blog_digest.bats --verbose

# TAP format for detailed output
bats tests/unit/ai_tec_blog_digest.bats --tap
```

## Extending Tests

### Adding New Command Tests

1. Create new test file: `tests/unit/new_command.bats`
2. Follow existing test patterns
3. Add mock data to `tests/helpers/mock_data.bash` if needed
4. Update integration tests if command affects pipeline

### Adding New Helper Functions

1. Add to appropriate helper file (`common.bash` or `mock_data.bash`)
2. Document function purpose and parameters
3. Add tests for the helper function itself
4. Update this guide with new function documentation

### Adding Integration Scenarios

1. Create tests in `tests/integration/`
2. Focus on command interactions and data flow
3. Test error recovery and partial failure scenarios
4. Verify end-to-end workflow completion

## Resources

- [BATS Documentation](https://bats-core.readthedocs.io/)
- [BATS GitHub Repository](https://github.com/bats-core/bats-core)
- [TAP Specification](https://testanything.org/)
- [Bash Test Best Practices](https://github.com/sstephenson/bats/wiki/Bash-Test-Best-Practices)