#!/bin/bash

# Common test helper functions for BATS tests

# Get current date in YYYY-MM-DD format
get_current_date() {
    date '+%Y-%m-%d'
}

# Get test date (yesterday to avoid timezone issues)
get_test_date() {
    date -v-1d '+%Y-%m-%d' 2>/dev/null || date -d 'yesterday' '+%Y-%m-%d'
}

# Create test resource directory
setup_test_resources() {
    local test_date="$1"
    local resource_dir="resources/${test_date}"
    mkdir -p "$resource_dir"
    echo "$resource_dir"
}

# Clean up test resources
cleanup_test_resources() {
    local test_date="$1"
    local resource_dir="resources/${test_date}"
    if [[ -d "$resource_dir" ]]; then
        rm -rf "$resource_dir"
    fi
}

# Check if file exists and is not empty
file_exists_and_not_empty() {
    local file="$1"
    [[ -f "$file" && -s "$file" ]]
}

# Check if directory exists
directory_exists() {
    local dir="$1"
    [[ -d "$dir" ]]
}

# Mock external API response
create_mock_response() {
    local mock_file="$1"
    local content="$2"
    echo "$content" > "$mock_file"
}

# Verify file contains expected content
file_contains() {
    local file="$1"
    local pattern="$2"
    grep -q "$pattern" "$file"
}

# Get Claude command path
get_claude_command_path() {
    local command_name="$1"
    echo ".claude/commands/${command_name}.md"
}

# Simulate Claude command execution
simulate_claude_command() {
    local command_file="$1"
    local date_arg="$2"
    
    # This would normally execute the Claude command
    # For testing, we'll create mock outputs
    echo "Simulating execution of: $command_file with date: $date_arg"
}

# Verify markdown file format
verify_markdown_format() {
    local file="$1"
    
    # Check for basic markdown structure
    if ! grep -q "^#" "$file"; then
        return 1
    fi
    
    return 0
}

# Check for Japanese content
contains_japanese() {
    local file="$1"
    # Simple check for Japanese characters (Hiragana, Katakana, Kanji)
    grep -q '[あ-んア-ヶ一-龯]' "$file"
}

# Setup test environment
setup_test_env() {
    export BATS_TEST_DIRNAME="$(dirname "$BATS_TEST_FILENAME")"
    export PROJECT_ROOT="$(cd "$BATS_TEST_DIRNAME/../.." && pwd)"
    cd "$PROJECT_ROOT"
}

# Teardown test environment
teardown_test_env() {
    cd "$PROJECT_ROOT"
}