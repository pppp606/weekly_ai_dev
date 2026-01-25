# Release Information (2026-01-18 ~ 2026-01-25)

## 1. Claude Code (anthropics/claude-code)

**Source**: CHANGELOG.md
**Latest Version**: 2.1.19
**CHANGELOG Updated**: 2026-01-23

### Key Changes in Recent Versions

#### Version 2.1.19 (Latest)
- **Task System Environment Variable**: Added `CLAUDE_CODE_ENABLE_TASKS` env var to disable new task system temporarily
- **Command Arguments Shorthand**: Added `$0`, `$1`, etc. for accessing individual arguments in custom commands
- **Bug Fixes**:
  - Fixed crashes on processors without AVX instruction support
  - Fixed dangling Claude Code processes when terminal is closed
  - Fixed `/rename` and `/tag` not updating correct session in git worktrees
  - Fixed pasted text content loss when using prompt stash (Ctrl+S)
  - Fixed agent list displaying incorrect default model
  - Fixed backgrounded hook commands not returning early
  - Fixed file write preview omitting empty lines
- **Skill Changes**: Skills without additional permissions/hooks now allowed without approval
- **SDK**: Added replay of `queued_command` attachment messages
- **VSCode**: Enabled session forking and rewind functionality for all users

#### Version 2.1.18
- **Customizable Keyboard Shortcuts**: Configure keybindings per context, create chord sequences. Run `/keybindings` to get started.
  - Documentation: https://code.claude.com/docs/en/keybindings

#### Version 2.1.16
- **New Task Management System**: Added new task capabilities including dependency tracking
- **VSCode Native Plugin Management**: Added plugin management support
- **OAuth Session Browsing**: VSCode users can browse and resume remote Claude sessions
- **Memory Fixes**: Fixed out-of-memory crashes when resuming sessions with heavy subagent usage

**Links**:
- Repository: https://github.com/anthropics/claude-code
- CHANGELOG: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

---

## 2. Cursor

**Source**: Web Changelog
**Latest Version**: 2.4
**Release Date**: 2026-01-22

### Version 2.4 - Subagents, Skills, and Image Generation

#### Major New Features

**Subagents**
- Independent agents that handle discrete tasks in parallel
- Custom prompts and tool access for each subagent
- Dedicated context windows for isolated task execution

**Skills**
- Domain-specific capabilities defined in `SKILL.md` files
- Dynamic context discovery for specialized tasks
- Stored in project directories for team sharing

**Image Generation**
- Create images directly from agents using text descriptions
- Support for reference image uploads
- Integrated into the agent workflow

**Cursor Blame (Enterprise)**
- Links code lines to AI-generated conversation summaries
- Provides audit trail for AI-assisted code changes

**Agent Q&A**
- Agents can ask clarifying questions while continuing work in background
- Improves task completion accuracy without blocking workflow

### Version CLI Update (2026-01-16)

**CLI Agent Modes**
- Plan Mode (`/plan` or `--mode=plan`): Design approach before coding
- Ask Mode (`/ask` or `--mode=ask`): Explore code without making changes

**Cloud Handoff**
- Prepend `&` to push conversations to cloud agents
- Access conversations via web or mobile

**Other Improvements**
- Word-level diffs for precise change highlighting
- MCP Authentication with one-click login for external tools

**Links**:
- Website: https://cursor.sh
- Changelog: https://cursor.com/changelog

---

## 3. GitHub Copilot CLI (github/copilot-cli)

**Source**: GitHub Releases
**Latest Version**: 0.0.394
**Release Date**: 2026-01-24

