#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple validation without external dependencies
function log(message, color = 'white') {
  const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      log(`✅ ${description}: Found ${filePath}`, 'green');
      return true;
    } else {
      log(`❌ ${description}: Path exists but is not a file: ${filePath}`, 'red');
      return false;
    }
  } catch (e) {
    log(`❌ ${description}: File not found: ${filePath}`, 'red');
    return false;
  }
}

function checkDirectory(dirPath, description) {
  try {
    const stats = fs.statSync(dirPath);
    if (stats.isDirectory()) {
      log(`✅ ${description}: Found directory ${dirPath}`, 'green');
      return true;
    } else {
      log(`❌ ${description}: Path exists but is not a directory: ${dirPath}`, 'red');
      return false;
    }
  } catch (e) {
    log(`❌ ${description}: Directory not found: ${dirPath}`, 'red');
    return false;
  }
}

function validateTestStructure() {
  log('\n🔍 Validating Test Structure', 'blue');
  
  let passed = 0;
  let failed = 0;
  
  // Check main command file
  if (checkFile('../../.claude/commands/article_guardrail_review.md', 'Guardrail Command')) {
    passed++;
  } else {
    failed++;
  }
  
  // Check directories
  const dirs = [
    'configs',
    'configs/test-suites', 
    'providers',
    'mocks',
    'mocks/articles',
    'mocks/articles/violations',
    'mocks/articles/edge-cases',
    'scripts'
  ];
  
  for (const dir of dirs) {
    if (checkDirectory(dir, `Directory - ${dir}`)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  // Check config files
  const configs = [
    'configs/article-guardrail-review.yaml',
    'configs/test-suites/basic-scenarios.yaml',
    'configs/test-suites/guardrail-scenarios.yaml',
    'configs/test-suites/edge-cases.yaml'
  ];
  
  for (const config of configs) {
    if (checkFile(config, `Config - ${path.basename(config)}`)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  // Check provider files
  const providers = [
    'providers/article-guardrail-provider.ts',
    'providers/mock-date-provider.ts'
  ];
  
  for (const provider of providers) {
    if (checkFile(provider, `Provider - ${path.basename(provider)}`)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  // Check core test articles
  const coreArticles = [
    'mocks/articles/weekly-ai-digest-20250721.md',
    'mocks/articles/weekly-ai-digest-20250721-guardrail-fail.md',
    'mocks/articles/weekly-ai-digest-20250721-empty.md',
    'mocks/articles/weekly-ai-digest-minimal.md'
  ];
  
  for (const article of coreArticles) {
    if (checkFile(article, `Core Article - ${path.basename(article)}`)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  // Check violation test articles
  const violations = [
    'mocks/articles/violations/confidential-info.md',
    'mocks/articles/violations/personal-info.md',
    'mocks/articles/violations/security-exploits.md',
    'mocks/articles/violations/malicious-code.md',
    'mocks/articles/violations/inappropriate-content.md',
    'mocks/articles/violations/hate-speech.md',
    'mocks/articles/violations/political-bias.md',
    'mocks/articles/violations/medical-advice.md',
    'mocks/articles/violations/false-info.md'
  ];
  
  for (const violation of violations) {
    if (checkFile(violation, `Violation Test - ${path.basename(violation)}`)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  // Check edge case articles
  const edgeCases = [
    'mocks/articles/edge-cases/metadata-only.md',
    'mocks/articles/edge-cases/corrupted-file.md',
    'mocks/articles/edge-cases/legitimate-security.md',
    'mocks/articles/edge-cases/unicode-special-chars.md',
    'mocks/articles/edge-cases/broken-links.md'
  ];
  
  for (const edgeCase of edgeCases) {
    if (checkFile(edgeCase, `Edge Case - ${path.basename(edgeCase)}`)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  // Check script files
  const scripts = [
    'scripts/validate-setup.ts',
    'scripts/simple-validation.cjs',
    'scripts/simple-evaluator-test.js'
  ];
  
  for (const script of scripts) {
    if (checkFile(script, `Script - ${path.basename(script)}`)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  log('\n' + '='.repeat(60), 'blue');
  log(`📊 Summary: ${passed} passed, ${failed} failed`, failed === 0 ? 'green' : 'red');
  
  if (failed === 0) {
    log('\n✅ All validations passed! Test configuration is ready.', 'green');
  } else {
    log('\n❌ Some validations failed. Please fix the issues above.', 'red');
  }
  
  return failed === 0;
}

// Main execution
function main() {
  log('🧪 Simple Validation for Article Guardrail Review Tests', 'blue');
  
  const success = validateTestStructure();
  
  if (success) {
    log('\n🎯 Next Steps:', 'blue');
    log('   1. Install dependencies: npm install', 'white');
    log('   2. Run main test suite: npm test', 'white'); 
    log('   3. Or run individual suites:', 'white');
    log('      - npm run test:basic', 'white');
    log('      - npm run test:guardrails', 'white');
    log('      - npm run test:edge-cases', 'white');
    log('      - npm run test:evaluators', 'white');
  }
  
  if (!success) {
    process.exit(1);
  }
}

main();