import { ApiProvider, ProviderResponse, ProviderOptions } from 'promptfoo';
import { spawn } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Provider that executes article_guardrail_review.md via Claude Code (`claude -p`)
 * This ensures proper Claude Code + promptfoo + mock environment integration
 */
export class ClaudeCodeProvider implements ApiProvider {
  private projectRoot: string;
  private mockMode: boolean;

  constructor(options: { mockMode?: boolean } = {}) {
    // Navigate to project root from tests/promptfoo/providers/
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.mockMode = options.mockMode || process.env.CLAUDE_CODE_TEST_MODE === 'true';
  }

  id(): string {
    return 'claude-code';
  }

  async callApi(
    prompt: string,
    options?: ProviderOptions
  ): Promise<ProviderResponse> {
    try {
      // Setup mock environment if in test mode
      if (this.mockMode) {
        await this.setupMockEnvironment();
      }

      // Execute Claude Code with article_guardrail_review command
      const result = await this.executeClaudeCode(prompt);
      
      return {
        output: result.stdout,
        tokenUsage: {
          total: this.estimateTokens(result.stdout),
          prompt: this.estimateTokens(prompt),
          completion: this.estimateTokens(result.stdout)
        }
      };
    } catch (error) {
      return {
        error: `Claude Code execution failed: ${error.message}`,
        output: ''
      };
    }
  }

  private async executeClaudeCode(articlePath: string): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      // Construct the command to execute article_guardrail_review.md
      const claudeArgs = [
        '-p', // Pipe mode
        '.claude/commands/article_guardrail_review.md',
        articlePath
      ];

      const claudeProcess = spawn('claude', claudeArgs, {
        cwd: this.projectRoot,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          ...(this.mockMode && { CLAUDE_CODE_TEST_MODE: 'true' })
        }
      });

      let stdout = '';
      let stderr = '';

      claudeProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      claudeProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      claudeProcess.on('close', (code) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(new Error(`Claude Code exited with code ${code}: ${stderr}`));
        }
      });

      claudeProcess.on('error', (error) => {
        reject(new Error(`Failed to start Claude Code: ${error.message}`));
      });

      // Close stdin to signal end of input
      claudeProcess.stdin.end();
    });
  }

  private async setupMockEnvironment(): Promise<void> {
    // In mock mode, ensure we're using test articles from mocks/articles/
    // Claude Code will read from the actual file system, so we need to ensure
    // the mock articles are available at the expected paths
    
    // For now, we assume the test runner will pass mock article paths
    // In a more sophisticated setup, we could temporarily symlink or copy mock files
  }

  private estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token for English text
    return Math.ceil(text.length / 4);
  }
}

export default ClaudeCodeProvider;