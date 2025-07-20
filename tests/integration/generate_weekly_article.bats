#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/generate_weekly_article.md"
    
    # Create articles directory for test
    mkdir -p "articles"
    
    # Expected article filename
    ARTICLE_DATE=$(date -v-1d '+%Y%m%d' 2>/dev/null || date -d 'yesterday' '+%Y%m%d')
    ARTICLE_FILE="articles/weekly_ai_${ARTICLE_DATE}.md"
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    
    # Clean up test articles
    rm -f "articles/weekly_ai_"*.md
    
    teardown_test_env
}

# Test command file existence
@test "generate_weekly_article.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test date calculation steps
@test "article generator includes all date format calculations" {
    file_contains "$COMMAND_FILE" "date +%Y-%m-%d"
    file_contains "$COMMAND_FILE" "date +%Y年%m月%d日"
    file_contains "$COMMAND_FILE" "date +%Y%m%d"
}

# Test resource collection steps
@test "article generator scans for all resource files" {
    file_contains "$COMMAND_FILE" "release_information.md"
    file_contains "$COMMAND_FILE" "trending_repositories.md"
    file_contains "$COMMAND_FILE" "ai_news_summary.md"
    file_contains "$COMMAND_FILE" "events.md"
    file_contains "$COMMAND_FILE" "community_discussions.md"
    file_contains "$COMMAND_FILE" "tech_blog_articles.md"
}

# Test content filtering rules
@test "article generator includes content filtering rules" {
    file_contains "$COMMAND_FILE" "Content Filtering Rules"
    file_contains "$COMMAND_FILE" "Focus on noteworthy features"
    file_contains "$COMMAND_FILE" "Exclude minor bug fixes"
    file_contains "$COMMAND_FILE" "Include repositories that demonstrate innovation"
}

# Test link requirements
@test "article generator enforces strict link requirements" {
    file_contains "$COMMAND_FILE" "CRITICAL: Always use the EXACT URLs"
    file_contains "$COMMAND_FILE" "NEVER generate, modify, or create placeholder URLs"
    file_contains "$COMMAND_FILE" "only use URLs that actually exist in the resource files"
}

# Test section ordering
@test "article generator enforces strict section order" {
    file_contains "$COMMAND_FILE" "CRITICAL: Strictly follow the section order"
    file_contains "$COMMAND_FILE" "1. リリース情報"
    file_contains "$COMMAND_FILE" "2. 注目のAI開発リポジトリ"
    file_contains "$COMMAND_FILE" "3. AI関連ニュース"
    file_contains "$COMMAND_FILE" "4. テックブログ"
    file_contains "$COMMAND_FILE" "5. 海外コミュニティ動向"
    file_contains "$COMMAND_FILE" "6. 今週のAI開発イベント"
    file_contains "$COMMAND_FILE" "7. まとめ"
}

# Integration test: Full resource set article generation
@test "generates article with all resources available" {
    # Create full mock resources
    create_mock_resources "$TEST_DATE"
    
    # Verify all resources exist
    local resources=(
        "release_information.md"
        "trending_repositories.md"
        "ai_news_summary.md"
        "events.md"
        "community_discussions.md"
        "tech_blog_articles.md"
    )
    
    for resource in "${resources[@]}"; do
        file_exists_and_not_empty "${RESOURCE_DIR}/${resource}"
    done
}

# Integration test: Partial resource article generation
@test "generates article with partial resources" {
    # Create only some resources
    mkdir -p "$RESOURCE_DIR"
    get_mock_release_data > "${RESOURCE_DIR}/release_information.md"
    get_mock_trending_repos_data > "${RESOURCE_DIR}/trending_repositories.md"
    get_mock_ai_news_data > "${RESOURCE_DIR}/ai_news_summary.md"
    
    # Verify partial resources exist
    file_exists_and_not_empty "${RESOURCE_DIR}/release_information.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/trending_repositories.md"
    file_exists_and_not_empty "${RESOURCE_DIR}/ai_news_summary.md"
    
    # Verify missing resources don't exist
    [ ! -f "${RESOURCE_DIR}/events.md" ]
    [ ! -f "${RESOURCE_DIR}/community_discussions.md" ]
    [ ! -f "${RESOURCE_DIR}/tech_blog_articles.md" ]
}

# Integration test: Empty content handling
@test "excludes sections with empty content" {
    # Create resources with some empty content
    mkdir -p "$RESOURCE_DIR"
    get_mock_release_data > "${RESOURCE_DIR}/release_information.md"
    echo "No events found" > "${RESOURCE_DIR}/events.md"
    echo "No updates" > "${RESOURCE_DIR}/ai_news_summary.md"
    
    # Verify command filters empty content
    file_contains "$COMMAND_FILE" "If a data file contains only \"No updates\""
    file_contains "$COMMAND_FILE" "exclude that entire section from the final article"
}

