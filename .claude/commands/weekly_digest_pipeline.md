You are a helpful assistant. Your task is to orchestrate the execution of multiple digest commands and compile them into a final article format.

**IMPORTANT: Autonomous Execution**
- This pipeline MUST run autonomously from start to finish without stopping for user confirmation
- Execute all steps sequentially and automatically proceed to the next step after each completion
- Do NOT ask for user input between steps - continue automatically
- If any step fails, log the error and continue with the next step
- Only stop if there is a critical error that prevents further execution

**Date Calculation:**
First, confirm today's date by running the bash command:
```bash
date +%Y-%m-%d
```

# Pipeline Steps

1. Execute Individual Digest Commands Sequentially (Use Task Tool)
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
     3. ai_trending_papers_digest.md
     4. ai_news_digest.md
     5. ai_events_digest.md
     6. hacker_news_reddit_digest.md
     7. ai_tec_blog_digest.md

2. Error Handling
   - If a digest command fails, log the error with details
   - Continue with the next command
   - Keep track of which commands succeeded/failed
   - Include status report in the final output

3. Generate Final Article Using Dedicated Command
   - After all digest commands complete, **automatically execute** the `generate_weekly_article.md` command
   - This command will:
     - Collect all generated reports from `resources/[TODAY_DATE]/` directory
     - Process available data and handle missing sources gracefully
     - Generate a Note-compatible article with proper formatting
     - Save the article to the appropriate location
   - The article generation is handled separately for better error recovery and modularity
   - **Immediately proceed to step 4 after completion**

4. Article Guardrail Review
   - **Automatically execute** the `article_guardrail_review.md` command on the generated article
   - This command will:
     - Review the article for confidential information, inappropriate content, security concerns
     - Check for political/religious bias and compliance with content policies
     - Identify any problematic content that needs to be removed
   - If issues are found:
     - Remove or modify problematic content from the article
     - Regenerate the article if necessary
     - Re-run the guardrail review until the article passes all checks
   - **Immediately proceed to step 5 after approval**

5. Commit Generated Content
   - **Automatically execute** the `commit_weekly_digest.md` command after guardrail approval
   - This command will:
     - Add all generated files in `resources/[TODAY_DATE]/` and `articles/` directories
     - Create a commit with meaningful message including the date
     - Push to main branch using git commands
   - The commit process is handled separately for better modularity and error recovery
   - **This is the final step - report completion status to the user after this step**

**Execution Notes:**
- **DO NOT STOP between steps - run the entire pipeline from start to finish automatically**
- Process commands sequentially to ensure stability
- Provide clear progress updates between each command (but do not wait for user response)
- The final article should be in Japanese with appropriate formatting for Note
- Include relevant emojis to make the article more engaging
- After completing all 5 steps, provide a comprehensive completion report to the user
