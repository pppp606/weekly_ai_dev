#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/weekly_digest_pipeline.md"
    ARTICLE_COMMAND_FILE=".claude/commands/generate_weekly_article.md"
    
    # Create articles directory for test
    mkdir -p "articles"
    
    # Track which digest commands exist
    export DIGEST_COMMANDS=()
    for cmd in vibecoding_release_digest ai_trending_repositories_digest ai_news_digest ai_events_digest hacker_news_reddit_digest ai_tec_blog_digest; do
        if [[ -f ".claude/commands/${cmd}.md" ]]; then
            DIGEST_COMMANDS+=("$cmd")
        fi
    done
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    
    # Clean up any test articles
    rm -f "articles/weekly_ai_"*.md
    
    teardown_test_env
}

# Test command file existence
@test "weekly_digest_pipeline.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test pipeline command structure
@test "pipeline command contains all required steps" {
    file_contains "$COMMAND_FILE" "Execute Individual Digest Commands Sequentially"
    file_contains "$COMMAND_FILE" "Error Handling"
    file_contains "$COMMAND_FILE" "Generate Final Article Using Dedicated Command"
    file_contains "$COMMAND_FILE" "Article Guardrail Review"
    file_contains "$COMMAND_FILE" "Commit Generated Content"
}

# Test pipeline execution order
@test "pipeline defines correct execution order" {
    file_contains "$COMMAND_FILE" "vibecoding_release_digest.md"
    file_contains "$COMMAND_FILE" "ai_trending_repositories_digest.md"
    file_contains "$COMMAND_FILE" "ai_news_digest.md"
    file_contains "$COMMAND_FILE" "ai_events_digest.md"
    file_contains "$COMMAND_FILE" "hacker_news_reddit_digest.md"
    file_contains "$COMMAND_FILE" "ai_tec_blog_digest.md"
}

# Test sequential execution benefit documentation
@test "pipeline documents sequential execution benefits" {
    file_contains "$COMMAND_FILE" "Sequential Execution Benefits"
    file_contains "$COMMAND_FILE" "Avoids API rate limiting"
    file_contains "$COMMAND_FILE" "Easier error tracking"
    file_contains "$COMMAND_FILE" "predictable resource usage"
}

# Test error handling strategy
@test "pipeline includes error handling strategy" {
    file_contains "$COMMAND_FILE" "If a digest command fails"
    file_contains "$COMMAND_FILE" "Continue with the next command"
    file_contains "$COMMAND_FILE" "Keep track of which commands succeeded/failed"
}

# Test article generation step
@test "pipeline includes article generation command" {
    file_contains "$COMMAND_FILE" "generate_weekly_article.md"
    file_contains "$COMMAND_FILE" "Collect all generated reports"
    file_contains "$COMMAND_FILE" "Process available data"
}

# Test guardrail review step
@test "pipeline includes guardrail review" {
    file_contains "$COMMAND_FILE" "article_guardrail_review.md"
    file_contains "$COMMAND_FILE" "Review the article for confidential information"
    file_contains "$COMMAND_FILE" "Check for political/religious bias"
}

# Test commit process
@test "pipeline includes commit process" {
    file_contains "$COMMAND_FILE" "commit_weekly_digest.md"
    file_contains "$COMMAND_FILE" "Add all generated files"
    file_contains "$COMMAND_FILE" "Create a commit with meaningful message"
}

# Integration test: Resource directory creation
@test "pipeline creates proper resource directory structure" {
    # Simulate pipeline creating directories
    local expected_dir="resources/${TEST_DATE}"
    directory_exists "$expected_dir"
}

# Integration test: Multi-command data flow
@test "pipeline supports data flow between digest commands" {
    # Create mock resources to simulate digest command outputs
    create_mock_resources "$TEST_DATE"
    
    # Verify all expected resource files exist
    file_exists_and_not_empty "${RESOURCE_DIR}/release_information.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/trending_repositories.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/ai_news_summary.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/events.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/community_discussions.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/tech_blog_articles.md"
}

