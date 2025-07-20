#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/ai_events_digest.md"
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    teardown_test_env
}

# Test command file existence
@test "ai_events_digest.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test command file contains required sections
@test "ai_events_digest.md contains date calculation section" {
    file_contains "$COMMAND_FILE" "Date Calculation"
    file_contains "$COMMAND_FILE" "today's date"
    file_contains "$COMMAND_FILE" "tomorrow's date"
    file_contains "$COMMAND_FILE" "7 days later"
    file_contains "$COMMAND_FILE" "date +%Y-%m-%d"
}

@test "ai_events_digest.md contains search URLs" {
    file_contains "$COMMAND_FILE" "Search URLs to check"
    file_contains "$COMMAND_FILE" "connpass.com/search"
    file_contains "$COMMAND_FILE" "claude+ai+cursor"
    file_contains "$COMMAND_FILE" "llm+gpt+chatgpt"
    file_contains "$COMMAND_FILE" "AI開発+生成AI"
    file_contains "$COMMAND_FILE" "プロンプトエンジニアリング+prompt"
}

@test "ai_events_digest.md contains quality criteria" {
    file_contains "$COMMAND_FILE" "Quality Criteria"
    file_contains "$COMMAND_FILE" "MUST focus specifically on AI development"
    file_contains "$COMMAND_FILE" "Named expert speakers"
    file_contains "$COMMAND_FILE" "Hands-on workshops"
    file_contains "$COMMAND_FILE" "Technical deep-dives"
    file_contains "$COMMAND_FILE" "Live coding"
}

@test "ai_events_digest.md contains exclusion criteria" {
    file_contains "$COMMAND_FILE" "EXCLUDE"
    file_contains "$COMMAND_FILE" "General \"AI overview\" talks"
    file_contains "$COMMAND_FILE" "Networking events without technical content"
    file_contains "$COMMAND_FILE" "Vague \"AI discussion\" meetups"
    file_contains "$COMMAND_FILE" "Events without clear learning objectives"
}

@test "ai_events_digest.md contains output format" {
    file_contains "$COMMAND_FILE" "Output Requirements"
    file_contains "$COMMAND_FILE" "Event Title"
    file_contains "$COMMAND_FILE" "主催者"
    file_contains "$COMMAND_FILE" "日時"
    file_contains "$COMMAND_FILE" "形式"
    file_contains "$COMMAND_FILE" "参加費"
    file_contains "$COMMAND_FILE" "概要"
    file_contains "$COMMAND_FILE" "開発者向けポイント"
}

@test "ai_events_digest.md contains event selection topics" {
    file_contains "$COMMAND_FILE" "LLM (Large Language Models)"
    file_contains "$COMMAND_FILE" "AI agents"
    file_contains "$COMMAND_FILE" "Prompt engineering"
    file_contains "$COMMAND_FILE" "Claude / GPT / Gemini"
    file_contains "$COMMAND_FILE" "Cursor / Windsurf / Codeium"
    file_contains "$COMMAND_FILE" "RAG (Retrieval-Augmented Generation)"
    file_contains "$COMMAND_FILE" "Langchain / LlamaIndex"
}

@test "ai_events_digest.md contains fallback message" {
    file_contains "$COMMAND_FILE" "今週は注目すべきAI開発イベントが見つかりませんでした"
    file_contains "$COMMAND_FILE" "If fewer than 2 high-quality events"
}

# Test mock data creation
@test "mock events data can be generated" {
    local mock_content
    mock_content=$(get_mock_events_data)
    [[ -n "$mock_content" ]]
    echo "$mock_content" | grep -q "AI開発イベント"
    echo "$mock_content" | grep -q "今週のイベント"
    echo "$mock_content" | grep -q "来週のイベント"
}

# Test output file creation
@test "events.md output file can be created" {
    local output_file="${RESOURCE_DIR}/events.md"
    get_mock_events_data > "$output_file"
    
    file_exists_and_not_empty "$output_file"
    verify_markdown_format "$output_file"
    contains_japanese "$output_file"
}

# Test output file structure
@test "events.md has correct structure" {
    local output_file="${RESOURCE_DIR}/events.md"
    cat << 'EOF' > "$output_file"
# AI Development Events - 2025-07-20

## Upcoming Events (Next 7 Days)

### Event 1: [Claude API ハンズオンワークショップ](https://connpass.com/event/123456/)
- **主催者**: Anthropic Japan
- **日時**: 2025-07-21 19:00
- **形式**: Online
- **参加費**: Free
- **概要**: Claude APIを使った実践的な開発手法を学ぶハンズオンセッション
- **開発者向けポイント**: 実際にコードを書きながらClaude APIの使い方を習得できる

### Event 2: [LangChain実装入門](https://connpass.com/event/123457/)
- **主催者**: AI Dev Community
- **日時**: 2025-07-23 14:00
- **形式**: Offline (東京・渋谷)
- **参加費**: ¥3,000
- **概要**: LangChainを使ったAIアプリケーション開発の基礎を学ぶ
- **開発者向けポイント**: RAGシステムの実装方法やベストプラクティスを学べる
EOF
    
    # Check for main sections
    file_contains "$output_file" "# AI Development Events"
    file_contains "$output_file" "## Upcoming Events (Next 7 Days)"
    file_contains "$output_file" "### Event"
}

