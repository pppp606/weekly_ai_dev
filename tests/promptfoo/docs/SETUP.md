# Promptfoo Testing Framework - Setup Guide

## Overview

This guide will help you set up the Promptfoo testing framework for the Weekly AI Dev project. The framework provides comprehensive testing for AI-powered content generation, including release digests, news summaries, and article generation.

## Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Git
- API keys for:
  - OpenAI API
  - Anthropic Claude API

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/pppp606/weekly_ai_dev.git
cd weekly_ai_dev
```

### 2. Navigate to the Test Directory

```bash
cd tests/promptfoo
```

### 3. Install Dependencies

```bash
npm install
```

This will install:
- Promptfoo CLI and core library
- TypeScript and related tools
- Testing utilities (Jest, ESLint, Prettier)
- Required type definitions

### 4. Configure Environment Variables

Create a `.env` file in the `tests/promptfoo` directory:

```bash
touch .env
```

Add your API keys:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: Test Configuration
TEST_TIMEOUT=30000
MAX_RETRIES=3
```

### 5. Verify Installation

Run the setup verification:

```bash
npm run verify-setup
```

This will check:
- Node.js version compatibility
- Required dependencies installation
- Environment variable configuration
- Directory structure integrity

### 6. Run Initial Tests

Execute a basic test to ensure everything is working:

```bash
npm run test:basic
```

## Project Structure

After setup, your directory structure should look like:

```
tests/promptfoo/
├── configs/           # Test configurations
├── src/              # Source code and evaluators
├── prompts/          # Prompt templates
├── test-data/        # Test datasets
├── test-results/     # Test output (gitignored)
├── docs/             # Documentation
├── scripts/          # Utility scripts
├── .env              # Environment variables (gitignored)
├── package.json      # Project dependencies
└── tsconfig.json     # TypeScript configuration
```

## IDE Setup

### VS Code

1. Install recommended extensions:
   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features

2. Use the provided workspace settings:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

### IntelliJ IDEA / WebStorm

1. Enable TypeScript service
2. Configure ESLint integration
3. Set up Prettier as the default formatter

## Troubleshooting Setup Issues

### Common Issues

1. **Node.js Version Error**
   ```bash
   nvm install 18
   nvm use 18
   ```

2. **Permission Errors**
   ```bash
   sudo npm install -g promptfoo
   ```

3. **Missing Dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Environment Variable Issues**
   - Ensure `.env` file is in the correct directory
   - Check for typos in variable names
   - Verify API keys are valid

## Next Steps

After successful setup:

1. Read the [Usage Guide](./USAGE.md) to learn how to run tests
2. Review the [Architecture Documentation](./ARCHITECTURE.md) to understand the system design
3. Check the [Development Guide](./DEVELOPMENT.md) to start creating custom tests

## Support

If you encounter issues during setup:

1. Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Review existing GitHub issues
3. Create a new issue with:
   - Your environment details (OS, Node.js version)
   - Complete error messages
   - Steps to reproduce the problem