### Version 0.0.394 (2026-01-24)
- **Context Deduplication**: Deduplicate identical model instruction files to save context
- **Accurate Usage Metrics**: Exit summary displays accurate usage metrics instead of zeros
- **Git Improvements**: Getting git branch works in repositories with no commits
- **GHE Cloud Support**: Add support for GitHub Enterprise Cloud (*.ghe.com) in /delegate command
- **UI Consistency**: Directory path uses consistent muted text color
- **Plugin Skills**: Plugin skills work in agent responses
- **Timeline Cleanup**: Timeline hides startup messages to reduce noise
- **Tool Fixes**: Fixed timeline entry regression for read_agent and other tools
- **Git Status**: Git status updates on-demand instead of polling every 15 seconds
- **SDK Enhancement**: SDK supports infinite sessions with automatic context compaction
- **Memory Handling**: Memory loading errors handled gracefully without warnings
- **Delegate Command**: `/delegate` command accepts optional prompt, uses conversation context
- **Auto-update**: Auto-update no longer removes old CLI package versions
- **Task Completion**: Improved task completion with clearer detached process guidance
- **UI Simplification**: Simplified bottom bar by hiding some keyboard hints
- **Command Queuing**: Queue slash commands alongside messages using Ctrl+D
- **Session Search**: Press `/` to search sessions in `/resume`

### Version 0.0.393 (2026-01-23)
- Show conversation compaction status as timeline messages
- Memory loading no longer warns when outside a Git repository
- Add support for GHE Cloud (*.ghe.com) remote custom agents
- Plugin uninstall now works correctly
- Expose MCP server and tool names in tool.execution_start events
- **Esc-Esc Undo**: Add Esc-Esc shortcut to undo file changes to any previous snapshot

### Version 0.0.392 (2026-01-22)
- **Plugin Command**: Add `/plugin` command for plugin marketplace management
- Add `/rename` command as alias for `/session rename`
- Add `/plugin update` command to update installed plugins
- Edit tool displays diffs when expanded in timeline

### Version 0.0.390 (2026-01-22)
- Preserve extended thinking after compaction
- Custom agents with MCP servers avoid unnecessary restarts
- Enable steering during plan mode

**Links**:
- Repository: https://github.com/github/copilot-cli
- Release: https://github.com/github/copilot-cli/releases/tag/v0.0.394

---

## 4. Kiro

**Source**: Web Changelog
**Latest Version**: CLI 1.24.0 / IDE 0.8
**Release Date**: 2026-01-16

### CLI Version 1.24.0 (2026-01-16)

**Skills System**
- Progressive context loading for large documentation sets
- Dynamic context discovery based on task requirements

**Custom Diff Tools**
- Support for external diff options like delta and difftastic
- Configure custom diff viewers in settings

**AST Pattern Tools**
- `pattern-search`: Find code patterns using AST queries
- `pattern-rewrite`: Precise code refactoring with AST transformations
- Works across 18 languages without additional LSP setup

**Context Management**
- `/compact` command to manage conversation history
- Helps maintain context efficiency when approaching limits

**Security Features**
- Granular URL permissions for `web_fetch` tool using regex patterns
- Remote authentication via Google/GitHub with port forwarding support

### IDE Version 0.8 Patches (2026-01-15)
- Stability and performance improvements (0.8.140, 0.8.135, 0.8.86)
- Enhanced web tools and supervised mode features

**Links**:
- Website: https://kiro.dev
- Changelog: https://kiro.dev/changelog/

---

## 5. OpenAI Codex (openai/codex)

**Source**: GitHub Releases
**Latest Version**: 0.90.0-alpha.5 (Pre-release) / 0.89.0 (Stable)
**Release Date**: 2026-01-24 (alpha) / 2026-01-22 (stable)

### Version 0.89.0 (Stable - 2026-01-22)

**New Features**
- **`/permissions` Command**: New UI with shorter approval set (keeping `/approvals` for compatibility)
- **`/skill` UI**: Enable or disable individual skills through UI
- **Improved Slash Commands**: Prioritizing exact and prefix matches over fuzzy matches
- **App Server Enhancements**:
  - Support for `thread/read` API
  - Filter archived threads in `thread/list`
  - Layered `config.toml` resolution
  - `config/read` can compute effective config from given cwd

**Bug Fixes**
- Fixed tilde expansion escaping HOME on paths like `~//...`
- TUI turn timing now resets between assistant messages

