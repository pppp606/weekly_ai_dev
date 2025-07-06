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
     - `overseas_community_trends.md`
     - `tech_blog_articles.md`
   - Check which files exist and read their contents

2. **Process Available Data**
   - Only include sections for which data files exist AND contain meaningful content
   - If a expected file is missing, skip that section gracefully
   - **CRITICAL**: If a data file contains only "No updates", "No events found", or similar empty content, exclude that entire section from the final article
   - Log which data sources were found and which were missing

3. **Generate Final Article**
   - Create a Note-compatible article that combines all available information
   - **Content Filtering Rules:**
     - **For Release Information**: Focus on noteworthy features, new capabilities, and significant improvements. Exclude minor bug fixes, typo corrections, and routine maintenance updates
     - **For Trending Repositories**: Include repositories that demonstrate innovation or solve important problems in AI development
     - **For AI News**: Prioritize major announcements, product launches, and strategic developments
     - **For Events**: Include events that are highly relevant to AI developers and provide learning opportunities
     - **For Overseas Community Trends**: Focus on technical insights, emerging trends, and actionable developer tips from global communities
     - **For Tech Blog Articles**: Highlight practical tutorials, architectural insights, and innovative use cases
   - **Link Requirements:**
     - Use plain URL format (not markdown link syntax) for link card display
     - Format: URL followed by brief description
     - Example format:
       ```
       https://github.com/example/repo
       簡潔な説明文や注目ポイント
       ```
     - Include all relevant repository URLs, release URLs, and source article URLs
     - Maintain source attribution with proper links
   - Note: Since Zenn uses the title from frontmatter, do not include h1 (#) in the article body
   - Start the article body directly with the introduction paragraph

4. **Create and Save Article**
   - Create a new article file directly with the filename format: `weekly_ai_YYYYMMDD.md`
   - Save the file to the `articles/` directory
   - Use the following format for the article:
    ```markdown
    ---
    title: "週刊AI駆動開発 - [TODAY_FORMATTED]"
    emoji: "🤖"
    type: "tech"
    topics: ["ai駆動開発", "vibecoding", "ai", "claudecode", "Gemini CLI", "cursor"]
    published: true
    ---

    [Introduction paragraph about this week's updates based on available data]

    ## 🚀 リリース情報
    [Content from release_information.md - filtered for significant features and improvements only]

    ## 📈 注目のAI開発リポジトリ
    [Content from trending_repositories.md - use plain URL format for link cards:
    https://github.com/user/repo
    リポジトリの説明や注目ポイント]

    ## 📰 AI関連ニュース
    [Content from ai_news_summary.md if available - use plain URL format:
    https://example.com/news-article
    ニュースの概要・開発者への影響]

    ## 📚 テックブログ
    [Content from tech_blog_articles.md if available - use plain URL format:
    https://example.com/article
    記事の概要・ポイント]

    ## 🌐 海外コミュニティ動向
    [Content from overseas_community_trends.md if available]

    ## 🎯 今週のAI開発イベント
    [Content from events.md if available - use plain URL format:
    https://connpass.com/event/12345/
    イベントの概要・開発者向けポイント]

    ## 📝 まとめ
    [Summary of the week's highlights based on available data]

    ## 週刊AI駆動開発について
    この記事は以下リポジトリの内容で生成されています。
    追加したい情報、修正、改善案などあればIssueを立てるか変更のPRをお願いします！

    https://github.com/pppp606/weekly_ai_dev
    ```

5. **Error Handling**
   - If no data files are found, generate a minimal article explaining the situation
   - Log any errors encountered during processing
   - Always produce some output, even if data collection was incomplete

**Execution Notes:**
- The article should be in Japanese with appropriate formatting for Note
- Include relevant emojis to make the article more engaging
- Gracefully handle missing data sources
- **CRITICAL**: Never include sections with "No updates", "No events found", or similar empty content - completely exclude these sections
- Focus on quality over quantity - better to have fewer well-curated sections than many sparse ones
