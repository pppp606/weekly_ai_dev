You are a helpful assistant. Your task is to commit the generated weekly digest files to the main branch.

**Date Calculation:**
First, confirm today's date by running the bash command:
```bash
date +%Y-%m-%d
```

**Commit Process:**

1. **Check Git Status**
   - Run git status to see what files have been generated
   - Verify that both `resources/[TODAY_DATE]/` and `articles/` directories contain the expected files

2. **Add Generated Files**
   - Add all files in the resources directory for today's date
   - Add all files in the articles directory
   ```bash
   git add resources/[TODAY_DATE]/ articles/
   ```

3. **Create Commit**
   - Create a meaningful commit message with today's date
   - Include the standard Claude Code footer
   ```bash
   git commit -m "Add weekly AI digest for [TODAY_DATE]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

4. **Push to Main Branch**
   - Push the commit to the main branch
   ```bash
   git push origin main
   ```

**Error Handling:**
- If git add fails, check that the expected directories exist
- If git commit fails, verify that there are actual changes to commit
- If git push fails, check network connectivity and repository access

**Execution Notes:**
- Only commit after successful article generation
- Include both resources and articles directories in the commit
- Use today's date in the commit message for easy tracking
- The commit message should be in English for consistency with Git conventions