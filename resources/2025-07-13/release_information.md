# Release Information (2025-07-13)

## google-gemini/gemini-cli v0.1.12
*Released: 2025-07-13*

### Highlights
- **MCP Server Improvements**: Enhanced SSE transport with headers support, reduced noisy server logs
- **Authentication Enhancements**: Added support for `GEMINI_DEFAULT_AUTH_TYPE` environment variable, improved headless auth flow, better auth type logging
- **UI/UX Improvements**: 
  - Added clipboard image paste support for macOS
  - Added visual cues for nightly version
  - New interactive prompt mode with `--prompt-interactive/-i` flag
  - Improved theme dialog with scrolling support
- **Tool Summarization**: Centralized shell tool summarization for better output handling
- **Bug Fixes**: 
  - Fixed relative path issues requiring absolute paths
  - Fixed whitespace rendering in markdown
  - Improved error messaging for quota limits
  - Fixed auth type logging errors

### Notable Changes
- Added `maxSessionTurns` configuration support via settings
- Flash fallback logging and clearcut logging improvements
- Docker release workflow fixes
- Multiple documentation improvements

## anthropics/claude-code v1.0.51
*Updated: 2025-07-11*

### Major Features
- **Windows Support**: Added native Windows support (requires Git for Windows)
- **Bedrock Integration**: Added support for AWS Bedrock API keys through `AWS_BEARER_TOKEN_BEDROCK` environment variable
- **Settings Doctor**: New `/doctor` command helps identify and fix invalid setting files

### Improvements
- `--append-system-prompt` now works in interactive mode, not just with `--print/-p`
- Increased auto-compact warning threshold from 60% to 80%
- Fixed handling of user directories with spaces for shell snapshots
- Enhanced OTEL resource reporting with OS details and WSL version
- Fixed custom slash commands in subdirectories
- Fixed plan mode issue with rejected sub-task plans

## microsoft/vscode 1.102.0 (June 2025)
*Released: 2025-07-10*

### AI and Copilot Features

#### Chat Enhancements
- **Open Source Milestone**: GitHub Copilot Chat extension is now open sourced
- **Custom Instructions**: Generate custom instructions that reflect your project's conventions
- **Custom Modes**: Tailor chat for specific tasks like planning or research
- **Terminal Integration**: Automatically approve selected terminal commands
- **Edit History**: Edit and resubmit previous chat requests (experimental)

#### MCP (Model Context Protocol) Support
- MCP support is now **Generally Available** in VS Code
- Easy MCP server installation and management with dedicated view and gallery
- MCP servers are now first-class resources in profiles and Settings Sync

#### Editor Experience
- **Coding Agent**: Delegate tasks to Copilot coding agent for background handling (preview)

## cline/cline v3.18.14
*Released: 2025-07-12*

### Changes
- Fixed re-sign in flow issue
- Version bump with changeset updates

### Summary
This release focuses on authentication flow improvements and stability fixes.