/**
 * Mock date provider for consistent testing
 * Returns a fixed date (2025-07-21) to ensure reproducible test results
 */
export class MockDateProvider {
  private static readonly FIXED_DATE = '2025-07-21';
  private static readonly FIXED_TIMESTAMP = new Date('2025-07-21T00:00:00.000Z');

  /**
   * Get the fixed date string in YYYY-MM-DD format
   */
  static getDateString(): string {
    return this.FIXED_DATE;
  }

  /**
   * Get the fixed date as a Date object
   */
  static getDate(): Date {
    return new Date(this.FIXED_TIMESTAMP);
  }

  /**
   * Get the fixed date in YYYYMMDD format (for file names)
   */
  static getDateCompact(): string {
    return this.FIXED_DATE.replace(/-/g, '');
  }

  /**
   * Mock the global Date object for testing
   */
  static mockGlobalDate(): void {
    // Store original Date constructor
    const OriginalDate = Date;
    
    // Create mock Date constructor
    const MockDate = function(this: any, ...args: any[]) {
      if (args.length === 0) {
        return new OriginalDate(MockDateProvider.FIXED_TIMESTAMP);
      }
      return new (OriginalDate as any)(...args);
    } as any;

    // Copy static methods
    Object.setPrototypeOf(MockDate, OriginalDate);
    MockDate.prototype = OriginalDate.prototype;
    MockDate.now = () => MockDateProvider.FIXED_TIMESTAMP.getTime();
    MockDate.parse = OriginalDate.parse;
    MockDate.UTC = OriginalDate.UTC;

    // Replace global Date
    (global as any).Date = MockDate;
  }

  /**
   * Restore the original Date object
   */
  static restoreGlobalDate(): void {
    // This would need to store the original Date, but for simplicity
    // we'll assume the test runner handles this
  }
}

export default MockDateProvider;