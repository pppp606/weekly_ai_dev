#!/usr/bin/env ts-node

import { rmSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface CleanupOptions {
  dryRun?: boolean;
  keepDays?: number;
  pattern?: string;
}

/**
 * Cleans up test artifacts and temporary files
 */
class TestCleanup {
  private dryRun: boolean;
  private keepDays: number;
  private pattern: string;

  constructor(options: CleanupOptions = {}) {
    this.dryRun = options.dryRun || false;
    this.keepDays = options.keepDays || 7;
    this.pattern = options.pattern || '*';
  }

  /**
   * Run cleanup
   */
  async cleanup(): Promise<void> {
    console.log('🧹 Starting test cleanup...');
    if (this.dryRun) {
      console.log('  (DRY RUN - no files will be deleted)');
    }

    const cleanupTasks = [
      { path: 'output', description: 'Test output files' },
      { path: 'test-results', description: 'Test results' },
      { path: '.promptfoo', description: 'Promptfoo cache' },
      { path: 'coverage', description: 'Coverage reports' },
      { path: 'reports', description: 'Generated reports' },
    ];

    let totalRemoved = 0;
    let totalSize = 0;

    for (const task of cleanupTasks) {
      const result = await this.cleanupDirectory(task.path, task.description);
      totalRemoved += result.count;
      totalSize += result.size;
    }

    // Clean up old artifacts
    const artifactResult = await this.cleanupOldArtifacts();
    totalRemoved += artifactResult.count;
    totalSize += artifactResult.size;

    console.log('\n✅ Cleanup complete!');
    console.log(`  📁 Files removed: ${totalRemoved}`);
    console.log(`  💾 Space freed: ${this.formatSize(totalSize)}`);
  }

  /**
   * Clean up a specific directory
   */
  private async cleanupDirectory(
    relativePath: string,
    description: string
  ): Promise<{ count: number; size: number }> {
    const fullPath = join(__dirname, '..', relativePath);
    
    if (!existsSync(fullPath)) {
      return { count: 0, size: 0 };
    }

    console.log(`\n📁 Cleaning ${description}...`);
    
    const stats = this.getDirectoryStats(fullPath);
    console.log(`  Found: ${stats.count} files (${this.formatSize(stats.size)})`);

    if (!this.dryRun && stats.count > 0) {
      try {
        rmSync(fullPath, { recursive: true, force: true });
        console.log(`  ✅ Removed ${stats.count} files`);
      } catch (error) {
        console.error(`  ❌ Error cleaning ${relativePath}:`, error);
        return { count: 0, size: 0 };
      }
    }

    return stats;
  }

  /**
   * Clean up old artifacts based on age
   */
  private async cleanupOldArtifacts(): Promise<{ count: number; size: number }> {
    console.log(`\n📁 Cleaning artifacts older than ${this.keepDays} days...`);

    const artifactPaths = [
      'test-report-*.html',
      'test-report-*.json',
      'test-summary-*.md',
    ];

    let totalCount = 0;
    let totalSize = 0;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.keepDays);

    for (const pattern of artifactPaths) {
      const files = this.findFiles(join(__dirname, '..'), pattern);
      
      for (const file of files) {
        const stat = statSync(file);
        
        if (stat.mtime < cutoffDate) {
          console.log(`  🗑️  ${file} (${this.formatAge(stat.mtime)})`);
          totalCount++;
          totalSize += stat.size;

          if (!this.dryRun) {
            try {
              rmSync(file);
            } catch (error) {
              console.error(`  ❌ Error removing ${file}:`, error);
            }
          }
        }
      }
    }

    return { count: totalCount, size: totalSize };
  }

  /**
   * Get directory statistics
   */
  private getDirectoryStats(dirPath: string): { count: number; size: number } {
    let count = 0;
    let size = 0;

    const scan = (currentPath: string) => {
      try {
        const items = readdirSync(currentPath);
        
        for (const item of items) {
          const fullPath = join(currentPath, item);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            scan(fullPath);
          } else {
            count++;
            size += stat.size;
          }
        }
      } catch (error) {
        // Ignore errors for inaccessible directories
      }
    };

    scan(dirPath);
    return { count, size };
  }

  /**
   * Find files matching pattern
   */
  private findFiles(dir: string, pattern: string): string[] {
    const files: string[] = [];
    
    try {
      const items = readdirSync(dir);
      const regex = new RegExp(pattern.replace('*', '.*'));

      for (const item of items) {
        if (regex.test(item)) {
          files.push(join(dir, item));
        }
      }
    } catch (error) {
      // Ignore errors
    }

    return files;
  }

  /**
   * Format file size
   */
  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  /**
   * Format file age
   */
  private formatAge(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'today';
    } else if (days === 1) {
      return 'yesterday';
    } else {
      return `${days} days old`;
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options: CleanupOptions = {};

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') {
      options.dryRun = true;
    } else if (args[i] === '--keep-days' && args[i + 1]) {
      options.keepDays = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--pattern' && args[i + 1]) {
      options.pattern = args[i + 1];
      i++;
    }
  }

  const cleanup = new TestCleanup(options);
  cleanup.cleanup().catch(error => {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  });
}

export { TestCleanup };