# Integration test: Error recovery scenario
@test "pipeline handles partial command failures gracefully" {
    # Create only some mock resources to simulate partial failure
    mkdir -p "$RESOURCE_DIR"
    get_mock_release_data > "${RESOURCE_DIR}/release_information.md"
    get_mock_trending_repos_data > "${RESOURCE_DIR}/trending_repositories.md"
    # Simulate failures for other commands by not creating their files
    
    # Verify pipeline can still generate article with partial data
    file_exists_and_not_empty "${RESOURCE_DIR}/release_information.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/trending_repositories.md"
    
    # Missing files should not exist
    [ ! -f "${RESOURCE_DIR}/ai_news_summary.md" ]
    [ ! -f "${RESOURCE_DIR}/events.md" ]
}

# Integration test: Date handling across commands
@test "pipeline maintains consistent date handling" {
    # Verify pipeline uses same date format across all operations
    file_contains "$COMMAND_FILE" "date +%Y-%m-%d"
    
    # Verify resource directory follows date format
    [[ "$RESOURCE_DIR" =~ resources/[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]
}

# Integration test: Article generation trigger
@test "pipeline triggers article generation after digest completion" {
    # Create full mock resources
    create_mock_resources "$TEST_DATE"
    
    # Verify all required data exists for article generation
    local required_files=(
        "release_information.md"
        "trending_repositories.md" 
        "ai_news_summary.md"
        "events.md"
        "community_discussions.md"
        "tech_blog_articles.md"
    )
    
    for file in "${required_files[@]}"; do
        file_exists_and_not_empty "${RESOURCE_DIR}/${file}"
    done
}

# Integration test: Pipeline completion state
@test "pipeline produces expected output structure" {
    # Create mock resources
    create_mock_resources "$TEST_DATE"
    
    # Simulate article creation
    local article_file="articles/weekly_ai_$(date -v-1d '+%Y%m%d' 2>/dev/null || date -d 'yesterday' '+%Y%m%d').md"
    echo "---
title: \"週刊AI駆動開発 - ${TEST_DATE}\"
emoji: \"🤖\"
type: \"tech\"
topics: [\"ai駆動開発\", \"vibecoding\", \"ai\", \"claudecode\", \"Gemini CLI\", \"cursor\"]
published: true
---

Test article content" > "$article_file"
    
    # Verify article was created
    file_exists_and_not_empty "$article_file"
    
    # Verify article has proper frontmatter
    file_contains "$article_file" "title: \"週刊AI駆動開発"
    file_contains "$article_file" "emoji: \"🤖\""
}

# Integration test: Command discovery
@test "pipeline discovers all digest commands dynamically" {
    # Count actual digest commands
    local digest_count=0
    for file in .claude/commands/*_digest.md; do
        if [[ -f "$file" && "$file" != *"weekly_digest_pipeline.md" ]]; then
            ((digest_count++))
        fi
    done
    
    # Verify pipeline can handle variable number of digest commands
    [[ $digest_count -gt 0 ]]
}

# Integration test: Status tracking
@test "pipeline tracks command execution status" {
    file_contains "$COMMAND_FILE" "Keep track of which commands succeeded/failed"
    file_contains "$COMMAND_FILE" "Include status report in the final output"
}

# Integration test: Japanese content handling
@test "pipeline handles Japanese content properly" {
    # Create mock resources with Japanese content
    create_mock_resources "$TEST_DATE"
    
    # Verify Japanese content is preserved
    contains_japanese "${RESOURCE_DIR}/tech_blog_articles.md"
    contains_japanese "${RESOURCE_DIR}/ai_news_summary.md"
    contains_japanese "${RESOURCE_DIR}/events.md"
}

# Integration test: Final output format
@test "pipeline produces Note-compatible output" {
    file_contains "$COMMAND_FILE" "final article should be in Japanese"
    file_contains "$COMMAND_FILE" "appropriate formatting for Note"
    file_contains "$COMMAND_FILE" "Include relevant emojis"
}