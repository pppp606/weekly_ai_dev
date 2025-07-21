#!/bin/bash

# Quick test script for evaluators
set -e

echo "🧪 Quick Evaluator Test"
echo "======================="
echo ""

# Change to correct directory
cd "$(dirname "$0")"

# Run simple validation
echo "🔧 Running basic validation..."
node scripts/simple-evaluator-test.js

echo ""
echo "🧪 Testing individual evaluators with promptfoo..."

# Test just one evaluator to verify the setup works
echo "📝 Testing article approval evaluator..."
timeout 60 npx promptfoo eval \
  --config configs/evaluator-validation.yaml \
  --filter "Article Approval Evaluator - Clean Article" \
  --verbose || {
    echo "❌ Evaluator test failed"
    exit 1
  }

echo ""
echo "✅ Quick evaluator test completed successfully!"
echo ""
echo "To run full evaluator test suite, use:"
echo "  ./run-evaluator-tests.sh"