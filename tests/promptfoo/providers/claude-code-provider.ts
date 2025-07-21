import { ApiProvider, ProviderResponse, ProviderOptions } from 'promptfoo';
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { MockDateProvider } from './mock-date-provider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Custom provider for testing Claude Code commands
 * This provider simulates the Claude Code environment and executes commands
 */
export class ClaudeCodeProvider implements ApiProvider {
  private anthropic: Anthropic;
  private apiKey: string;
  private isTestMode: boolean;

  constructor(options: { apiKey?: string; testMode?: boolean } = {}) {
    this.apiKey = options.apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.isTestMode = options.testMode || process.env.CLAUDE_CODE_TEST_MODE === 'true';
    
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY is required');
    }
    this.anthropic = new Anthropic({ apiKey: this.apiKey });
  }

  id(): string {
    return 'claude-code';
  }

  async callApi(
    prompt: string,
    options?: ProviderOptions
  ): Promise<ProviderResponse> {
    try {
      // Extract command context if this is a Claude Code command
      const commandContext = await this.extractCommandContext(prompt);
      
      // Prepare the system prompt for Claude Code environment
      const systemPrompt = this.buildSystemPrompt(commandContext);
      
      // Call the Anthropic API
      const response = await this.anthropic.messages.create({
        model: options?.config?.model || 'claude-3-5-sonnet-20241022',
        max_tokens: options?.config?.max_tokens || 4096,
        temperature: options?.config?.temperature || 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: prompt
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
        error: `Claude Code Provider Error: ${error.message}`,
      };
    }
  }

  /**
   * Extract command context from the prompt if it references a command file
   */
  private async extractCommandContext(prompt: string): Promise<string | null> {
    // Check if prompt references a command file
    const commandMatch = prompt.match(/\.claude\/commands\/([\w-]+)\.md/);
    if (!commandMatch) {
      return null;
    }

    const commandFile = commandMatch[0];
    const projectRoot = this.isTestMode 
      ? path.resolve(__dirname, '../../..')  // In test mode, use mock project root
      : path.resolve(__dirname, '../../..');
    const commandPath = path.join(projectRoot, commandFile);

    try {
      const commandContent = await fs.readFile(commandPath, 'utf-8');
      
      // In test mode, replace date references with mock date
      if (this.isTestMode && commandFile.includes('article_guardrail_review')) {
        return this.replaceDateReferences(commandContent);
      }
      
      return commandContent;
    } catch (error) {
      console.warn(`Failed to read command file ${commandFile}: ${error.message}`);
      return null;
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
   * Build the system prompt for Claude Code environment
   */
  private buildSystemPrompt(commandContext: string | null): string {
    const workingDir = this.isTestMode 
      ? path.resolve(__dirname, '../../..') 
      : process.cwd();
    
    const currentDate = this.isTestMode 
      ? MockDateProvider.getDateString() 
      : new Date().toISOString().split('T')[0];
    
    const basePrompt = `You are Claude Code, Anthropic's official CLI for Claude.
You are an agent for Claude Code, executing commands in a development environment.
You have access to file system operations, web requests, and other tools necessary for development tasks.

Environment information:
- Working directory: ${workingDir}
- Platform: ${process.platform}
- Node version: ${process.version}
- Today's date: ${currentDate}
${this.isTestMode ? '- Test Mode: Active (using mock data)' : ''}

You should execute the requested task and provide a detailed response about what was done.`;

    if (commandContext) {
      return `${basePrompt}\n\nCommand Context:\n${commandContext}`;
    }

    return basePrompt;
  }
}

// Export factory function for promptfoo
export default async function createProvider(options: any): Promise<ApiProvider> {
  return new ClaudeCodeProvider(options);
}