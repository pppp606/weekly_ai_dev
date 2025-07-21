/**
 * Utility for parsing Claude responses from the article_guardrail_review command
 */

export interface ParsedGuardrailResponse {
  status: 'APPROVED' | 'BLOCKED' | 'NEEDS REVISION' | null;
  summary: string;
  violations: ViolationItem[];
  hasProperFormat: boolean;
  rawResponse: string;
}

export interface ViolationItem {
  type: string;
  description: string;
  location?: string;
  severity: 'high' | 'medium' | 'low';
  lineNumbers?: number[];
}

export class ResponseParser {
  /**
   * Parse the guardrail review response from Claude
   */
  static parseGuardrailResponse(response: string): ParsedGuardrailResponse {
    const parsed: ParsedGuardrailResponse = {
      status: null,
      summary: '',
      violations: [],
      hasProperFormat: false,
      rawResponse: response
    };

    // Extract status
    const statusMatch = response.match(/Status\s*:\s*(APPROVED|BLOCKED|NEEDS REVISION)/i);
    if (statusMatch) {
      parsed.status = statusMatch[1].toUpperCase() as ParsedGuardrailResponse['status'];
    }

    // Extract summary
    const summaryMatch = response.match(/(?:## )?Summary\s*[:\n]\s*(.*?)(?=\n##|\n\n|$)/s);
    if (summaryMatch) {
      parsed.summary = summaryMatch[1].trim();
    }

    // Check for proper formatting
    parsed.hasProperFormat = this.checkFormatCompliance(response);

    // Extract violations
    parsed.violations = this.extractViolations(response);

    return parsed;
  }

  /**
   * Check if the response follows the expected format
   */
  private static checkFormatCompliance(response: string): boolean {
    const requiredElements = [
      /##\s*Guardrail Review Results/i,
      /Status\s*:/i,
      /Summary/i
    ];

    return requiredElements.every(pattern => pattern.test(response));
  }

  /**
   * Extract violation information from the response
   */
  private static extractViolations(response: string): ViolationItem[] {
    const violations: ViolationItem[] = [];

    // Look for violation patterns in the response
    const violationPatterns = [
      {
        type: 'confidential_info',
        patterns: [/API\s*key/gi, /token/gi, /password/gi, /credential/gi],
        severity: 'high' as const
      },
      {
        type: 'personal_info',
        patterns: [/personal\s*information/gi, /email\s*address/gi, /phone\s*number/gi, /PII/gi],
        severity: 'high' as const
      },
      {
        type: 'security_exploit',
        patterns: [/exploit/gi, /SQL\s*injection/gi, /XSS/gi, /vulnerability/gi],
        severity: 'high' as const
      },
      {
        type: 'hate_speech',
        patterns: [/hate\s*speech/gi, /discriminatory/gi, /offensive\s*language/gi],
        severity: 'high' as const
      },
      {
        type: 'medical_advice',
        patterns: [/medical\s*advice/gi, /diagnosis/gi, /treatment\s*recommendation/gi],
        severity: 'medium' as const
      },
      {
        type: 'political_bias',
        patterns: [/political\s*bias/gi, /partisan/gi, /political\s*opinion/gi],
        severity: 'medium' as const
      },
      {
        type: 'false_information',
        patterns: [/false\s*information/gi, /misinformation/gi, /inaccurate/gi],
        severity: 'medium' as const
      },
      {
        type: 'inappropriate_content',
        patterns: [/inappropriate/gi, /unsuitable/gi, /explicit/gi],
        severity: 'medium' as const
      }
    ];

    for (const { type, patterns, severity } of violationPatterns) {
      for (const pattern of patterns) {
        const matches = response.match(pattern);
        if (matches) {
          // Extract context around the violation
          const contextMatch = response.match(new RegExp(`.{0,100}${pattern.source}.{0,100}`, 'gi'));
          const description = contextMatch ? contextMatch[0] : matches[0];

          // Try to extract line numbers if mentioned
          const lineNumberMatch = description.match(/line\s*(\d+)/gi);
          const lineNumbers = lineNumberMatch ? 
            lineNumberMatch.map(match => parseInt(match.match(/\d+/)![0])) : undefined;

          violations.push({
            type,
            description: description.trim(),
            severity,
            lineNumbers
          });
          break; // Only add one violation per type
        }
      }
    }

    return violations;
  }

  /**
   * Extract metrics from the parsed response
   */
  static extractMetrics(parsed: ParsedGuardrailResponse): ResponseMetrics {
    return {
      hasValidStatus: parsed.status !== null,
      statusType: parsed.status,
      violationCount: parsed.violations.length,
      highSeverityCount: parsed.violations.filter(v => v.severity === 'high').length,
      mediumSeverityCount: parsed.violations.filter(v => v.severity === 'medium').length,
      lowSeverityCount: parsed.violations.filter(v => v.severity === 'low').length,
      hasProperFormat: parsed.hasProperFormat,
      summaryLength: parsed.summary.length,
      responseLength: parsed.rawResponse.length
    };
  }
}

export interface ResponseMetrics {
  hasValidStatus: boolean;
  statusType: string | null;
  violationCount: number;
  highSeverityCount: number;
  mediumSeverityCount: number;
  lowSeverityCount: number;
  hasProperFormat: boolean;
  summaryLength: number;
  responseLength: number;
}