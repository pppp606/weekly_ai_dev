#!/bin/bash

# Simple setup validation for Claude Code + promptfoo integration

echo "🔍 Checking Claude Code + promptfoo integration setup..."

# Check Claude Code CLI
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code CLI not found - please install it first"
    exit 1
fi
echo "✅ Claude Code CLI found"

# Check article_guardrail_review.md command
if [ ! -f "../../../.claude/commands/article_guardrail_review.md" ]; then
    echo "❌ article_guardrail_review.md command not found"
    exit 1
fi
echo "✅ article_guardrail_review.md command found"

# Check promptfoo
if ! command -v npx &> /dev/null || ! npx promptfoo --version &> /dev/null; then
    echo "❌ promptfoo not available - run 'npm install' first"
    exit 1
fi
echo "✅ promptfoo available"

# Check mock articles
if [ ! -d "mocks/articles" ] || [ -z "$(ls -A mocks/articles)" ]; then
    echo "❌ Mock articles not found"
    exit 1
fi
echo "✅ Mock articles found"

echo "🎉 Setup validation passed - ready for Claude Code + promptfoo testing!"