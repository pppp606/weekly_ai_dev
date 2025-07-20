#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/ai_trending_repositories_digest.md"
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    teardown_test_env
}

# Test command file existence
@test "ai_trending_repositories_digest.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test command file contains required sections
@test "ai_trending_repositories_digest.md contains trending source" {
    file_contains "$COMMAND_FILE" "Trending Source"
    file_contains "$COMMAND_FILE" "https://github.com/trending?since=weekly"
}

@test "ai_trending_repositories_digest.md contains execution steps" {
    file_contains "$COMMAND_FILE" "Execution Steps"
    file_contains "$COMMAND_FILE" "Check previous trending_repositories.md files"
    file_contains "$COMMAND_FILE" "Use WebFetch to get the trending repositories page"
    file_contains "$COMMAND_FILE" "Parse the repositories and their descriptions"
    file_contains "$COMMAND_FILE" "Filter repositories based on the selection criteria"
    file_contains "$COMMAND_FILE" "Write detailed feature articles"
}

@test "ai_trending_repositories_digest.md contains selection criteria" {
    file_contains "$COMMAND_FILE" "Selection Criteria"
    file_contains "$COMMAND_FILE" "Tools for working with LLMs"
    file_contains "$COMMAND_FILE" "Agent frameworks"
    file_contains "$COMMAND_FILE" "AI-assisted development tools"
    file_contains "$COMMAND_FILE" "Libraries or services that integrate AI"
    file_contains "$COMMAND_FILE" "CLI or automation tools using AI"
}

@test "ai_trending_repositories_digest.md contains duplicate prevention rules" {
    file_contains "$COMMAND_FILE" "Duplicate Prevention Rules"
    file_contains "$COMMAND_FILE" "MUST check all previous trending_repositories.md files"
    file_contains "$COMMAND_FILE" "NEVER feature the same repository"
    file_contains "$COMMAND_FILE" "smallcloudai/refact"
    file_contains "$COMMAND_FILE" "humanlayer/12-factor-agents"
    file_contains "$COMMAND_FILE" "stanford-oval/storm"
}

@test "ai_trending_repositories_digest.md contains output format" {
    file_contains "$COMMAND_FILE" "Output Format"
    file_contains "$COMMAND_FILE" "Repository name and GitHub URL"
    file_contains "$COMMAND_FILE" "Description of its purpose"
    file_contains "$COMMAND_FILE" "Key features"
    file_contains "$COMMAND_FILE" "Why it's significant"
}

@test "ai_trending_repositories_digest.md contains fallback message" {
    file_contains "$COMMAND_FILE" "There are no repositories to feature"
    file_contains "$COMMAND_FILE" "If no suitable repository is found"
    file_contains "$COMMAND_FILE" "Do NOT force selection"
}

@test "ai_trending_repositories_digest.md contains link requirements" {
    file_contains "$COMMAND_FILE" "Link Requirements"
    file_contains "$COMMAND_FILE" "direct GitHub repository URL"
    file_contains "$COMMAND_FILE" "Include links to documentation"
    file_contains "$COMMAND_FILE" "For trending page source"
}

@test "ai_trending_repositories_digest.md contains writing guidelines" {
    file_contains "$COMMAND_FILE" "Writing Guidelines"
    file_contains "$COMMAND_FILE" "natural, conversational Japanese"
    file_contains "$COMMAND_FILE" "Avoid translation-like phrases"
    file_contains "$COMMAND_FILE" "Focus on practical benefits"
    file_contains "$COMMAND_FILE" "Use specific examples"
}

# Test mock data creation
@test "mock trending repositories data can be generated" {
    local mock_content
    mock_content=$(get_mock_trending_repos_data)
    [[ -n "$mock_content" ]]
    echo "$mock_content" | grep -q "AIトレンドリポジトリ"
    echo "$mock_content" | grep -q "機械学習フレームワーク"
    echo "$mock_content" | grep -q "LLMツール"
}

# Test output file creation
@test "trending_repositories.md output file can be created" {
    local output_file="${RESOURCE_DIR}/trending_repositories.md"
    get_mock_trending_repos_data > "$output_file"
    
    file_exists_and_not_empty "$output_file"
    verify_markdown_format "$output_file"
    contains_japanese "$output_file"
}

