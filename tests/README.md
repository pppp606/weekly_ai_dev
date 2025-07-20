# BATS Testing Framework

This directory contains BATS (Bash Automated Testing System) tests for the weekly AI development digest project.

## Directory Structure

```
tests/
├── unit/           # Unit tests for individual Claude commands
├── integration/    # Integration tests for command pipelines
├── helpers/        # Common test helper functions
└── README.md       # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests with TAP output
npm run test:watch
```

## Test Coverage

### Unit Tests
- Individual Claude command digest tests
- Command input/output validation
- Error handling verification

### Integration Tests
- Weekly digest pipeline end-to-end testing
- Multi-command interaction verification
- Data flow validation

## Writing Tests

Follow BATS testing conventions:
- Use descriptive test names with `@test` decorator
- Use helper functions for common operations
- Mock external dependencies when possible
- Test both success and failure scenarios