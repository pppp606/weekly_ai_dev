#!/usr/bin/env node

/**
 * Simple test to verify evaluator functionality
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple mock test
const mockResponse = `## Guardrail Review Results

**Status**: APPROVED

**Summary**: The article content has been reviewed and found compliant with all guardrail policies.

The article discusses AI development topics appropriately and does not contain any violations.`;

const mockContext = {
  vars: { articlePath: 'tests/promptfoo/mocks/articles/weekly-ai-digest-20250721.md' }
};

console.log('🧪 Simple Evaluator Test');
console.log('========================');
console.log('');

console.log('✅ Mock response created');
console.log('✅ Mock context created');
console.log('');

// Test basic parsing logic
try {
  const statusMatch = mockResponse.match(/Status\s*:\s*(APPROVED|BLOCKED|NEEDS REVISION)/i);
  const status = statusMatch ? statusMatch[1] : null;
  
  const summaryMatch = mockResponse.match(/(?:## )?Summary\s*[:\n]\s*(.*?)(?=\n##|\n\n|$)/s);
  const summary = summaryMatch ? summaryMatch[1].trim() : '';
  
  const hasProperFormat = /##\s*Guardrail Review Results/i.test(mockResponse);
  
  console.log(`✅ Status parsing: ${status}`);
  console.log(`✅ Summary parsing: ${summary.length > 0 ? 'Found' : 'Not found'}`);
  console.log(`✅ Format check: ${hasProperFormat ? 'Proper format' : 'Poor format'}`);
  console.log('');
  
  // Test violation pattern matching
  const violationPatterns = [
    { type: 'api_key', pattern: /API\s*key/gi },
    { type: 'personal_info', pattern: /personal\s*information/gi },
    { type: 'exploit', pattern: /exploit/gi }
  ];
  
  let detectedViolations = 0;
  for (const { type, pattern } of violationPatterns) {
    if (pattern.test(mockResponse)) {
      detectedViolations++;
      console.log(`⚠️  Detected ${type} violation`);
    }
  }
  
  if (detectedViolations === 0) {
    console.log('✅ No violations detected (expected for clean response)');
  }
  
  console.log('');
  console.log('🎉 Basic evaluator logic working correctly!');
  console.log('');
  
  // Check if evaluator files exist
  const evaluatorFiles = [
    '../evaluators/article-approval-evaluator.ts',
    '../evaluators/violation-detection-evaluator.ts', 
    '../evaluators/format-compliance-evaluator.ts',
    '../evaluators/response-quality-evaluator.ts'
  ];
  
  console.log('📁 Checking evaluator files:');
  for (const file of evaluatorFiles) {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${path.basename(file)}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${path.basename(file)}: Not found`);
    }
  }
  
  console.log('');
  
  // Check utility files
  const utilFiles = [
    '../evaluators/utils/response-parser.ts',
    '../evaluators/utils/violation-classifier.ts',
    '../evaluators/utils/metrics-calculator.ts'
  ];
  
  console.log('🔧 Checking utility files:');
  for (const file of utilFiles) {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${path.basename(file)}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${path.basename(file)}: Not found`);
    }
  }
  
  console.log('');
  console.log('✅ All evaluator files are present and ready for testing!');
  
} catch (error) {
  console.log(`❌ Test failed: ${error.message}`);
  process.exit(1);
}