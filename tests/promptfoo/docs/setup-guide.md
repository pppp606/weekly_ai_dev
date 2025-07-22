# Promptfoo Testing Setup Guide

This guide will help you set up and run the Promptfoo testing system for the Weekly AI Dev Digest project.

## Prerequisites

- Node.js 18+ (recommended: Node.js 20)
- npm or yarn
- Git

## Quick Start

```bash
# Navigate to the test directory
cd tests/promptfoo

# Run the quick start script
./quickstart.sh
```

## Manual Setup

### 1. Install Dependencies

```bash
cd tests/promptfoo
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `tests/promptfoo` directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
# Optional: Add API keys if testing with real providers
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Test environment settings
TEST_ENV=development
MOCK_MODE=true
```

### 3. Verify Installation

Run the verification script:

```bash
npm run verify
```

This will check:
- Node.js version compatibility
- All dependencies are installed
- Environment is configured correctly
- Mock data is accessible

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

```bash
# Test article guardrails
npm run test:guardrails

# Test command functionality
npm run test:commands

# Test with specific scenarios
npm run test:scenario -- content-quality
```

### Generate Test Reports

```bash
npm run test:report
```

Reports will be generated in:
- `output/` - Raw Promptfoo output
- `test-report.html` - HTML report
- `test-report.json` - JSON summary

## Directory Structure

```
tests/promptfoo/
├── configs/           # Test configurations
├── providers/         # Custom providers and mocks
├── tests/            # Test specifications
├── scripts/          # Utility scripts
├── output/           # Test results (gitignored)
└── docs/             # Documentation
```

## Common Issues

### Node Version Mismatch

If you see errors about Node.js version:

```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Use the correct Node version
nvm use 20
```

### Missing Dependencies

If tests fail due to missing dependencies:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Permission Issues

If you encounter permission issues:

```bash
# Make scripts executable
chmod +x quickstart.sh
chmod +x scripts/*.ts
```

## CI/CD Integration

Tests automatically run on:
- Push to main branch
- Pull requests
- Manual workflow dispatch

View test results:
1. Go to Actions tab in GitHub
2. Select "Promptfoo Tests" workflow
3. View run details and artifacts

## Next Steps

- Read the [Test Writing Guide](test-writing-guide.md) to create new tests
- Check [Troubleshooting Guide](troubleshooting.md) for common issues
- Review existing tests in `tests/` directory for examples