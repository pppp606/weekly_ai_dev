#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/hacker_news_reddit_digest.md"
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    teardown_test_env
}

# Test command file existence
@test "hacker_news_reddit_digest.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test command file contains required sources
@test "hacker_news_reddit_digest.md contains required sources" {
    file_contains "$COMMAND_FILE" "Hacker News"
    file_contains "$COMMAND_FILE" "r/LocalLLaMA"
    file_contains "$COMMAND_FILE" "r/MachineLearning"
    file_contains "$COMMAND_FILE" "r/artificial"
}

@test "hacker_news_reddit_digest.md contains proper URLs" {
    file_contains "$COMMAND_FILE" "hn.algolia.com"
    file_contains "$COMMAND_FILE" "reddit.com/r/LocalLLaMA"
    file_contains "$COMMAND_FILE" "reddit.com/r/MachineLearning"
    file_contains "$COMMAND_FILE" "reddit.com/r/artificial"
}

@test "hacker_news_reddit_digest.md contains Playwright instructions" {
    file_contains "$COMMAND_FILE" "mcp__playwright"
    file_contains "$COMMAND_FILE" "do NOT open new tabs"
    file_contains "$COMMAND_FILE" "Reddit blocks WebFetch"
}

@test "hacker_news_reddit_digest.md contains focus areas" {
    file_contains "$COMMAND_FILE" "AI development tools"
    file_contains "$COMMAND_FILE" "LLM-related discussions"
    file_contains "$COMMAND_FILE" "Open source LLM"
    file_contains "$COMMAND_FILE" "Model fine-tuning"
}

@test "hacker_news_reddit_digest.md contains execution steps" {
    file_contains "$COMMAND_FILE" "Execution Steps"
    file_contains "$COMMAND_FILE" "WebFetch"
    file_contains "$COMMAND_FILE" "Playwright"
    file_contains "$COMMAND_FILE" "same tab"
}

@test "hacker_news_reddit_digest.md contains output format" {
    file_contains "$COMMAND_FILE" "Output Format"
    file_contains "$COMMAND_FILE" "注目のトピック"
    file_contains "$COMMAND_FILE" "今週の技術トレンド"
}

# Test mock data creation
@test "mock Hacker News and Reddit data can be generated" {
    local mock_content
    mock_content=$(get_mock_hn_reddit_data)
    [[ -n "$mock_content" ]]
    echo "$mock_content" | grep -q "Hacker News"
    echo "$mock_content" | grep -q "Reddit"
    echo "$mock_content" | grep -q "MachineLearning"
    echo "$mock_content" | grep -q "LocalLLaMA"
}

# Test output file creation
@test "community_discussions.md output file can be created" {
    local output_file="${RESOURCE_DIR}/community_discussions.md"
    get_mock_hn_reddit_data > "$output_file"
    
    file_exists_and_not_empty "$output_file"
    verify_markdown_format "$output_file"
    contains_japanese "$output_file"
}

# Test output file structure
@test "community_discussions.md has correct structure" {
    local output_file="${RESOURCE_DIR}/community_discussions.md"
    get_mock_hn_reddit_data > "$output_file"
    
    # Check for main sections
    file_contains "$output_file" "# コミュニティディスカッション"
    file_contains "$output_file" "## Hacker News"
    file_contains "$output_file" "## Reddit"
}

# Test URL validation in output
@test "output contains valid discussion URLs" {
    local output_file="${RESOURCE_DIR}/community_discussions.md"
    get_mock_hn_reddit_data > "$output_file"
    
    # Check for valid URLs
    file_contains "$output_file" "news.ycombinator.com"
    file_contains "$output_file" "reddit.com"
}

# Test content filtering for AI-related topics
@test "output focuses on AI development discussions" {
    local output_file="${RESOURCE_DIR}/community_discussions.md"
    get_mock_hn_reddit_data > "$output_file"
    
    # Check for AI-related keywords
    file_contains "$output_file" "AI\|LLM\|機械学習\|フレームワーク"
}

# Test engagement metrics presence
@test "output contains engagement information" {
    local output_file="${RESOURCE_DIR}/community_discussions.md"
    get_mock_hn_reddit_data > "$output_file"
    
    # Check for engagement metrics
    file_contains "$output_file" "points\|upvotes"
}

# Test subreddit categorization
@test "output properly categorizes subreddit content" {
    local output_file="${RESOURCE_DIR}/community_discussions.md"
    get_mock_hn_reddit_data > "$output_file"
    
    # Check for subreddit mentions
    file_contains "$output_file" "MachineLearning"
    file_contains "$output_file" "LocalLLaMA"
}

# Test Japanese content requirement
@test "output contains Japanese explanations" {
    local output_file="${RESOURCE_DIR}/community_discussions.md"
    get_mock_hn_reddit_data > "$output_file"
    
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

# Test for Reddit bot detection handling
@test "command contains Reddit bot detection workarounds" {
    file_contains "$COMMAND_FILE" "Reddit blocks WebFetch"
    file_contains "$COMMAND_FILE" "always use Playwright"
    file_contains "$COMMAND_FILE" "appropriate delays"
}

# Test for technical focus requirements
@test "command emphasizes technical content over popularity" {
    file_contains "$COMMAND_FILE" "technical insights"
    file_contains "$COMMAND_FILE" "practical value"
    file_contains "$COMMAND_FILE" "not popularity metrics"
}

# Test for Japanese developer focus
@test "command targets Japanese developer insights" {
    file_contains "$COMMAND_FILE" "Japanese developers"
    file_contains "$COMMAND_FILE" "日本の開発者"
    file_contains "$COMMAND_FILE" "Japanese explanations"
}

# Test platform navigation instructions
@test "command contains proper navigation instructions" {
    file_contains "$COMMAND_FILE" "Navigate between"
    file_contains "$COMMAND_FILE" "using the same tab"
    file_contains "$COMMAND_FILE" "mcp__playwright__browser_navigate"
}

# Test weekly timeframe requirement
@test "command focuses on weekly content" {
    file_contains "$COMMAND_FILE" "past week"
    file_contains "$COMMAND_FILE" "今週"
    file_contains "$COMMAND_FILE" "t=week"
}