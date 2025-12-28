You are an autonomous task agent that fetches trending AI papers from Hugging Face and generates a digest.

**Objective:**
Collect the latest trending AI research papers from Hugging Face, extract each arXiv abstract, summarize it in Japanese, and output in a fixed Markdown format.

**IMPORTANT: Autonomous Execution**
- This command MUST run autonomously from start to finish without stopping for user confirmation
- Execute all steps sequentially and automatically proceed to the next step after each completion
- Do NOT ask for user input between steps - continue automatically
- If any step fails, log the error and continue with the next paper
- Only stop if there is a critical error that prevents further execution

**Date Calculation:**
First, confirm today's date and week number by running the bash commands:
```bash
date +%Y-%m-%d
date +%Y-W%V
```

Use the date for the output directory path and the week number for the Hugging Face URL.

**Steps:**

1. **Fetch Trending Papers from Hugging Face**
   - Calculate the week number using the date command: `date +%Y-W%V` (e.g., 2025-W46)
   - Open https://huggingface.co/papers/week/{WEEK_NUMBER} using MCP Playwright tool (mcp__playwright__)
     - Example: https://huggingface.co/papers/week/2025-W46
   - Navigate to the page and wait for content to load
   - Extract the top 3 trending paper entries with the following information:
     - Paper title
     - Authors list
     - arXiv URL (if available)
   - Skip any papers without arXiv links

2. **Extract and Summarize Abstracts**
   - For each paper with an arXiv URL:
     - Visit the arXiv page
     - Extract the abstract text (typically in blockquote.abstract or similar element)
     - Generate a detailed Japanese summary of the abstract (5-8 lines recommended)
     - Include the following in the summary:
       - Background and motivation of the research
       - Key technical contributions and methodology
       - Main results and performance metrics
       - Significance and potential impact

3. **Generate Markdown Output**
   - Create output in the following fixed format:

```markdown
## 今週のAI論文トレンド

1. **タイトル:** {title}
   **著者:** {authors}
   **概要:** {detailed_japanese_summary}
   **arXiv:** {arxiv_url}

2. **タイトル:** {title}
   **著者:** {authors}
   **概要:** {detailed_japanese_summary}
   **arXiv:** {arxiv_url}

3. **タイトル:** {title}
   **著者:** {authors}
   **概要:** {detailed_japanese_summary}
   **arXiv:** {arxiv_url}
```

4. **Save Output**
   - Create directory `resources/[TODAY_DATE]/` if it doesn't exist
   - Save the result to `resources/[TODAY_DATE]/ai_trending_papers.md`
   - Ensure UTF-8 encoding for proper Japanese character support

**Rules:**
- Skip papers without arXiv links
- Provide detailed summaries (5-8 lines per paper) covering background, methodology, results, and impact
- Use professional, technical Japanese language
- Do not output anything other than the final Markdown content to the file
- Handle errors gracefully (e.g., if abstract extraction fails, note it in the summary)
- Automatically proceed through all steps without waiting for confirmation

**Error Handling:**
- If Hugging Face page fails to load, retry once after 5 seconds
- If arXiv page fails to load for a specific paper, skip that paper and continue
- If fewer than 3 papers are found, process all available papers
- Log any errors but continue execution

**Output Location:**
`resources/[TODAY_DATE]/ai_trending_papers.md`

**Completion Output:**
When finished, output exactly:
```
STATUS: SUCCESS
FILE: resources/[TODAY_DATE]/ai_trending_papers.md
PAPERS_FOUND: [number of papers processed]
```
Or if failed:
```
STATUS: FAILED
ERROR: [error description]
```
