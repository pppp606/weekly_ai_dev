# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a weekly AI development digest project that automatically collects information from various sources (GitHub releases, changelogs, AI news) and generates articles for Note publication.

## Commands

### Main Pipeline Commands
```bash
# Execute the full digest pipeline
# This will run all individual digest commands sequentially and generate the final article
```
Located at: `.claude/commands/weekly_digest_pipeline.md`

```bash
# Generate weekly article from collected data
# This will create the final article from existing data in resources/YYYY-MM-DD/
```
Located at: `.claude/commands/generate_weekly_article.md`

### Individual Digest Commands
```bash
# Release information digest
# Checks GitHub releases and changelogs for updates
```
Located at: `.claude/commands/vibecoding_release_digest.md`

```bash
# AI news digest
# Collects recent AI-related news and announcements
```
Located at: `.claude/commands/ai_news_digest.md`

```bash
# AI trending repositories digest
# Finds and analyzes trending AI-related repositories on GitHub
```
Located at: `.claude/commands/ai_trending_repositories_digest.md`

```bash
# AI events digest
# Searches for upcoming AI development events on Connpass
```
Located at: `.claude/commands/ai_events_digest.md`

```bash
# Hacker News & Reddit digest
# Collects trending AI development discussions from HN and Reddit
```
Located at: `.claude/commands/hacker_news_reddit_digest.md`

```bash
# Japanese tech blog digest
# Searches for AI development articles on Zenn, Qiita, and note
```
Located at: `.claude/commands/ai_tec_blog_digest.md`

## Project Structure

```
├── .claude/
│   └── commands/           # Digest command definitions
│       ├── weekly_digest_pipeline.md       # Main pipeline (sequential execution)
│       ├── generate_weekly_article.md      # Article generation from collected data
│       ├── vibecoding_release_digest.md
│       ├── ai_news_digest.md
│       ├── ai_trending_repositories_digest.md
│       ├── ai_events_digest.md
│       ├── hacker_news_reddit_digest.md
│       └── ai_tec_blog_digest.md
├── resources/
│   └── YYYY-MM-DD/        # Daily collected information
│       ├── release_information.md
│       ├── ai_news_summary.md
│       ├── trending_repositories.md
│       ├── events.md
│       ├── community_discussions.md
│       └── tech_blog_articles.md
└── articles/              # Final Note articles
    └── weekly-ai-digest-YYYYMMDD.md
```

## Workflow

1. **Information Collection**: Individual digest commands collect information from various sources
2. **Data Aggregation**: Information is saved to `resources/YYYY-MM-DD/` directory
3. **Article Generation**: Pipeline command creates final article in `articles/` directory
4. **Publication**: Articles are formatted for Note publication

### Failure Recovery Options

- **Complete Failure**: If pipeline fails completely, run individual digest commands manually
- **Partial Failure**: Use `generate_weekly_article.md` to create article from existing data

## Important Notes

- All digest commands expect today's date as an argument
- Generated articles are in Japanese and formatted for Note platform
- The pipeline automatically handles command execution and error handling
- Articles include relevant emojis and proper formatting for engagement

## Technical Constraints and Workarounds

### WebFetch Bot Blocking
Some websites (particularly Reddit, note.com, and potentially others) may block WebFetch requests due to bot detection. When this occurs:

1. **Identification**: If WebFetch returns errors like "403 Forbidden", "blocked", or similar bot-detection messages, or returns CSS/JavaScript code instead of content
2. **Fallback Solution**: Use the available MCP Playwright tool instead of WebFetch
3. **Implementation**: Replace WebFetch calls with appropriate Playwright navigation and scraping
4. **Affected Commands**: This primarily affects:
   - `hacker_news_reddit_digest.md` (Reddit access)
   - `ai_tec_blog_digest.md` (note.com blocking, potential blog platform blocking)
   - `ai_events_digest.md` (Connpass may have restrictions)

### Playwright Usage Guidelines
When WebFetch is blocked:
- Use Playwright for dynamic content loading and bot evasion
- Implement appropriate delays between requests to avoid rate limiting
- Extract only the necessary data to minimize resource usage
- Handle JavaScript-rendered content that WebFetch cannot access

### Specific Platform Rules
- **note.com**: ALWAYS use MCP Playwright instead of WebFetch, as note.com consistently blocks WebFetch requests and returns CSS/JavaScript code instead of article content
- **Reddit**: Use Playwright when WebFetch returns 403 or blocking errors
- **Zenn/Qiita**: WebFetch generally works, but fallback to Playwright if needed

**Example Scenario**: For note.com article collection, use Playwright to navigate search pages and extract article titles, authors, publication dates, and summaries. For Reddit, switch to Playwright when WebFetch blocks requests to extract trending discussions from r/LocalLLaMA, r/MachineLearning, etc.