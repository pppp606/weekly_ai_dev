import { ApiProvider, ProviderResponse, ProviderOptions } from 'promptfoo';
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
// Removed MockDateProvider - not needed for article review

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Specialized provider for testing article_guardrail_review.md command only
 * This provider simulates the Claude Code environment specifically for article guardrail reviews
 */
export class ArticleGuardrailProvider implements ApiProvider {
  private anthropic: Anthropic;
  private apiKey: string;
  private isTestMode: boolean;
  private commandContent: string | null = null;

  constructor(options: { apiKey?: string; testMode?: boolean } = {}) {
    this.apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.isTestMode = options.testMode || process.env.CLAUDE_CODE_TEST_MODE === 'true';
    
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY is required');
    }
    this.anthropic = new Anthropic({ apiKey: this.apiKey });
  }

  id(): string {
    return 'article-guardrail';
  }

  async callApi(
    prompt: string,
    options?: ProviderOptions
  ): Promise<ProviderResponse> {
    try {
      // Load the article_guardrail_review.md command if not already loaded
      if (!this.commandContent) {
        this.commandContent = await this.loadArticleGuardrailCommand();
      }

      // Prepare the system prompt for the article guardrail review environment
      const systemPrompt = this.buildSystemPrompt();
      
      // Build the user prompt with the command content and any test-specific instructions
      const userPrompt = this.buildUserPrompt(prompt);

      // Call the Anthropic API
      const response = await this.anthropic.messages.create({
        model: options?.config?.model || 'claude-3-5-sonnet-20241022',
        max_tokens: options?.config?.max_tokens || 4096,
        temperature: options?.config?.temperature || 0.3,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      });

      // Extract the text response
      const output = response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      return {
        output,
        tokenUsage: {
          total: response.usage?.input_tokens + response.usage?.output_tokens,
          prompt: response.usage?.input_tokens,
          completion: response.usage?.output_tokens,
        },
      };
    } catch (error) {
      return {
        error: `Article Guardrail Provider Error: ${error.message}`,
      };
    }
  }

  /**
   * Load and process the article_guardrail_review.md command content
   */
  private async loadArticleGuardrailCommand(): Promise<string> {
    const projectRoot = path.resolve(__dirname, '../../..');
    const commandPath = path.join(projectRoot, '.claude/commands/article_guardrail_review.md');

    try {
      let commandContent = await fs.readFile(commandPath, 'utf-8');
      
      // In test mode, replace date references with mock date
      if (this.isTestMode) {
        commandContent = this.replaceDateReferences(commandContent);
      }
      
      return commandContent;
    } catch (error) {
      throw new Error(`Failed to load article_guardrail_review.md: ${error.message}`);
    }
  }

  /**
   * Replace date references in command content for test mode
   */
  private replaceDateReferences(content: string): string {
    const mockDate = MockDateProvider.getDateString();
    const mockDateCompact = MockDateProvider.getDateCompact();
    
    // Replace date command output
    content = content.replace(/date \+%Y-%m-%d/g, `echo "${mockDate}"`);
    
    // Replace file path patterns
    content = content.replace(/\{YYYYMMDD\}/g, mockDateCompact);
    content = content.replace(/\{YYYY-MM-DD\}/g, mockDate);
    
    return content;
  }

  /**
   * Build the system prompt for the article guardrail review environment
   */
  private buildSystemPrompt(): string {
    const workingDir = this.isTestMode 
      ? path.resolve(__dirname, '../../..') 
      : process.cwd();
    
    const currentDate = this.isTestMode 
      ? MockDateProvider.getDateString() 
      : new Date().toISOString().split('T')[0];
    
    return `You are Claude Code, Anthropic's official CLI for Claude.

You are executing the article_guardrail_review.md command to review weekly AI digest articles for compliance with content policies and safety guidelines.

Environment information:
- Working directory: ${workingDir}
- Platform: ${process.platform}
- Today's date: ${currentDate}
${this.isTestMode ? '- Test Mode: Active (using mock data and file paths)' : ''}

Your task is to carefully review the specified article file and provide a comprehensive guardrail review following the exact format specified in the command.

You have access to file system operations to read the article files. In test mode, the article files are located in the tests/promptfoo/mocks/articles/ directory.

Focus on:
1. Reading the article file content
2. Systematically checking each guardrail category
3. Providing clear, actionable feedback
4. Following the exact output format specified

Be thorough but practical in your review - flag real issues while avoiding false positives.`;
  }

  /**
   * Build the user prompt with command content and test context
   */
  private buildUserPrompt(originalPrompt: string): string {
    let prompt = `Execute the following command:\n\n${this.commandContent}\n\n`;
    
    // Add any additional context from the original prompt
    if (originalPrompt && originalPrompt.trim() !== this.commandContent?.trim()) {
      prompt += `\nAdditional context: ${originalPrompt}`;
    }

    return prompt;
  }
}

// Export factory function for promptfoo
export default async function createProvider(options: any): Promise<ApiProvider> {
  return new ArticleGuardrailProvider(options);
}