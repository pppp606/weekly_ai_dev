# Troubleshooting Guide

This guide helps resolve common issues when running Promptfoo tests for the Weekly AI Dev Digest project.

## Common Issues

### 1. Test Command Not Found

**Error:**
```bash
npm test
> command not found: promptfoo
```

**Solution:**
```bash
# Reinstall dependencies
npm install

# Or install promptfoo globally
npm install -g promptfoo
```

### 2. Mock Provider Errors

**Error:**
```
Error: Cannot find module './providers/mock-claude'
```

**Solution:**
```bash
# Rebuild TypeScript files
npm run build

# Or run in development mode
npm run dev
```

### 3. Environment Variables Not Loaded

**Error:**
```
Error: Missing required environment variable
```

**Solution:**
1. Create `.env` file:
```bash
cp .env.example .env
```

2. Add required variables:
```env
TEST_ENV=development
MOCK_MODE=true
```

### 4. TypeScript Compilation Errors

**Error:**
```
TSError: ⨯ Unable to compile TypeScript
```

**Solution:**
```bash
# Check TypeScript configuration
npm run type-check

# Fix compilation issues
npm run build
```

### 5. Test Timeout Issues

**Error:**
```
Error: Test timeout of 30000ms exceeded
```

**Solution:**
1. Increase timeout in config:
```yaml
# promptfooconfig.yaml
evaluateOptions:
  maxConcurrency: 1
  timeout: 60000  # 60 seconds
```

2. Or run tests sequentially:
```bash
npm run test:sequential
```

## Platform-Specific Issues

### macOS

**Issue:** Permission denied when running scripts

```bash
# Fix permissions
chmod +x quickstart.sh
chmod +x scripts/*.ts
```

### Windows

**Issue:** Line ending problems

```bash
# Configure git to handle line endings
git config core.autocrlf true

# Or use WSL
wsl npm test
```

### Linux

**Issue:** Node.js version conflicts

```bash
# Use nvm to manage versions
nvm install 20
nvm use 20
```

## CI/CD Issues

### GitHub Actions Failures

**Issue:** Tests pass locally but fail in CI

**Common causes:**
1. Environment differences
2. Missing secrets
3. Network restrictions

**Solutions:**

1. Check workflow logs:
   - Go to Actions tab
   - Click on failed run
   - Expand failed step

2. Verify secrets are set:
   - Settings → Secrets → Actions
   - Add required secrets

3. Test with CI environment:
```bash
CI=true npm test
```

### Artifact Upload Failures

**Issue:** Test reports not uploading

**Solution:**
Ensure output directories exist:
```yaml
# In workflow file
- name: Create output directory
  run: mkdir -p tests/promptfoo/output
```

## Mock Data Issues

### Outdated Mock Data

**Issue:** Tests fail due to date mismatches

**Solution:**
```bash
# Update mock dates
npm run update-mocks

# Or manually update dates
npm run update-mocks -- --date 2024-01-15
```

### Missing Mock Scenarios

**Issue:** Mock provider returns undefined

**Solution:**
1. Check scenario name in test:
```yaml
providers:
  - id: mock-claude
    config:
      scenario: "exact-scenario-name"  # Must match mock data
```

2. Add missing scenario to mock data:
```typescript
// providers/mock-data/scenarios.ts
export const scenarios = {
  'exact-scenario-name': {
    // Add mock response
  }
};
```

## Performance Issues

### Slow Test Execution

**Solutions:**

1. Run tests in parallel:
```bash
npm run test:parallel
```

2. Skip expensive tests:
```bash
npm run test:fast
```

3. Use test filtering:
```bash
npm run test -- --filter "content-quality"
```

### Memory Issues

**Error:**
```
FATAL ERROR: JavaScript heap out of memory
```

**Solution:**
```bash
# Increase memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm test
```

## Debugging Techniques

### 1. Enable Debug Logging

```bash
# Set debug environment variable
DEBUG=promptfoo:* npm test
```

### 2. Inspect Test Output

```bash
# Save raw output
npm run test -- --output output/debug.json

# View in browser
npm run test:report
open test-report.html
```

### 3. Test Individual Components

```bash
# Test mock provider
npm run test:mock

# Test evaluators
npm run test:evaluators

# Test specific scenario
npm run test:scenario -- scenario-name
```

### 4. Interactive Debugging

```javascript
// Add debugger statement in evaluator
export async function contentQualityEvaluator(output, context) {
  debugger; // Breakpoint here
  // ... rest of code
}
```

Run with inspector:
```bash
node --inspect-brk node_modules/.bin/promptfoo eval
```

## Getting Help

### 1. Check Logs

Always check:
- Console output
- `output/` directory
- `test-report.json`

### 2. Validate Configuration

```bash
# Validate YAML syntax
npm run validate:config

# Check all files
npm run validate:all
```

### 3. Clean State

If nothing else works:
```bash
# Clean everything and start fresh
npm run clean
rm -rf node_modules package-lock.json
npm install
npm test
```

### 4. Report Issues

When reporting issues, include:
1. Error message
2. Node.js version (`node --version`)
3. OS and version
4. Steps to reproduce
5. Relevant logs

## FAQ

**Q: Can I run tests without API keys?**
A: Yes, tests use mock providers by default. API keys are only needed for live testing.

**Q: How do I update test baselines?**
A: Run `npm run update-baselines` after verifying the new output is correct.

**Q: Why do tests pass locally but fail in CI?**
A: Usually due to environment differences. Run with `CI=true npm test` locally to simulate.

**Q: How do I skip flaky tests?**
A: Add `.skip` to test description or use `--filter` to exclude them.