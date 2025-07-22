#!/usr/bin/env ts-node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { format } from 'date-fns';

interface UpdateOptions {
  date?: string;
  dryRun?: boolean;
}

/**
 * Updates mock data files with new dates
 */
class MockUpdater {
  private targetDate: string;
  private dryRun: boolean;

  constructor(options: UpdateOptions) {
    this.targetDate = options.date || format(new Date(), 'yyyy-MM-dd');
    this.dryRun = options.dryRun || false;
  }

  /**
   * Update all mock files
   */
  async updateAll(): Promise<void> {
    console.log(`🔄 Updating mock data to date: ${this.targetDate}`);
    if (this.dryRun) {
      console.log('  (DRY RUN - no files will be modified)');
    }

    // Update mock data files
    this.updateMockDataFiles();
    
    // Update test files
    this.updateTestFiles();
    
    // Update scenario dates
    this.updateScenarioDates();

    console.log('✅ Mock data update complete!');
  }

  /**
   * Update mock data TypeScript files
   */
  private updateMockDataFiles(): void {
    const mockDir = join(__dirname, '../providers/mock-data');
    const files = this.getFiles(mockDir, '.ts');

    files.forEach(file => {
      this.updateFile(file, (content) => {
        // Update date patterns in mock data
        return content
          .replace(/\d{4}-\d{2}-\d{2}/g, this.targetDate)
          .replace(/\d{4}年\d{1,2}月\d{1,2}日/g, this.formatJapaneseDate(this.targetDate));
      });
    });
  }

  /**
   * Update test YAML files
   */
  private updateTestFiles(): void {
    const testDir = join(__dirname, '../tests');
    const files = this.getFiles(testDir, '.yaml');

    files.forEach(file => {
      this.updateFile(file, (content) => {
        // Update date in vars sections
        return content.replace(
          /date:\s*["']?\d{4}-\d{2}-\d{2}["']?/g,
          `date: "${this.targetDate}"`
        );
      });
    });
  }

  /**
   * Update scenario dates in response data
   */
  private updateScenarioDates(): void {
    const scenarioFile = join(__dirname, '../providers/mock-data/scenarios.ts');
    
    this.updateFile(scenarioFile, (content) => {
      // Update various date formats
      const datePatterns = [
        // ISO date
        /\d{4}-\d{2}-\d{2}/g,
        // Japanese date
        /\d{4}年\d{1,2}月\d{1,2}日/g,
        // Timestamp in URLs
        /weekly-ai-digest-\d{8}/g,
      ];

      let updated = content;
      datePatterns.forEach(pattern => {
        if (pattern.toString().includes('weekly-ai-digest')) {
          const newTimestamp = this.targetDate.replace(/-/g, '');
          updated = updated.replace(pattern, `weekly-ai-digest-${newTimestamp}`);
        } else if (pattern.toString().includes('年')) {
          updated = updated.replace(pattern, this.formatJapaneseDate(this.targetDate));
        } else {
          updated = updated.replace(pattern, this.targetDate);
        }
      });

      return updated;
    });
  }

  /**
   * Update a single file
   */
  private updateFile(filePath: string, transformer: (content: string) => string): void {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const updated = transformer(content);

      if (content !== updated) {
        console.log(`  📝 Updating: ${filePath}`);
        if (!this.dryRun) {
          writeFileSync(filePath, updated, 'utf-8');
        }
      }
    } catch (error) {
      console.error(`  ❌ Error updating ${filePath}:`, error);
    }
  }

  /**
   * Get all files with specific extension
   */
  private getFiles(dir: string, ext: string): string[] {
    const files: string[] = [];

    const scan = (currentDir: string) => {
      const items = readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = join(currentDir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.')) {
          scan(fullPath);
        } else if (stat.isFile() && item.endsWith(ext)) {
          files.push(fullPath);
        }
      });
    };

    scan(dir);
    return files;
  }

  /**
   * Format date in Japanese
   */
  private formatJapaneseDate(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options: UpdateOptions = {};

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--date' && args[i + 1]) {
      options.date = args[i + 1];
      i++;
    } else if (args[i] === '--dry-run') {
      options.dryRun = true;
    }
  }

  // Validate date format
  if (options.date && !/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    console.error('❌ Invalid date format. Use YYYY-MM-DD');
    process.exit(1);
  }

  const updater = new MockUpdater(options);
  updater.updateAll().catch(error => {
    console.error('❌ Update failed:', error);
    process.exit(1);
  });
}

export { MockUpdater };