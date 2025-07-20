#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/ai_news_digest.md"
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    teardown_test_env
}

# Test command file existence
@test "ai_news_digest.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test command file contains required news sources
@test "ai_news_digest.md contains all major AI news sources" {
    file_contains "$COMMAND_FILE" "OpenAI Blog"
    file_contains "$COMMAND_FILE" "Google AI Blog"
    file_contains "$COMMAND_FILE" "Anthropic News"
    file_contains "$COMMAND_FILE" "Meta AI"
    file_contains "$COMMAND_FILE" "Microsoft Research"
    file_contains "$COMMAND_FILE" "DeepMind"
    file_contains "$COMMAND_FILE" "Hugging Face Blog"
}

@test "ai_news_digest.md contains proper source URLs" {
    file_contains "$COMMAND_FILE" "openai.com/blog"
    file_contains "$COMMAND_FILE" "ai.googleblog.com"
    file_contains "$COMMAND_FILE" "anthropic.com/news"
    file_contains "$COMMAND_FILE" "ai.meta.com/blog"
    file_contains "$COMMAND_FILE" "microsoft.com/en-us/research/blog"
    file_contains "$COMMAND_FILE" "deepmind.google/discover/blog"
    file_contains "$COMMAND_FILE" "huggingface.co/blog"
}

@test "ai_news_digest.md contains execution steps" {
    file_contains "$COMMAND_FILE" "Execution Steps"
    file_contains "$COMMAND_FILE" "WebFetch"
    file_contains "$COMMAND_FILE" "within last 7 days"
}

@test "ai_news_digest.md contains filtering criteria" {
    file_contains "$COMMAND_FILE" "AI-driven development relevance"
    file_contains "$COMMAND_FILE" "API updates"
    file_contains "$COMMAND_FILE" "developer tools"
    file_contains "$COMMAND_FILE" "EXCLUDE"
}

@test "ai_news_digest.md contains output format" {
    file_contains "$COMMAND_FILE" "Output Format"
    file_contains "$COMMAND_FILE" "Major Announcements"
    file_contains "$COMMAND_FILE" "Other Notable Updates"
    file_contains "$COMMAND_FILE" "Source References"
}

@test "ai_news_digest.md contains fallback message" {
    file_contains "$COMMAND_FILE" "今週はAI駆動開発に関連する重要なニュースはありませんでした"
}

# Test mock data creation
@test "mock AI news data can be generated" {
    local mock_content
    mock_content=$(get_mock_ai_news_data)
    [[ -n "$mock_content" ]]
    echo "$mock_content" | grep -q "企業動向"
    echo "$mock_content" | grep -q "技術動向"
    echo "$mock_content" | grep -q "業界動向"
}

# Test output file creation
@test "ai_news_summary.md output file can be created" {
    local output_file="${RESOURCE_DIR}/ai_news_summary.md"
    get_mock_ai_news_data > "$output_file"
    
    file_exists_and_not_empty "$output_file"
    verify_markdown_format "$output_file"
    contains_japanese "$output_file"
}

# Test output file structure
@test "ai_news_summary.md has correct structure" {
    local output_file="${RESOURCE_DIR}/ai_news_summary.md"
    get_mock_ai_news_data > "$output_file"
    
    # Check for main sections
    file_contains "$output_file" "# AI関連ニュース"
    file_contains "$output_file" "## 企業動向"
    file_contains "$output_file" "## 技術動向"
    file_contains "$output_file" "## 業界動向"
}

# Test content filtering for AI development
@test "output focuses on AI development content" {
    local output_file="${RESOURCE_DIR}/ai_news_summary.md"
    get_mock_ai_news_data > "$output_file"
    
    # Check for AI development keywords
    file_contains "$output_file" "OpenAI\|Google\|Anthropic\|GPT\|Gemini\|Claude"
}

# Test Japanese content requirement
@test "output contains Japanese explanations" {
    local output_file="${RESOURCE_DIR}/ai_news_summary.md"
    get_mock_ai_news_data > "$output_file"
    
    contains_japanese "$output_file"
}

# Test error handling for missing directories
@test "handles missing resource directory gracefully" {
    local non_existent_dir="resources/9999-99-99"
    
    # Should be able to create directory if it doesn't exist
    run mkdir -p "$non_existent_dir"
    [ "$status" -eq 0 ]
    
    # Cleanup
    rmdir "$non_existent_dir" 2>/dev/null || true
}

# Test command file format validation
@test "command file is valid markdown" {
    verify_markdown_format "$COMMAND_FILE"
}

# Test timeframe requirements
@test "command emphasizes recent news only" {
    file_contains "$COMMAND_FILE" "last 7 days ONLY"
    file_contains "$COMMAND_FILE" "recent updates"
    file_contains "$COMMAND_FILE" "MUST be within last 7 days"
}

# Test developer focus requirements
@test "command focuses on developer-relevant content" {
    file_contains "$COMMAND_FILE" "developer impact"
    file_contains "$COMMAND_FILE" "developer tools"
    file_contains "$COMMAND_FILE" "開発者への影響"
    file_contains "$COMMAND_FILE" "AI-driven development"
}

# Test exclusion criteria
@test "command contains proper exclusion criteria" {
    file_contains "$COMMAND_FILE" "EXCLUDE"
    file_contains "$COMMAND_FILE" "General AI research"
    file_contains "$COMMAND_FILE" "medical AI"
    file_contains "$COMMAND_FILE" "robotics without dev relevance"
}

# Test link requirements
@test "command requires proper link inclusion" {
    file_contains "$COMMAND_FILE" "Link Requirements"
    file_contains "$COMMAND_FILE" "original article URL"
    file_contains "$COMMAND_FILE" "source blog/website URL"
}

# Test source variety
@test "command covers diverse AI company sources" {
    # Test major companies are covered
    file_contains "$COMMAND_FILE" "OpenAI"
    file_contains "$COMMAND_FILE" "Google"
    file_contains "$COMMAND_FILE" "Anthropic"
    file_contains "$COMMAND_FILE" "Meta"
    file_contains "$COMMAND_FILE" "Microsoft"
    file_contains "$COMMAND_FILE" "DeepMind"
    file_contains "$COMMAND_FILE" "Hugging Face"
}

# Test output template structure
@test "command provides complete output template" {
    file_contains "$COMMAND_FILE" "Company Name"
    file_contains "$COMMAND_FILE" "News title"
    file_contains "$COMMAND_FILE" "Publication date"
    file_contains "$COMMAND_FILE" "Article URL"
    file_contains "$COMMAND_FILE" "開発者への影響"
}

# Test empty news handling
@test "command handles no news scenario" {
    file_contains "$COMMAND_FILE" "If no announcements"
    file_contains "$COMMAND_FILE" "minimal file"
    file_contains "$COMMAND_FILE" "今週はAI駆動開発"
}