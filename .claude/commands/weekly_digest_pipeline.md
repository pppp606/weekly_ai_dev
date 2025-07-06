You are a helpful assistant. Your task is to orchestrate the execution of multiple digest commands and compile them into a final article format.

**Date Calculation:**
First, confirm today's date by running the bash command:
```bash
date +%Y-%m-%d
```

**Pipeline Steps:**

1. **Execute Individual Digest Commands Sequentially**
   - Look for all `.md` files in `.claude/commands/` directory that match the pattern `*_digest.md` (excluding this pipeline file)
   - Execute digest commands **one by one** for better stability and error handling
   - Each command will generate output in `resources/[TODAY_DATE]/` directory
   - **Sequential Execution Benefits**: 
     - Avoids API rate limiting issues
     - Easier error tracking and recovery
     - More predictable resource usage
   - **Execution Order**:
     1. vibecoding_release_digest.md
     2. ai_trending_repositories_digest.md
     3. ai_news_digest.md
     4. ai_events_digest.md
     5. hacker_news_reddit_digest.md
     6. ai_tec_blog_digest.md

2. **Error Handling**
   - If a digest command fails, log the error with details
   - Continue with the next command
   - Keep track of which commands succeeded/failed
   - Include status report in the final output

3. **Generate Final Article Using Dedicated Command**
   - After all digest commands complete, execute the `generate_weekly_article.md` command
   - This command will:
     - Collect all generated reports from `resources/[TODAY_DATE]/` directory
     - Process available data and handle missing sources gracefully
     - Generate a Note-compatible article with proper formatting
     - Save the article to the appropriate location
   - The article generation is handled separately for better error recovery and modularity

4. **Commit Generated Content**
   - After successful article generation, execute the `commit_weekly_digest.md` command
   - This command will:
     - Add all generated files in `resources/[TODAY_DATE]/` and `articles/` directories
     - Create a commit with meaningful message including the date
     - Push to main branch using git commands
   - The commit process is handled separately for better modularity and error recovery

**Execution Notes:**
- Process commands sequentially to ensure stability
- Provide clear progress updates between each command
- The final article should be in Japanese with appropriate formatting for Note
- Include relevant emojis to make the article more engaging