You are a helpful assistant. Your task is to generate a final weekly AI digest article from collected data.

**Date Calculation:**
First, confirm today's date by running bash commands:

Today's date (YYYY-MM-DD format):
```bash
date +%Y-%m-%d
```

Today's date (Japanese format):
```bash
date +%Y年%m月%d日
```

Today's date (compact format):
```bash
date +%Y%m%d
```

**Article Generation Steps:**

1. **Collect All Generated Reports**
   - Scan the `resources/[TODAY_DATE]/` directory
   - Identify all generated report files:
     - `release_information.md`
     - `trending_repositories.md`
     - `ai_news_summary.md`
     - `events.md`
     - `community_discussions.md`
     - `tech_blog_articles.md`
   - Check which files exist and read their contents

2. **Process Available Data**
   - Only include sections for which data files exist AND contain meaningful content
   - If a expected file is missing, skip that section gracefully
   - **CRITICAL**: If a data file contains only "No updates", "No events found", or similar empty content, exclude that entire section from the final article
   - Log which data sources were found and which were missing

3. **Generate Final Article**
   - Create a Zenn-compatible article that combines all available information
   - **Content Filtering Rules:**
     - **For Release Information**: Focus on noteworthy features, new capabilities, and significant improvements. Exclude minor bug fixes, typo corrections, and routine maintenance updates
     - **For Trending Repositories**: Include repositories that demonstrate innovation or solve important problems in AI development
     - **For AI News**: Prioritize major announcements, product launches, and strategic developments
     - **For Events**: Include events that are highly relevant to AI developers and provide learning opportunities
     - **For Overseas Community Trends**: Focus on technical insights, emerging trends, and actionable developer tips from global communities
     - **For Tech Blog Articles**: Highlight practical tutorials, architectural insights, and innovative use cases
   - **Link Requirements:**
     - **CRITICAL**: Always use the EXACT URLs from the source files (release_information.md, ai_news_summary.md, community_discussions.md, tech_blog_articles.md, events.md, trending_repositories.md)
     - **NEVER generate, modify, or create placeholder URLs** - only use URLs that actually exist in the resource files
     - Format: Use the exact format and URLs as they appear in the source files
     - **MANDATORY**: Include ALL relevant URLs exactly as they are written in the source files
     - If a URL doesn't exist in the source file, do not include a link
     - Maintain source attribution with proper links exactly as provided
   - Zenn: Since Zenn uses the title from frontmatter, do not include h1 (#) in the article body
   - Start the article body directly with the introduction paragraph

4. **Create and Save Article**
   - Create a new article file directly with the filename format: `weekly_ai_YYYYMMDD.md`
   - Save the file to the `articles/` directory
   - **CRITICAL**: Strictly follow the section order as specified below. The sections must appear in exactly this order:
     1. リリース情報
     2. 注目のAI開発リポジトリ
     3. AI関連ニュース
     4. テックブログ
     5. 海外コミュニティ動向
     6. 今週のAI開発イベント
     7. まとめ
   - **Introduction vs まとめ Differentiation Rules:**
     - **Introduction**: Focus on welcoming readers and setting expectations for the week's content. Mention the main themes or categories that will be covered (e.g., "今週は新しいAIツールのリリースと、開発者向けのイベント情報をお届けします"). Keep it forward-looking and inviting.
     - **まとめ**: Write a very concise summary (280 characters or less in Japanese) focusing on the single most important trend or development from this week. Avoid lengthy explanations and keep it brief and impactful.
   - Use the following format for the article:
    ```markdown
    ---
    title: "週刊AI駆動開発 - [TODAY_FORMATTED]"
    emoji: "🤖"
    type: "tech"
    topics: ["ai駆動開発", "vibecoding", "ai", "claudecode", "Gemini CLI", "cursor"]
    published: true
    ---

    [Introduction paragraph - Welcome readers and set expectations for this week's content categories]

    ## 🚀 リリース情報
    [Content from release_information.md - filtered for significant features and improvements only]

    ## 📈 注目のAI開発リポジトリ
    [Content from trending_repositories.md - use plain URL format for link cards:
    https://github.com/user/repo
    リポジトリの説明や注目ポイント]

    ## 📰 AI関連ニュース
    [Content from ai_news_summary.md if available - MANDATORY: copy URLs exactly as they appear in the source file]

    ## 💻 テックブログ
    [Content from tech_blog_articles.md if available - MANDATORY: copy URLs exactly as they appear in the source file]

    ## 🌐 海外コミュニティ動向
    [Content from community_discussions.md if available - MANDATORY: copy URLs exactly as they appear in the source file]

    ## 📅 今週のAI開発イベント
    [Content from events.md if available - MANDATORY: copy URLs exactly as they appear in the source file]

    ## 📝 まとめ
    [Write a concise summary in 280 characters or less (Japanese). Focus on the single most important trend or development from this week. Keep it brief and impactful.]

    ## 週刊AI駆動開発について
    この記事は以下リポジトリの内容で生成されています。
    追加したい情報、修正、改善案などあればIssueを立てるか変更のPRをお願いします！

    https://github.com/pppp606/weekly_ai_dev
    ```

5. **Run textlint Quality Check**
   - After generating the article, run textlint to check and fix the article:
     ```bash
     npx textlint --fix articles/weekly_ai_YYYYMMDD.md
     ```
   - Generate a detailed textlint report and save it to the resources directory:
     ```bash
     npx textlint articles/weekly_ai_YYYYMMDD.md --format json > resources/[TODAY_DATE]/textlint-report.json
     ```
   - **IMPORTANT**: This step is non-blocking - continue even if textlint finds issues
   - The `--fix` option will automatically correct fixable issues
   - The JSON report provides detailed information about any remaining issues

6. **Error Handling**
   - If no data files are found, generate a minimal article explaining the situation
   - Log any errors encountered during processing
   - Always produce some output, even if data collection was incomplete
   - If textlint fails to run, log the error but continue with the pipeline

**Execution Notes:**
- The article should be in Japanese with appropriate formatting for Zenn
- Include relevant emojis to make the article more engaging
- Gracefully handle missing data sources
- **CRITICAL**: Never include sections with "No updates", "No events found", or similar empty content - completely exclude these sections
- Focus on quality over quantity - better to have fewer well-curated sections than many sparse ones
- textlint will automatically fix common issues like inconsistent punctuation and spacing

**Completion Output:**
When finished, output exactly:
```
STATUS: SUCCESS
FILE: articles/weekly_ai_YYYYMMDD.md
SECTIONS_INCLUDED: [list of sections that had content]
SECTIONS_SKIPPED: [list of sections that were empty or missing]
```
Or if failed:
```
STATUS: FAILED
ERROR: [error description]
```
