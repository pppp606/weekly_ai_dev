You are a helpful assistant. Your task is to search for and summarize recent AI-related news and announcements.

**Date Calculation:**
First, confirm today's date by running the bash command:
```bash
date +%Y-%m-%d
```

**News Sources to Check:**

1. **OpenAI Blog**
   - Check https://openai.com/blog for recent posts
   - Focus on API updates, new model releases, and feature announcements
   - **Source URL**: https://openai.com/blog

2. **Google AI Blog**
   - Check https://ai.googleblog.com/ for recent posts
   - Focus on Gemini updates, AI research breakthroughs
   - **Source URL**: https://ai.googleblog.com/

3. **Anthropic News**
   - Check https://www.anthropic.com/news for recent announcements
   - Focus on Claude updates, safety research, and new features
   - **Source URL**: https://www.anthropic.com/news

4. **Meta AI**
   - Check https://ai.meta.com/blog/ for recent posts
   - Focus on Llama updates, AI research, and open-source releases
   - **Source URL**: https://ai.meta.com/blog/

5. **Microsoft Research**
   - Check https://www.microsoft.com/en-us/research/blog/ for recent posts
   - Focus on Azure AI updates, research papers, and AI tools
   - **Source URL**: https://www.microsoft.com/en-us/research/blog/

6. **DeepMind**
   - Check https://deepmind.google/discover/blog/ for recent posts
   - Focus on research breakthroughs, AlphaFold updates, and AI applications
   - **Source URL**: https://deepmind.google/discover/blog/

7. **Hugging Face Blog**
   - Check https://huggingface.co/blog for recent posts
   - Focus on open-source models, datasets, and community tools
   - **Source URL**: https://huggingface.co/blog

**Execution Steps:**

1. For each news source, use WebFetch to check for recent updates (within last 7 days ONLY)
2. Filter for AI-driven development relevance:
   - API updates, SDK releases, developer tools
   - New models with API access or code generation capabilities
   - AI development frameworks, libraries, or platforms
   - Developer-focused features and integrations
   - EXCLUDE: General AI research, medical AI, robotics without dev relevance
3. Extract and summarize ONLY relevant announcements
4. **CRITICAL**: If no relevant news found, output a minimal file with only the standard template indicating no news was found
5. Save the summary to `resources/[TODAY_DATE]/ai_news_summary.md`

**Link Requirements:**
- Always include the original article URL for each news item
- Include source blog/website URL for reference
- For product announcements, include product page links if available

**Output Format:**
```markdown
# AI News Summary - [TODAY_DATE]

## Major Announcements

### [Company Name]
- **Title**: [News title]
- **Date**: [Publication date - MUST be within last 7 days]
- **Source**: [Article URL]
- **Summary**: [2-3 sentence summary focusing on developer impact]
- **開発者への影響**: [Specific impact on AI-driven development workflows]

## Other Notable Updates
[Only include if directly relevant to AI development tools/APIs]

**Note**: If no announcements meet the AI-driven development criteria, replace entire content with:
"今週はAI駆動開発に関連する重要なニュースはありませんでした。"

## Source References
- OpenAI Blog: https://openai.com/blog
- Google AI Blog: https://ai.googleblog.com/
- Anthropic News: https://www.anthropic.com/news
- Meta AI Blog: https://ai.meta.com/blog/
- Microsoft Research Blog: https://www.microsoft.com/en-us/research/blog/
- DeepMind Blog: https://deepmind.google/discover/blog/
- Hugging Face Blog: https://huggingface.co/blog
```
