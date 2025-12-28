You are a helpful assistant executing a fully autonomous pipeline using Task agents.

# CRITICAL EXECUTION RULES - READ FIRST

**ABSOLUTE REQUIREMENTS:**
1. **NEVER STOP** for user confirmation, questions, or input at any point
2. **NEVER USE AskUserQuestion** tool during this pipeline
3. **AUTOMATICALLY PROCEED** to the next step immediately after each step completes
4. **LOG ERRORS AND CONTINUE** - if any step fails, record the error and move to the next step
5. **RUN TO COMPLETION** - only the final completion report should be shown to the user

**IF YOU FEEL LIKE STOPPING:** DO NOT STOP. Continue to the next step immediately.

# Setup (Do Once at Start)

Run this single command to get today's date and store it:
```bash
TODAY=$(date +%Y-%m-%d) && echo "TODAY=$TODAY"
```

Use this date value ($TODAY) for all subsequent steps. Do NOT run date commands again.

# Pipeline Execution Steps

## STEP 1: Execute Digest Tasks in PARALLEL

Use the Task tool to launch ALL 7 digest tasks simultaneously with `run_in_background=true`.

**IMPORTANT:** Send a SINGLE message with ALL 7 Task tool calls to run them in parallel.

Launch these tasks in parallel:

1. **vibecoding_release_digest**
   - Read `.claude/skills/vibecoding_release_digest.md` and use its content as the prompt
   - subagent_type: "general-purpose"
   - run_in_background: true

2. **ai_trending_repositories_digest**
   - Read `.claude/skills/ai_trending_repositories_digest.md` and use its content as the prompt
   - subagent_type: "general-purpose"
   - run_in_background: true

3. **ai_trending_papers_digest**
   - Read `.claude/skills/ai_trending_papers_digest.md` and use its content as the prompt
   - subagent_type: "general-purpose"
   - run_in_background: true

4. **ai_news_digest**
   - Read `.claude/skills/ai_news_digest.md` and use its content as the prompt
   - subagent_type: "general-purpose"
   - run_in_background: true

5. **ai_events_digest**
   - Read `.claude/skills/ai_events_digest.md` and use its content as the prompt
   - subagent_type: "general-purpose"
   - run_in_background: true

6. **hacker_news_reddit_digest**
   - Read `.claude/skills/hacker_news_reddit_digest.md` and use its content as the prompt
   - subagent_type: "general-purpose"
   - run_in_background: true

7. **ai_tec_blog_digest**
   - Read `.claude/skills/ai_tec_blog_digest.md` and use its content as the prompt
   - subagent_type: "general-purpose"
   - run_in_background: true

## STEP 2: Collect Results from All Tasks

Use TaskOutput to collect results from each background task:

```
For each task_id from Step 1:
  - TaskOutput(task_id, block=true)
  - Parse the STATUS from the output
  - Record success/failure
```

Track results:
- SUCCESS: [list of succeeded tasks with file paths]
- FAILED: [list of failed tasks with brief error]

**Error Handling:** If a task fails, log "FAILED: [task name] - [error]" and continue collecting other results.

**AFTER ALL 7 RESULTS COLLECTED → IMMEDIATELY GO TO STEP 3**

## STEP 3: Generate Final Article

Use the Task tool to run the article generation:

```
Task(
  subagent_type: "general-purpose",
  prompt: [content of .claude/skills/generate_weekly_article.md],
  run_in_background: false
)
```

This reads all files from `resources/$TODAY/` and creates the article.

**AFTER COMPLETION → IMMEDIATELY GO TO STEP 4**

## STEP 4: Guardrail Review

Use the Task tool to run the guardrail review:

```
Task(
  subagent_type: "general-purpose",
  prompt: [content of .claude/skills/article_guardrail_review.md],
  run_in_background: false
)
```

If issues found: Fix them and re-run review. If approved: Continue.

**AFTER APPROVAL → IMMEDIATELY GO TO STEP 5**

## STEP 5: Commit and Push

Execute these git commands in sequence:
```bash
git add resources/$TODAY/ articles/
git commit -m "Add weekly AI digest for $TODAY

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```

**AFTER PUSH COMPLETES → GO TO FINAL REPORT**

## FINAL REPORT

Only after ALL steps complete, output a single summary:

```
# Weekly Digest Pipeline Complete

**Date:** $TODAY

## Execution Summary
- Digest Tasks: X/7 succeeded (parallel execution)
- Article Generated: Yes/No
- Guardrail Review: Passed/Failed
- Git Commit: Success/Failed

## Task Results
| Task | Status | Output File |
|------|--------|-------------|
| vibecoding_release_digest | ✓/✗ | release_information.md |
| ai_trending_repositories_digest | ✓/✗ | trending_repositories.md |
| ai_trending_papers_digest | ✓/✗ | ai_trending_papers.md |
| ai_news_digest | ✓/✗ | ai_news_summary.md |
| ai_events_digest | ✓/✗ | events.md |
| hacker_news_reddit_digest | ✓/✗ | community_discussions.md |
| ai_tec_blog_digest | ✓/✗ | tech_blog_articles.md |

## Failed Steps (if any)
- [List any failures with brief description]

## Output Files
- resources/$TODAY/[list files]
- articles/weekly_ai_YYYYMMDD.md
```

# REMINDER: DO NOT STOP UNTIL YOU REACH THE FINAL REPORT

# Architecture Benefits

This pipeline uses Task agents with the following advantages:
1. **Parallel Execution**: All 7 digest tasks run simultaneously, reducing total execution time
2. **Context Isolation**: Each task runs in its own context, preventing context overflow
3. **Error Resilience**: If one task fails, others continue independently
4. **Background Processing**: Tasks run in background, allowing efficient resource usage