**Documentation**
- Updated MCP subcommand docs to match current CLI behavior
- Refreshed `skills/list` protocol README examples

**Chores**
- Removed TUI2 experiment, keeping terminal-native UI

### Version 0.90.0-alpha.5 (Pre-release - 2026-01-24)
- Latest alpha version with ongoing development

**Links**:
- Repository: https://github.com/openai/codex
- Release: https://github.com/openai/codex/releases/tag/rust-v0.89.0

---

## 6. Cline (cline/cline)

**Source**: GitHub Releases
**Latest Version**: 3.53.1
**Release Date**: 2026-01-24

### Version 3.53.1 (2026-01-24)
- **Bug Fix**: Fixed bug in responses API

### Version 3.53.0 (2026-01-23)
- **Model Changes**: Removed grok model from free tier

**Links**:
- Repository: https://github.com/cline/cline
- Release: https://github.com/cline/cline/releases/tag/v3.53.1

---

## 7. Microsoft VS Code (microsoft/vscode)

**Source**: GitHub Releases
**Latest Version**: 1.108.2
**Release Date**: 2026-01-23

### Version 1.108.2 - December 2025 Recovery 2

This is a recovery/patch release. For AI-related features, refer to VS Code 1.108 release notes.

### AI Features in VS Code 1.108

**Agent Skills (Experimental)**
- Store specialized agent capabilities in `.github/skills` folders
- Define agent behavior with `SKILL.md` files
- GitHub Copilot loads skills when relevant to perform specialized tasks

**Agent Sessions Improvements**
- Keyboard navigation support
- Session grouping capabilities
- Multi-session archiving

**Chat Enhancements**
- Quick Pick displays previous sessions with archive/rename/delete options
- Chat no longer auto-restores previous sessions on restart
- Terminal tool auto-approval expanded to safe git commands, ripgrep, sed, npm scripts
- New `chat.tools.terminal.preventShellHistory` setting to exclude commands from shell history

**Accessibility**
- Streaming responses display dynamically in Accessible View
- MCP server output excluded from Accessible View to reduce noise
- New `${activeEditorLanguageId}` window title variable

**Links**:
- Repository: https://github.com/microsoft/vscode
- Release: https://github.com/microsoft/vscode/releases/tag/1.108.2
- Full Release Notes: https://code.visualstudio.com/updates/v1_108

---

## 8. Google Gemini CLI (google-gemini/gemini-cli)

**Source**: GitHub Releases
**Latest Version**: 0.25.2
**Release Date**: 2026-01-23

### Version 0.25.2 (2026-01-23)
- Patch release with cherry-picked fix (9866eb0)

### Version 0.25.1 (2026-01-22)
- Patch release with cherry-picked fix (87a0db2)

These are minor patch releases without significant feature changes.

**Links**:
- Repository: https://github.com/google-gemini/gemini-cli
- Release: https://github.com/google-gemini/gemini-cli/releases/tag/v0.25.2

---

## Summary

| Tool | Version | Release Date | Highlights |
|------|---------|--------------|------------|
| Claude Code | 2.1.19 | 2026-01-23 | Task system env var, keyboard shortcuts, session forking |
| Cursor | 2.4 | 2026-01-22 | Subagents, Skills, Image Generation, Agent Q&A |
| GitHub Copilot CLI | 0.0.394 | 2026-01-24 | Context deduplication, GHE Cloud support, plugin improvements |
| Kiro | CLI 1.24.0 | 2026-01-16 | Skills system, AST pattern tools, /compact command |
| OpenAI Codex | 0.89.0 | 2026-01-22 | /permissions command, /skill UI, app server enhancements |
| Cline | 3.53.1 | 2026-01-24 | Bug fix for responses API |
| VS Code | 1.108.2 | 2026-01-23 | Agent Skills, improved chat sessions, accessibility |
| Gemini CLI | 0.25.2 | 2026-01-23 | Patch release with bug fixes |
