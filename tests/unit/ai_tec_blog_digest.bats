#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/ai_tec_blog_digest.md"
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    teardown_test_env
}

# Test command file existence
@test "ai_tec_blog_digest.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test command file contains required sections
@test "ai_tec_blog_digest.md contains required search URLs" {
    file_contains "$COMMAND_FILE" "zenn.dev"
    file_contains "$COMMAND_FILE" "qiita.com"
    file_contains "$COMMAND_FILE" "note.com"
}

@test "ai_tec_blog_digest.md contains target criteria" {
    file_contains "$COMMAND_FILE" "Target Article Criteria"
    file_contains "$COMMAND_FILE" "Claude"
    file_contains "$COMMAND_FILE" "GPT"
    file_contains "$COMMAND_FILE" "AI"
}

@test "ai_tec_blog_digest.md contains execution steps" {
    file_contains "$COMMAND_FILE" "Execution Steps"
    file_contains "$COMMAND_FILE" "WebFetch"
    file_contains "$COMMAND_FILE" "Playwright"
}

@test "ai_tec_blog_digest.md contains proper output format" {
    file_contains "$COMMAND_FILE" "Output Format"
    file_contains "$COMMAND_FILE" "Featured Articles"
    file_contains "$COMMAND_FILE" "Trending Topics"
}

# Test resource directory creation
@test "resource directory can be created for current date" {
    directory_exists "$RESOURCE_DIR"
}

# Test mock data creation
@test "mock AI blog data can be generated" {
    local mock_content
    mock_content=$(get_mock_ai_blog_data)
    [[ -n "$mock_content" ]]
    echo "$mock_content" | grep -q "Zenn記事"
    echo "$mock_content" | grep -q "Qiita記事"
    echo "$mock_content" | grep -q "note記事"
}

# Test output file creation
@test "tech_blog_articles.md output file can be created" {
    local output_file="${RESOURCE_DIR}/tech_blog_articles.md"
    get_mock_ai_blog_data > "$output_file"
    
    file_exists_and_not_empty "$output_file"
    verify_markdown_format "$output_file"
    contains_japanese "$output_file"
}

# Test output file format validation
@test "tech_blog_articles.md has correct structure" {
    local output_file="${RESOURCE_DIR}/tech_blog_articles.md"
    get_mock_ai_blog_data > "$output_file"
    
    # Check for main sections
    file_contains "$output_file" "# AI技術ブログ記事まとめ"
    file_contains "$output_file" "## Zenn記事"
    file_contains "$output_file" "## Qiita記事"
    file_contains "$output_file" "## note記事"
}

# Test URL validation in output
@test "output contains valid article URLs" {
    local output_file="${RESOURCE_DIR}/tech_blog_articles.md"
    get_mock_ai_blog_data > "$output_file"
    
    # Check for valid URLs
    file_contains "$output_file" "https://zenn.dev/"
    file_contains "$output_file" "https://qiita.com/"
    file_contains "$output_file" "https://note.com/"
}

# Test article metadata presence
@test "output contains article metadata" {
    local output_file="${RESOURCE_DIR}/tech_blog_articles.md"
    get_mock_ai_blog_data > "$output_file"
    
    # Check for author information
    file_contains "$output_file" "author"
    file_contains "$output_file" "developer"
    file_contains "$output_file" "writer"
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

# Test content filtering for AI-related topics
@test "output focuses on AI development content" {
    local output_file="${RESOURCE_DIR}/tech_blog_articles.md"
    get_mock_ai_blog_data > "$output_file"
    
    # Check for AI-related keywords
    file_contains "$output_file" "LLM\|機械学習\|深層学習\|AI\|ChatGPT"
}

# Test Japanese content requirement
@test "output contains Japanese text" {
    local output_file="${RESOURCE_DIR}/tech_blog_articles.md"
    get_mock_ai_blog_data > "$output_file"
    
    contains_japanese "$output_file"
}

# Test file permissions
@test "output file has correct permissions" {
    local output_file="${RESOURCE_DIR}/tech_blog_articles.md"
    get_mock_ai_blog_data > "$output_file"
    
    # File should be readable
    [ -r "$output_file" ]
    # File should be writable
    [ -w "$output_file" ]
}

# Test command file format validation
@test "command file is valid markdown" {
    verify_markdown_format "$COMMAND_FILE"
}

# Test for required bot evasion instructions
@test "command contains note.com Playwright instructions" {
    file_contains "$COMMAND_FILE" "mcp__playwright__browser_navigate"
    file_contains "$COMMAND_FILE" "Do NOT open new tabs"
}

# Test for platform-specific instructions
@test "command contains platform-specific access notes" {
    file_contains "$COMMAND_FILE" "Platform Access Notes"
    file_contains "$COMMAND_FILE" "WebFetch returns only HTML/CSS"
    file_contains "$COMMAND_FILE" "use WebSearch as fallback"
}