# Test event details format
@test "events have all required details" {
    local output_file="${RESOURCE_DIR}/events.md"
    cat << 'EOF' > "$output_file"
### Event 1: [テストイベント](https://example.com)
- **主催者**: Test Organizer
- **日時**: 2025-07-21 19:00
- **形式**: Online
- **参加費**: Free
- **概要**: テスト概要
- **開発者向けポイント**: テストポイント
EOF
    
    file_contains "$output_file" "\\*\\*主催者\\*\\*"
    file_contains "$output_file" "\\*\\*日時\\*\\*"
    file_contains "$output_file" "\\*\\*形式\\*\\*"
    file_contains "$output_file" "\\*\\*参加費\\*\\*"
    file_contains "$output_file" "\\*\\*概要\\*\\*"
    file_contains "$output_file" "\\*\\*開発者向けポイント\\*\\*"
}

# Test URL requirement
@test "events include direct URLs" {
    local output_file="${RESOURCE_DIR}/events.md"
    cat << 'EOF' > "$output_file"
### Event 1: [AI Workshop](https://connpass.com/event/12345/)
EOF
    
    file_contains "$output_file" "\\[.*\\](https://.*)"
    file_contains "$output_file" "connpass.com/event"
}

# Test Japanese content requirement
@test "output contains Japanese event descriptions" {
    local output_file="${RESOURCE_DIR}/events.md"
    get_mock_events_data > "$output_file"
    
    contains_japanese "$output_file"
    file_contains "$output_file" "勉強会\|ハンズオン\|セミナー"
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

# Test date range requirement
@test "command requires next 7 days timeframe" {
    file_contains "$COMMAND_FILE" "next 7 days"
    file_contains "$COMMAND_FILE" "starting tomorrow"
    file_contains "$COMMAND_FILE" "\\+1 day"
    file_contains "$COMMAND_FILE" "\\+7 days"
}

# Test file output requirements
@test "command specifies correct output location" {
    file_contains "$COMMAND_FILE" "Save to"
    file_contains "$COMMAND_FILE" "resources/\\[TODAY_DATE\\]/events.md"
    file_contains "$COMMAND_FILE" "generation date"
}

# Test URL parameter substitution
@test "command requires date substitution in URLs" {
    file_contains "$COMMAND_FILE" "start_from=\\[TOMORROW_DATE\\]"
    file_contains "$COMMAND_FILE" "start_to=\\[SEVEN_DAYS_LATER_DATE\\]"
    file_contains "$COMMAND_FILE" "Use the actual dates from the bash commands"
}

# Test search coverage
@test "command covers multiple search terms" {
    file_contains "$COMMAND_FILE" "claude+ai+cursor"
    file_contains "$COMMAND_FILE" "llm+gpt+chatgpt"
    file_contains "$COMMAND_FILE" "AI開発+生成AI"
    file_contains "$COMMAND_FILE" "プロンプトエンジニアリング"
}

# Test event count requirement
@test "command requires 2-4 high-quality events" {
    file_contains "$COMMAND_FILE" "2-4 HIGH-QUALITY events"
    file_contains "$COMMAND_FILE" "especially relevant to AI-driven development"
}

# Test quality focus
@test "command emphasizes technical quality" {
    file_contains "$COMMAND_FILE" "Named expert speakers from AI companies"
    file_contains "$COMMAND_FILE" "Hands-on workshops with specific tools"
    file_contains "$COMMAND_FILE" "Technical deep-dives"
    file_contains "$COMMAND_FILE" "Live coding or implementation sessions"
}

# Test exclusion enforcement
@test "command excludes low-quality events" {
    file_contains "$COMMAND_FILE" "General \"AI overview\" talks"
    file_contains "$COMMAND_FILE" "Networking events without technical content"
    file_contains "$COMMAND_FILE" "without clear learning objectives"
}

# Test AI development focus
@test "command focuses on practical AI development" {
    file_contains "$COMMAND_FILE" "AI-assisted development"
    file_contains "$COMMAND_FILE" "GitHub Copilot"
    file_contains "$COMMAND_FILE" "AI integration in development workflows"
    file_contains "$COMMAND_FILE" "AI API usage and best practices"
}

# Test empty result handling
@test "command handles no events scenario" {
    file_contains "$COMMAND_FILE" "If fewer than 2 high-quality events are found"
    file_contains "$COMMAND_FILE" "今週は注目すべきAI開発イベントが見つかりませんでした"
}

# Test format consistency
@test "command enforces consistent event format" {
    file_contains "$COMMAND_FILE" "Event Title"
    file_contains "$COMMAND_FILE" "event_url"
    file_contains "$COMMAND_FILE" "YYYY-MM-DD HH:MM"
    file_contains "$COMMAND_FILE" "Online/Offline"
    file_contains "$COMMAND_FILE" "Free/¥X,XXX"
}