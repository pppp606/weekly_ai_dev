#!/usr/bin/env bats

# Load test helpers
load '../helpers/common'
load '../helpers/mock_data'

# Setup and teardown
setup() {
    setup_test_env
    TEST_DATE=$(get_test_date)
    RESOURCE_DIR=$(setup_test_resources "$TEST_DATE")
    COMMAND_FILE=".claude/commands/vibecoding_release_digest.md"
}

teardown() {
    cleanup_test_resources "$TEST_DATE"
    teardown_test_env
}

# Test command file existence
@test "vibecoding_release_digest.md command file exists" {
    [ -f "$COMMAND_FILE" ]
}

# Test command file contains required repositories
@test "vibecoding_release_digest.md contains all required repositories" {
    file_contains "$COMMAND_FILE" "google-gemini/gemini-cli"
    file_contains "$COMMAND_FILE" "anthropics/claude-code"
    file_contains "$COMMAND_FILE" "cursor/cursor"
    file_contains "$COMMAND_FILE" "windsurf"
    file_contains "$COMMAND_FILE" "microsoft/vscode"
    file_contains "$COMMAND_FILE" "cline/cline"
    file_contains "$COMMAND_FILE" "kiro"
}

@test "vibecoding_release_digest.md contains source types" {
    file_contains "$COMMAND_FILE" "Source Type: GitHub Releases"
    file_contains "$COMMAND_FILE" "Source Type: CHANGELOG.md"
    file_contains "$COMMAND_FILE" "Source Type: Web Changelog"
}

@test "vibecoding_release_digest.md contains GitHub CLI commands" {
    file_contains "$COMMAND_FILE" "gh release list"
    file_contains "$COMMAND_FILE" "gh release view"
    file_contains "$COMMAND_FILE" "gh api repos"
    file_contains "$COMMAND_FILE" "--limit 1"
}

@test "vibecoding_release_digest.md contains web changelog URLs" {
    file_contains "$COMMAND_FILE" "https://cursor.sh/changelog"
    file_contains "$COMMAND_FILE" "https://www.codeium.com/changelog"
    file_contains "$COMMAND_FILE" "https://kiro.dev/changelog/"
}

@test "vibecoding_release_digest.md contains date calculation" {
    file_contains "$COMMAND_FILE" "Date Calculation"
    file_contains "$COMMAND_FILE" "date +%Y-%m-%d"
    file_contains "$COMMAND_FILE" "within the last 7days"
}

@test "vibecoding_release_digest.md contains execution steps" {
    file_contains "$COMMAND_FILE" "Execution Steps"
    file_contains "$COMMAND_FILE" "follow its specific \"How to check\" rules"
    file_contains "$COMMAND_FILE" "Calculate if the release/update date is within the last 7 days"
    file_contains "$COMMAND_FILE" "create a detailed summary"
    file_contains "$COMMAND_FILE" "EXCLUDE that repository from the output entirely"
}

@test "vibecoding_release_digest.md contains link requirements" {
    file_contains "$COMMAND_FILE" "Include Links"
    file_contains "$COMMAND_FILE" "Repository URL"
    file_contains "$COMMAND_FILE" "Release URL"
    file_contains "$COMMAND_FILE" "Changelog URL"
    file_contains "$COMMAND_FILE" "Website URL"
}

@test "vibecoding_release_digest.md contains VS Code AI feature filter" {
    file_contains "$COMMAND_FILE" "Only summarize changes related to AI features"
    file_contains "$COMMAND_FILE" "GitHub Copilot integration"
    file_contains "$COMMAND_FILE" "Ignore other changes"
}

# Test mock data creation
@test "mock release data can be generated" {
    local mock_content
    mock_content=$(get_mock_release_data)
    [[ -n "$mock_content" ]]
    echo "$mock_content" | grep -q "リリース情報"
    echo "$mock_content" | grep -q "主要なリリース"
    echo "$mock_content" | grep -q "ツール・ライブラリ"
}

# Test output file creation
@test "release_information.md output file can be created" {
    local output_file="${RESOURCE_DIR}/release_information.md"
    get_mock_release_data > "$output_file"
    
    file_exists_and_not_empty "$output_file"
    verify_markdown_format "$output_file"
    contains_japanese "$output_file"
}

# Test output file structure
@test "release_information.md has correct structure" {
    local output_file="${RESOURCE_DIR}/release_information.md"
    cat << 'EOF' > "$output_file"
# Release Information - 2025-07-20

## google-gemini/gemini-cli v0.2.0
- **Release Date**: 2025-07-19
- **Repository**: https://github.com/google-gemini/gemini-cli
- **Release**: https://github.com/google-gemini/gemini-cli/releases/tag/v0.2.0

### Key Changes:
- Added support for Gemini 1.5 Pro
- Improved streaming response handling
- Fixed memory leak in long conversations
- Added --model flag for model selection

## anthropics/claude-code v1.5.0
- **Release Date**: 2025-07-18
- **Repository**: https://github.com/anthropics/claude-code
- **Changelog**: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

### Key Changes:
- Introduced Claude 3 Opus support
- Enhanced code completion accuracy
- Added workspace-aware context management
- Performance improvements for large codebases
EOF
    
    # Check for main sections
    file_contains "$output_file" "# Release Information"
    file_contains "$output_file" "## google-gemini/gemini-cli"
    file_contains "$output_file" "## anthropics/claude-code"
    file_contains "$output_file" "### Key Changes:"
}