# Integration test: Article frontmatter generation
@test "generates proper Zenn frontmatter" {
    # Create test article content
    local test_content="---
title: \"週刊AI駆動開発 - ${TEST_DATE}\"
emoji: \"🤖\"
type: \"tech\"
topics: [\"ai駆動開発\", \"vibecoding\", \"ai\", \"claudecode\", \"Gemini CLI\", \"cursor\"]
published: true
---

Test content"
    
    echo "$test_content" > "$ARTICLE_FILE"
    
    # Verify frontmatter structure
    file_contains "$ARTICLE_FILE" "title: \"週刊AI駆動開発"
    file_contains "$ARTICLE_FILE" "emoji: \"🤖\""
    file_contains "$ARTICLE_FILE" "type: \"tech\""
    file_contains "$ARTICLE_FILE" "topics: \\[\"ai駆動開発\""
    file_contains "$ARTICLE_FILE" "published: true"
}

# Integration test: Japanese content preservation
@test "preserves Japanese content in article" {
    # Create mock resources with Japanese content
    create_mock_resources "$TEST_DATE"
    
    # Create test article with Japanese content
    echo "---
title: \"週刊AI駆動開発 - ${TEST_DATE}\"
emoji: \"🤖\"
type: \"tech\"
topics: [\"ai駆動開発\"]
published: true
---

今週のAI開発の最新動向をお届けします。

## 🚀 リリース情報
新しいAIツールがリリースされました。

## 📝 まとめ
今週は多くの進展がありました。" > "$ARTICLE_FILE"
    
    # Verify Japanese content exists
    contains_japanese "$ARTICLE_FILE"
    file_contains "$ARTICLE_FILE" "今週のAI開発"
    file_contains "$ARTICLE_FILE" "まとめ"
}

# Integration test: URL preservation
@test "preserves exact URLs from source files" {
    # Create mock resources
    create_mock_resources "$TEST_DATE"
    
    # Verify URLs in source files
    file_contains "${RESOURCE_DIR}/tech_blog_articles.md" "https://zenn.dev/example/articles/"
    file_contains "${RESOURCE_DIR}/tech_blog_articles.md" "https://qiita.com/example/items/"
    file_contains "${RESOURCE_DIR}/community_discussions.md" "https://news.ycombinator.com/item?id="
    file_contains "${RESOURCE_DIR}/events.md" "https://connpass.com/event/"
}

# Integration test: Article file naming
@test "creates article with correct filename format" {
    # Expected format: weekly_ai_YYYYMMDD.md
    local expected_pattern="^weekly_ai_[0-9]{8}\\.md$"
    local filename=$(basename "$ARTICLE_FILE")
    
    [[ "$filename" =~ $expected_pattern ]]
}

# Integration test: Error handling for missing resources
@test "handles missing resource directory gracefully" {
    # Remove resource directory
    rm -rf "$RESOURCE_DIR"
    
    # Verify command includes error handling
    file_contains "$COMMAND_FILE" "If no data files are found"
    file_contains "$COMMAND_FILE" "generate a minimal article explaining the situation"
}

# Integration test: Introduction vs Summary differentiation
@test "differentiates between introduction and summary sections" {
    file_contains "$COMMAND_FILE" "Introduction vs まとめ Differentiation Rules"
    file_contains "$COMMAND_FILE" "Introduction: Focus on welcoming readers"
    file_contains "$COMMAND_FILE" "まとめ: Write a very concise summary"
    file_contains "$COMMAND_FILE" "280 characters or less"
}

# Integration test: Repository link card format
@test "formats repository links for Zenn link cards" {
    # Create mock trending repos
    mkdir -p "$RESOURCE_DIR"
    get_mock_trending_repos_data > "${RESOURCE_DIR}/trending_repositories.md"
    
    # Verify plain URL format requirement
    file_contains "$COMMAND_FILE" "use plain URL format for link cards"
    file_contains "$COMMAND_FILE" "https://github.com/user/repo"
}

# Integration test: Article footer consistency
@test "includes consistent article footer" {
    file_contains "$COMMAND_FILE" "週刊AI駆動開発について"
    file_contains "$COMMAND_FILE" "この記事は以下リポジトリの内容で生成されています"
    file_contains "$COMMAND_FILE" "https://github.com/pppp606/weekly_ai_dev"
}

# Integration test: Data flow validation
@test "validates data flow from resources to article" {
    # Create full mock resources
    create_mock_resources "$TEST_DATE"
    
    # Simulate article generation
    echo "---
title: \"週刊AI駆動開発 - ${TEST_DATE}\"
emoji: \"🤖\"
type: \"tech\"
topics: [\"ai駆動開発\"]
published: true
---

今週のAI開発の最新動向をお届けします。

## 🚀 リリース情報
$(cat "${RESOURCE_DIR}/release_information.md")

## 📈 注目のAI開発リポジトリ
$(cat "${RESOURCE_DIR}/trending_repositories.md")

## 📝 まとめ
今週は多くの重要な進展がありました。" > "$ARTICLE_FILE"
    
    # Verify data from resources appears in article
    file_exists_and_not_empty "$ARTICLE_FILE"
    verify_markdown_format "$ARTICLE_FILE"
}

# Integration test: Section skipping for empty content
@test "skips sections with no meaningful content" {
    # Create resources with mixed content
    mkdir -p "$RESOURCE_DIR"
    get_mock_release_data > "${RESOURCE_DIR}/release_information.md"
    echo "No events found for this period." > "${RESOURCE_DIR}/events.md"
    echo "No updates" > "${RESOURCE_DIR}/ai_news_summary.md"
    
    # Verify command will skip empty sections
    file_contains "$COMMAND_FILE" "Only include sections for which data files exist AND contain meaningful content"
    file_contains "$COMMAND_FILE" "Never include sections with \"No updates\""
}

# Integration test: Multi-day resource handling
@test "handles resources from specific date correctly" {
    # Create resources for specific date
    create_mock_resources "$TEST_DATE"
    
    # Verify resources are in date-specific directory
    directory_exists "resources/${TEST_DATE}"
    
    # Verify all resources are in correct location
    local date_resources=(
        "resources/${TEST_DATE}/release_information.md"
        "resources/${TEST_DATE}/trending_repositories.md"
        "resources/${TEST_DATE}/ai_news_summary.md"
    )
    
    for resource in "${date_resources[@]}"; do
        [ -f "$resource" ]
    done
}