# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a weekly AI development digest project that automatically collects information from various sources (GitHub releases, changelogs, AI news) and generates articles for Note publication.

## Commands and Skills

### Main Pipeline Command
```bash
# Execute the full digest pipeline
# This runs 7 digest skills in PARALLEL using Task agents, then generates the final article
```
Located at: `.claude/commands/weekly_digest_pipeline.md`

### Individual Digest Skills (v1.1.0)

Skills are executed as isolated Task agents with their own context, enabling parallel execution and preventing context overflow.

| Skill | Description | Location |
|-------|-------------|----------|
| Release Digest | Checks GitHub releases and changelogs | `.claude/skills/vibecoding_release_digest.md` |
| AI News | Collects recent AI-related news | `.claude/skills/ai_news_digest.md` |
| Trending Repos | Analyzes trending AI repositories on GitHub | `.claude/skills/ai_trending_repositories_digest.md` |
| Trending Papers | Collects trending AI papers from Hugging Face | `.claude/skills/ai_trending_papers_digest.md` |
| AI Events | Searches upcoming AI events on Connpass | `.claude/skills/ai_events_digest.md` |
| HN & Reddit | Collects trending discussions from HN/Reddit | `.claude/skills/hacker_news_reddit_digest.md` |
| Tech Blogs | Searches AI articles on Zenn, Qiita, note | `.claude/skills/ai_tec_blog_digest.md` |
| Article Generation | Creates final article from collected data | `.claude/skills/generate_weekly_article.md` |
| Guardrail Review | Validates article quality with textlint | `.claude/skills/article_guardrail_review.md` |

## Project Structure

```
├── .claude/
│   ├── commands/                    # Pipeline entry points
│   │   └── weekly_digest_pipeline.md    # Main pipeline (parallel Task agents)
│   └── skills/                      # Individual digest skills (v1.1.0)
│       ├── vibecoding_release_digest.md
│       ├── ai_news_digest.md
│       ├── ai_trending_repositories_digest.md
│       ├── ai_trending_papers_digest.md
│       ├── ai_events_digest.md
│       ├── hacker_news_reddit_digest.md
│       ├── ai_tec_blog_digest.md
│       ├── generate_weekly_article.md
│       └── article_guardrail_review.md
├── resources/
│   └── YYYY-MM-DD/        # Daily collected information
│       ├── release_information.md
│       ├── ai_news_summary.md
│       ├── trending_repositories.md
│       ├── trending_papers.md
│       ├── events.md
│       ├── community_discussions.md
│       └── tech_blog_articles.md
└── articles/              # Final Note articles
    └── weekly_ai_YYYYMMDD.md
```

## Workflow

1. **Parallel Information Collection**: 7 digest skills run simultaneously as isolated Task agents
2. **Result Collection**: Pipeline waits for all tasks to complete and collects results
3. **Data Aggregation**: Information is saved to `resources/YYYY-MM-DD/` directory
4. **Article Generation**: Creates final article in `articles/` directory
5. **Quality Assurance**: Generated articles are automatically checked with textlint for Japanese AI writing guidelines
6. **Publication**: Articles are formatted for Note publication with improved quality and consistency

### Architecture Benefits (v1.1.0)

- **Parallel Execution**: All 7 digest tasks run concurrently, reducing total execution time
- **Context Isolation**: Each skill runs in its own Task agent context, preventing context overflow
- **Improved Reliability**: Failed tasks don't affect other tasks; partial results can still be used

### Failure Recovery Options

- **Complete Failure**: If pipeline fails completely, run individual skills manually via `/skill_name`
- **Partial Failure**: Use `generate_weekly_article` skill to create article from existing data

## Quality Assurance with textlint

This project uses textlint to ensure high-quality Japanese AI writing. The system automatically checks generated articles for:

- **AI Writing Guidelines**: Prevents overuse of AI-generated expressions and hype language
- **Technical Writing Standards**: Ensures clear, professional communication
- **Formatting Consistency**: Maintains consistent bullet points and emphasis patterns
- **Content Quality**: Reduces redundant expressions and improves readability

### textlint Configuration

The project uses `@textlint-ja/preset-ai-writing` with customized rules:
- Detection of AI-generated hype expressions
- Prevention of excessive emphasis patterns
- Control of colon continuation usage
- Technical writing guideline enforcement

Generated articles are automatically validated during the pipeline execution, ensuring publication-ready quality.

## Important Notes

- All digest skills expect today's date as an argument (e.g., `/vibecoding_release_digest 2025-12-28`)
- Skills run as isolated Task agents with `run_in_background=true` for parallel execution
- Generated articles are in Japanese and formatted for Note platform
- The pipeline automatically handles task execution, result collection, and error handling
- Articles include relevant emojis and proper formatting for engagement
- Tech blog collection excludes "週刊AI駆動開発" articles to prevent self-reference

## Technical Constraints and Workarounds

### WebFetch Bot Blocking
Some websites (particularly Reddit, note.com, and potentially others) may block WebFetch requests due to bot detection. When this occurs:

1. **Identification**: If WebFetch returns errors like "403 Forbidden", "blocked", or similar bot-detection messages, or returns CSS/JavaScript code instead of content
2. **Fallback Solution**: Use the available MCP Playwright tool instead of WebFetch
3. **Implementation**: Replace WebFetch calls with appropriate Playwright navigation and scraping
4. **Affected Skills**: This primarily affects:
   - `hacker_news_reddit_digest` (Reddit access)
   - `ai_tec_blog_digest` (note.com blocking, potential blog platform blocking)
   - `ai_events_digest` (Connpass may have restrictions)

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