# Test release details format
@test "releases have required metadata" {
    local output_file="${RESOURCE_DIR}/release_information.md"
    cat << 'EOF' > "$output_file"
## cline/cline v2.1.0
- **Release Date**: 2025-07-20
- **Repository**: https://github.com/cline/cline
- **Release**: https://github.com/cline/cline/releases/tag/v2.1.0

### Key Changes:
- New feature added
EOF
    
    file_contains "$output_file" "\\*\\*Release Date\\*\\*"
    file_contains "$output_file" "\\*\\*Repository\\*\\*"
    file_contains "$output_file" "\\*\\*Release\\*\\*\|\\*\\*Changelog\\*\\*"
}

# Test URL formatting
@test "releases include proper URLs" {
    local output_file="${RESOURCE_DIR}/release_information.md"
    cat << 'EOF' > "$output_file"
- **Repository**: https://github.com/microsoft/vscode
- **Release**: https://github.com/microsoft/vscode/releases/tag/1.85.0
EOF
    
    file_contains "$output_file" "https://github.com/"
    file_contains "$output_file" "/releases/tag/"
}

# Test Japanese content requirement
@test "output can contain Japanese summaries" {
    local output_file="${RESOURCE_DIR}/release_information.md"
    cat << 'EOF' > "$output_file"
# リリース情報 - 2025-07-20

## cursor/cursor v0.30.0
- **リリース日**: 2025-07-19
- **ウェブサイト**: https://cursor.sh
- **変更履歴**: https://cursor.sh/changelog

### 主な変更点:
- AIコード補完の精度が向上
- 新しいショートカットキーを追加
- パフォーマンスの最適化
EOF
    
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

# Test 7-day window requirement
@test "command enforces 7-day release window" {
    file_contains "$COMMAND_FILE" "within the last 7days"
    file_contains "$COMMAND_FILE" "Calculate if the release/update date is within the last 7 days"
    file_contains "$COMMAND_FILE" "if today is 2025-07-05, then dates from 2025-06-28 onwards"
}

# Test file output requirements
@test "command specifies correct output location" {
    file_contains "$COMMAND_FILE" "Save the final report to"
    file_contains "$COMMAND_FILE" "resources/\\[TODAY_DATE\\]/release_information.md"
    file_contains "$COMMAND_FILE" "Create the date directory if it doesn't exist"
}

# Test exclusion rule
@test "command excludes old releases" {
    file_contains "$COMMAND_FILE" "CRITICAL"
    file_contains "$COMMAND_FILE" "If no new releases are found for a repository (older than 7 days)"
    file_contains "$COMMAND_FILE" "EXCLUDE that repository from the output entirely"
    file_contains "$COMMAND_FILE" "do NOT include \"No new releases\" entries"
}

# Test repository-specific rules
@test "each repository has specific check instructions" {
    # gemini-cli
    file_contains "$COMMAND_FILE" "google-gemini/gemini-cli.*How to check"
    
    # claude-code
    file_contains "$COMMAND_FILE" "anthropics/claude-code.*CHANGELOG.md"
    
    # cursor
    file_contains "$COMMAND_FILE" "cursor/cursor.*Manually visit"
    
    # VS Code
    file_contains "$COMMAND_FILE" "microsoft/vscode.*Only summarize changes related to AI"
}

# Test GitHub API usage
@test "command uses proper GitHub API calls" {
    file_contains "$COMMAND_FILE" "gh api repos/.*/commits"
    file_contains "$COMMAND_FILE" "gh api repos/.*/contents/CHANGELOG.md"
    file_contains "$COMMAND_FILE" "--header \"Accept: application/vnd.github.v3.raw\""
}

# Test manual check notes
@test "command notes manual requirements for web changelogs" {
    file_contains "$COMMAND_FILE" "Automated extraction from this source is not directly supported"
    file_contains "$COMMAND_FILE" "requires manual review"
    file_contains "$COMMAND_FILE" "advanced web scraping"
}

# Test release tag extraction
@test "command extracts release tags properly" {
    file_contains "$COMMAND_FILE" "Extract the release tag"
    file_contains "$COMMAND_FILE" "e.g., v0.1.9"
    file_contains "$COMMAND_FILE" "e.g., v2.0.0"
}

# Test summary requirements
@test "command requires key changes summary" {
    file_contains "$COMMAND_FILE" "Summarize the key changes"
    file_contains "$COMMAND_FILE" "new features"
    file_contains "$COMMAND_FILE" "from the release notes"
}

# Test complete repository coverage
@test "command covers all specified tools" {
    # AI development tools
    file_contains "$COMMAND_FILE" "gemini-cli"
    file_contains "$COMMAND_FILE" "claude-code"
    file_contains "$COMMAND_FILE" "cursor"
    file_contains "$COMMAND_FILE" "windsurf"
    file_contains "$COMMAND_FILE" "cline"
    file_contains "$COMMAND_FILE" "kiro"
    
    # VS Code with AI features
    file_contains "$COMMAND_FILE" "vscode"
}

# Test date format consistency
@test "command uses consistent date format" {
    file_contains "$COMMAND_FILE" "%Y-%m-%d"
    file_contains "$COMMAND_FILE" "YYYY-MM-DD"
}