#!/bin/bash

# Script to run article guardrail review tests with mock environment

# Set test mode environment variable
export CLAUDE_CODE_TEST_MODE=true

# Set the working directory to the test directory
cd "$(dirname "$0")"

echo "Running article guardrail review tests..."
echo "Test mode: $CLAUDE_CODE_TEST_MODE"
echo "Working directory: $(pwd)"

# Create test results directory if it doesn't exist
mkdir -p test-results

# Run the promptfoo evaluation
npx promptfoo@latest eval \
  --config configs/article-guardrail-review.yaml \
  --no-cache \
  --verbose

# Check if the test passed
if [ $? -eq 0 ]; then
    echo "✅ Article guardrail review tests completed successfully!"
else
    echo "❌ Article guardrail review tests failed!"
    exit 1
fi

# Display results summary if available
if [ -f "test-results/article-guardrail-review-results.json" ]; then
    echo ""
    echo "Test results saved to: test-results/article-guardrail-review-results.json"
    echo ""
    echo "Summary:"
    npx promptfoo@latest view test-results/article-guardrail-review-results.json
fi