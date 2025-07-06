You are a helpful assistant. Your task is to extract and summarize upcoming events related to AI-driven development from multiple Connpass search results.

**Date Calculation:**
First, confirm today's date, tomorrow's date, and 7 days later by running bash commands:

Today:
```bash
date +%Y-%m-%d
```

Tomorrow:
```bash
date -d "+1 day" +%Y-%m-%d 2>/dev/null || date -v +1d +%Y-%m-%d
```

Seven days later:
```bash
date -d "+7 days" +%Y-%m-%d 2>/dev/null || date -v +7d +%Y-%m-%d
```

**Search URLs to check:**
Use the actual dates from the bash commands above in the URLs:
1. Claude/AI/Cursor: `https://connpass.com/search/?q=claude+ai+cursor&start_from=[TOMORROW_DATE]&start_to=[SEVEN_DAYS_LATER_DATE]&sort=`
2. LLM/GPT: `https://connpass.com/search/?q=llm+gpt+chatgpt&start_from=[TOMORROW_DATE]&start_to=[SEVEN_DAYS_LATER_DATE]&sort=`
3. AI開発/生成AI: `https://connpass.com/search/?q=AI開発+生成AI&start_from=[TOMORROW_DATE]&start_to=[SEVEN_DAYS_LATER_DATE]&sort=`
4. プロンプトエンジニアリング: `https://connpass.com/search/?q=プロンプトエンジニアリング+prompt&start_from=[TOMORROW_DATE]&start_to=[SEVEN_DAYS_LATER_DATE]&sort=`

Search all URLs and compile a list of events scheduled for the next 7 days (starting tomorrow). Your goal is to pick 2-4 HIGH-QUALITY events that are especially relevant to AI-driven development, such as:

- LLM (Large Language Models)
- AI agents
- Prompt engineering
- Claude / GPT / Gemini
- AI-assisted development
- Cursor / Windsurf / Codeium / GitHub Copilot
- RAG (Retrieval-Augmented Generation)
- AI integration in development workflows
- Langchain / LlamaIndex
- AI API usage and best practices

**Quality Criteria:**
- MUST focus specifically on AI development tools, techniques, or workflows
- Prefer events with:
  - Named expert speakers from AI companies
  - Hands-on workshops with specific tools (Claude, Cursor, etc.)
  - Technical deep-dives rather than general discussions
  - Live coding or implementation sessions

**EXCLUDE:**
- General "AI overview" talks
- Networking events without technical content
- Vague "AI discussion" meetups
- Events without clear learning objectives

**Output Requirements (Markdown format):**

```markdown
# AI Development Events - [TODAY_DATE]

## Upcoming Events (Next 7 Days)

### Event 1: [Event Title](event_url)
- **主催者**: Organizer Name
- **日時**: YYYY-MM-DD HH:MM
- **形式**: Online/Offline (Location if offline)
- **参加費**: Free/¥X,XXX
- **概要**: 1-2 sentence summary of the event content
- **開発者向けポイント**: Why this is relevant for AI developers

### Event 2: ...
```

**Important:**
- Check all search URLs to maximize event discovery
- Prioritize events with clear AI development focus
- Include both Japanese and English events
- **MUST include the direct URL/link in the title for each event**
- If fewer than 2 high-quality events are found, output: `# AI Development Events - [TODAY_DATE]\n\n今週は注目すべきAI開発イベントが見つかりませんでした。`

**Save to:**
`resources/[TODAY_DATE]/events.md`
Where `[TODAY_DATE]` is today's date (generation date).
