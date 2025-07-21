# Article Guardrail Review

Review the generated weekly AI digest article for compliance with content policies and safety guidelines.

## Setup
```bash
date +%Y-%m-%d
```

## Target File
Review the article at: `articles/weekly-ai-digest-{YYYYMMDD}.md` where YYYYMMDD is today's date in the format returned by the date command above.

## Review Checklist

Please carefully review the article at the specified path and check for the following:

### 1. Confidential Information
- [ ] No API keys, tokens, or credentials
- [ ] No private email addresses or personal contact information
- [ ] No internal company information or trade secrets
- [ ] No unpublished research data or proprietary algorithms
- [ ] No non-public pricing information

### 2. Security Concerns
- [ ] No exploit code or vulnerability details that could be misused
- [ ] No instructions for bypassing security measures
- [ ] No malicious code examples
- [ ] No links to compromised or suspicious websites
- [ ] No promotion of tools primarily used for malicious purposes

### 3. Inappropriate Content
- [ ] No sexual or adult content
- [ ] No violent or graphic descriptions
- [ ] No hate speech or discriminatory language
- [ ] No harassment or personal attacks
- [ ] No content that sexualizes minors

### 4. Political and Religious Neutrality
- [ ] No political bias or partisan content
- [ ] No religious proselytizing or criticism
- [ ] No content promoting extremist ideologies
- [ ] No content that could incite division or conflict
- [ ] Maintains neutral tone on controversial topics

### 5. Legal and Ethical Compliance
- [ ] No copyright infringement (proper attribution for all sources)
- [ ] No plagiarized content
- [ ] No false or misleading information
- [ ] No promotion of illegal activities
- [ ] No medical or financial advice presented as fact

### 6. Professional Standards
- [ ] No profanity or offensive language
- [ ] No unverified claims or conspiracy theories
- [ ] No sensationalized or clickbait content
- [ ] Accurate representation of technical concepts
- [ ] Proper fact-checking of claims and statistics

## Review Process

1. Read the entire article carefully
2. Check each item in the checklist above
3. If any issues are found:
   - Note the specific location (line number or section)
   - Describe the issue clearly
   - Suggest appropriate corrections
4. Provide a summary of your review with one of these outcomes:
   - ✅ **APPROVED**: Article is ready for publication
   - ⚠️ **NEEDS REVISION**: Minor issues found that need correction
   - ❌ **BLOCKED**: Major issues that require significant revision

## Output Format

After reviewing, provide your assessment in this format:

```
## Guardrail Review Results

**Status**: [APPROVED/NEEDS REVISION/BLOCKED]

### Issues Found
1. [Issue description] - Line/Section: [location]
   Suggested fix: [correction]

2. [Additional issues...]

### Summary
[Brief summary of the review outcome and any recommendations]
```

Remember: The goal is to ensure the content is safe, appropriate, and valuable for the Note.com audience while maintaining the informative nature of the AI development digest.