You are a helpful assistant. Your task is to check for new releases in a list of specified software repositories within the last 7days and generate a summary.

**Date Calculation:**
First, confirm today's date by running the bash command:
```bash
date +%Y-%m-%d
```

**Repositories and Rules:**

1.  **`google-gemini/gemini-cli`**
  *   **Source Type:** GitHub Releases
  *   **How to check:**
    1.  Use `gh release list --repo google-gemini/gemini-cli --limit 1` to get the latest release.
    2.  Extract the release tag (e.g., `v0.1.9`) and the publication date.
    3.  If the publication date is within the last 7days, proceed.
    4.  Use `gh release view <tag> --repo google-gemini/gemini-cli` to get the release notes.
    5.  Summarize the key changes or new features from the release notes.
    6.  **Detailed Investigation for Important Features**: When new features or major changes are present, add the following details:
       - Specific usage examples of new commands or arguments
       - Details of configuration changes and environment requirements
       - Practical impact and usage methods for developers
    7.  **Include Links:** Repository URL (https://github.com/google-gemini/gemini-cli) and Release URL (https://github.com/google-gemini/gemini-cli/releases/tag/<tag>)

2.  **`anthropics/claude-code`**
  *   **Source Type:** CHANGELOG.md
  *   **How to check:**
    1.  Use `gh api repos/anthropics/claude-code/commits?path=CHANGELOG.md -q '''.[0].commit.committer.date'''` to get the last modification date of `CHANGELOG.md`.
    2.  If the date is within the last 7days, proceed.
    3.  Use `gh api repos/anthropics/claude-code/contents/CHANGELOG.md --header "Accept: application/vnd.github.v3.raw"` to get the content of the file.
    4.  Identify the changes for the latest version entry.
    5.  Summarize the key changes or new features.
    6.  **Detailed Investigation for Important Features**: When new features (especially subagents, new tools, configuration options, etc.) are present, add the following details:
       - Specific command examples and file configuration examples
       - Usage methods and practical benefits of the feature
       - Impact on development workflows
       - Collect additional information from official documentation (using WebFetch)
    7.  **Include Links:** Repository URL (https://github.com/anthropics/claude-code) and CHANGELOG URL (https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

3.  **`cursor/cursor`**
  *   **Source Type:** Web Changelog
  *   **How to check:**
    1.  Manually visit `https://cursor.sh/changelog`.
    2.  Identify the latest release and its date.
    3.  If the release date is within the last 7days, summarize the key changes.
    4.  **Include Links:** Website URL (https://cursor.sh) and Changelog URL (https://cursor.sh/changelog)
  *   **Note:** Automated extraction from this source is not directly supported by current tools and requires manual review or advanced web scraping.

4.  **`windsurf` (Windsurf Editor)**
  *   **Source Type:** Web Changelog
  *   **How to check:**
    1.  Manually visit `https://www.codeium.com/changelog`.
    2.  Identify the latest release and its date.
    3.  If the release date is within the last 7days, summarize the key changes.
    4.  **Include Links:** Website URL (https://www.codeium.com) and Changelog URL (https://www.codeium.com/changelog)
  *   **Note:** Automated extraction from this source is not directly supported by current tools and requires manual review or advanced web scraping.

5.  **`microsoft/vscode`**
  *   **Source Type:** GitHub Releases
  *   **How to check:**
    1.  Use `gh release list --repo microsoft/vscode --limit 1` to get the latest release.
    2.  Extract the release tag and the publication date.
    3.  If the publication date is within the last 7days, proceed.
    4.  Use `gh release view <tag> --repo microsoft/vscode` to get the release notes.
    5.  **Important:** Only summarize changes related to AI features or GitHub Copilot integration. Ignore other changes.
    6.  **Include Links:** Repository URL (https://github.com/microsoft/vscode) and Release URL (https://github.com/microsoft/vscode/releases/tag/<tag>)

6.  **`cline/cline`**
  *   **Source Type:** GitHub Releases
  *   **How to check:**
    1.  Use `gh release list --repo cline/cline --limit 1` to get the latest release.
    2.  Extract the release tag (e.g., `v2.0.0`) and the publication date.
    3.  If the publication date is within the last 7days, proceed.
    4.  Use `gh release view <tag> --repo cline/cline` to get the release notes.
    5.  Summarize the key changes or new features from the release notes.
    6.  **Detailed Investigation for Important Features**: When new features or significant improvements are present, add the following details:
       - Specific examples of new UI features or workflow improvements
       - Details of API changes or integration features
       - Impact on developer experience
    7.  **Include Links:** Repository URL (https://github.com/cline/cline) and Release URL (https://github.com/cline/cline/releases/tag/<tag>)

**Execution Steps:**

1.  For each repository listed above, follow its specific "How to check" rules.
2.  **Date Calculation**: Calculate if the release/update date is within the last 7 days from today's date.
3.  If a new release is found for a repository (within 7 days), create a detailed summary for it.
4.  **Detailed Investigation for Important Features**: When new features or major changes are included, perform the following:
    - Investigate related pages in official documentation (using WebFetch or WebSearch)
    - Include specific command examples, configuration examples, and usage methods
    - Explain practical impact and benefits for developers
    - Add code samples or YAML configuration examples as needed
5.  **CRITICAL**: If no new releases are found for a repository (older than 7 days), **EXCLUDE** that repository from the output entirely - do NOT include "No new releases" entries
6.  Combine all summaries into a single Markdown formatted report containing only repositories with actual updates.
7.  Save the final report to `resources/[TODAY_DATE]/release_information.md`. Create the date directory if it doesn't exist.

**Important**: When checking dates, ensure you properly calculate the 7-day window from today's date. For example, if today is 2025-07-05, then dates from 2025-06-28 onwards are within the last 7 days.

7.  **`kiro`**
  *   **Source Type:** Web Changelog
  *   **How to check:**
    1.  Manually visit `https://kiro.dev/changelog/`.
    2.  Identify the latest release and its date.
    3.  If the release date is within the last 7days, summarize the key changes.
    4.  **Include Links:** Website URL (https://kiro.dev) and Changelog URL (https://kiro.dev/changelog/)
  *   **Note:** Automated extraction from this source is not directly supported by current tools and requires manual review or advanced web scraping.

**New Repositories and Rules (Manual Check Required for Web Changelogs):**