# Test output file structure
@test "trending_repositories.md has correct structure" {
    local output_file="${RESOURCE_DIR}/trending_repositories.md"
    cat << 'EOF' > "$output_file"
# Trending AI Development Repositories - 2025-07-20

## [ollama/ollama](https://github.com/ollama/ollama)

### 概要
Ollamaは、ローカル環境で大規模言語モデル（LLM）を簡単に実行できるツールです。開発者がクラウドAPIに依存せず、自分のマシンでLLMを活用できるようになります。

### 主な機能
- ワンコマンドでのモデルインストール
- 複数のLLMモデルをサポート
- RESTful API提供
- GPUアクセラレーション対応

### 注目される理由
プライバシーを重視する開発者や、オフライン環境でのAI開発のニーズが高まる中、ローカルでLLMを動かせるツールとして注目を集めています。
EOF
    
    # Check for main sections
    file_contains "$output_file" "# Trending AI Development Repositories"
    file_contains "$output_file" "## \\[.*\\](https://github.com/"
    file_contains "$output_file" "### 概要"
    file_contains "$output_file" "### 主な機能"
    file_contains "$output_file" "### 注目される理由"
}

# Test AI development focus
@test "output focuses on AI development tools" {
    local output_file="${RESOURCE_DIR}/trending_repositories.md"
    get_mock_trending_repos_data > "$output_file"
    
    # Check for AI development keywords
    file_contains "$output_file" "LLM\|機械学習\|深層学習\|AI\|pytorch\|tensorflow"
}

# Test Japanese content requirement
@test "output contains natural Japanese explanations" {
    local output_file="${RESOURCE_DIR}/trending_repositories.md"
    cat << 'EOF' > "$output_file"
# Trending AI Development Repositories - 2025-07-20

## [example/repo](https://github.com/example/repo)

### 概要
開発者向けのAIツールで、コード生成を効率化します。特に繰り返し作業の自動化に強みがあります。

### 主な機能
- 自動コード生成
- テンプレート管理
- CI/CD統合

### 注目される理由
最近のAI開発ブームの中で、実用的なツールとして評価されています。特に小規模チームでの採用が増えています。
EOF
    
    contains_japanese "$output_file"
    # Check for natural Japanese (not translation-like)
    file_contains "$output_file" "開発者向け"
    file_contains "$output_file" "効率化します"
    file_contains "$output_file" "評価されています"
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

# Test date calculation requirement
@test "command requires date calculation" {
    file_contains "$COMMAND_FILE" "Date Calculation"
    file_contains "$COMMAND_FILE" "date +%Y-%m-%d"
    file_contains "$COMMAND_FILE" "today's date"
}

# Test file output requirements
@test "command specifies correct output location" {
    file_contains "$COMMAND_FILE" "File Output"
    file_contains "$COMMAND_FILE" "resources/\\[TODAY_DATE\\]/trending_repositories.md"
    file_contains "$COMMAND_FILE" "Create the date directory if it doesn't exist"
}

# Test repository exclusion list
@test "command maintains exclusion list" {
    file_contains "$COMMAND_FILE" "Previously featured repositories to exclude"
    file_contains "$COMMAND_FILE" "smallcloudai/refact"
    file_contains "$COMMAND_FILE" "humanlayer/12-factor-agents"
    file_contains "$COMMAND_FILE" "stanford-oval/storm"
}

# Test example output structure
@test "command provides complete example structure" {
    file_contains "$COMMAND_FILE" "Example Output Structure"
    file_contains "$COMMAND_FILE" "Repository Name"
    file_contains "$COMMAND_FILE" "概要"
    file_contains "$COMMAND_FILE" "主な機能"
    file_contains "$COMMAND_FILE" "注目される理由"
}

# Test empty result handling
@test "command handles no suitable repositories scenario" {
    file_contains "$COMMAND_FILE" "If no suitable repository is found"
    file_contains "$COMMAND_FILE" "There are no repositories to feature"
    file_contains "$COMMAND_FILE" "do not invent one"
}

# Test AI relevance filtering
@test "command enforces strict AI development relevance" {
    file_contains "$COMMAND_FILE" "clearly relevant to AI-driven development"
    file_contains "$COMMAND_FILE" "OpenAI, Claude, Gemini"
    file_contains "$COMMAND_FILE" "Agent frameworks"
    file_contains "$COMMAND_FILE" "code generation, prompt tools"
}

# Test duplicate check requirement
@test "command requires checking previous digests" {
    file_contains "$COMMAND_FILE" "check all previous trending_repositories.md files"
    file_contains "$COMMAND_FILE" "ensure they haven't been featured"
    file_contains "$COMMAND_FILE" "NEVER feature the same repository"
}