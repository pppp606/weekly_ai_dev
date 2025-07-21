/**
 * Custom evaluator for output format compliance and structure validation
 */

import { ResponseParser } from './utils/response-parser.js';

interface EvaluationContext {
  prompt?: string;
  vars?: Record<string, any>;
  test?: {
    description?: string;
    vars?: Record<string, any>;
  };
}

interface EvaluationResult {
  pass: boolean;
  score: number;
  reason: string;
  namedScores?: Record<string, number>;
  assertion?: {
    type: string;
    value: any;
  };
}

/**
 * Evaluates the format compliance and structure of guardrail review responses
 */
export default async function formatComplianceEvaluator(
  response: string,
  context: EvaluationContext
): Promise<EvaluationResult> {
  try {
    const parsed = ResponseParser.parseGuardrailResponse(response);
    const formatAnalysis = analyzeFormatCompliance(response, parsed);
    
    let pass = true;
    let reason = 'Format compliance analysis:\n';
    
    // Required elements check
    const requiredElements = [
      { name: 'Header', present: formatAnalysis.hasHeader, required: true },
      { name: 'Status', present: formatAnalysis.hasStatus, required: true },
      { name: 'Summary', present: formatAnalysis.hasSummary, required: true },
      { name: 'Proper Status Value', present: formatAnalysis.hasValidStatus, required: true }
    ];

    // Optional but recommended elements
    const optionalElements = [
      { name: 'Issue Details', present: formatAnalysis.hasIssueDetails, required: false },
      { name: 'Line References', present: formatAnalysis.hasLineReferences, required: false },
      { name: 'Recommendations', present: formatAnalysis.hasRecommendations, required: false }
    ];

    // Check required elements
    for (const element of requiredElements) {
      if (element.present) {
        reason += `✅ ${element.name}: Present\n`;
      } else {
        pass = false;
        reason += `❌ ${element.name}: Missing\n`;
      }
    }

    // Check optional elements
    for (const element of optionalElements) {
      if (element.present) {
        reason += `✅ ${element.name}: Present\n`;
      } else {
        reason += `ℹ️  ${element.name}: Not present (optional)\n`;
      }
    }

    // Structure quality assessment
    reason += `\nStructure Quality:\n`;
    reason += `- Markdown formatting: ${formatAnalysis.hasMarkdownFormatting ? '✅' : '❌'}\n`;
    reason += `- Logical organization: ${formatAnalysis.hasLogicalOrganization ? '✅' : '❌'}\n`;
    reason += `- Appropriate length: ${formatAnalysis.hasAppropriateLength ? '✅' : '❌'}\n`;

    // Additional format checks
    if (!formatAnalysis.hasMarkdownFormatting) {
      pass = false;
    }

    // Named scores for detailed tracking
    const namedScores = {
      required_elements: calculateRequiredElementsScore(requiredElements),
      optional_elements: calculateOptionalElementsScore(optionalElements),
      markdown_formatting: formatAnalysis.hasMarkdownFormatting ? 1 : 0,
      logical_organization: formatAnalysis.hasLogicalOrganization ? 1 : 0,
      appropriate_length: formatAnalysis.hasAppropriateLength ? 1 : 0,
      status_validity: formatAnalysis.hasValidStatus ? 1 : 0,
      summary_quality: calculateSummaryQuality(parsed.summary),
      overall_structure: formatAnalysis.structureScore
    };

    const score = calculateOverallFormatScore(formatAnalysis, namedScores);

    // Additional validation for specific scenarios
    const articlePath = context.vars?.articlePath || context.test?.vars?.articlePath;
    if (articlePath && articlePath.includes('empty') && !formatAnalysis.hasAppropriateErrorHandling) {
      pass = false;
      reason += `❌ Missing appropriate error handling for empty file\n`;
    }

    return {
      pass: pass && score >= 0.7, // Require 70% format compliance
      score,
      reason: reason.trim(),
      namedScores,
      assertion: {
        type: 'format-compliance',
        value: {
          has_header: formatAnalysis.hasHeader,
          has_status: formatAnalysis.hasStatus,
          has_summary: formatAnalysis.hasSummary,
          valid_status: formatAnalysis.hasValidStatus,
          structure_score: formatAnalysis.structureScore
        }
      }
    };

  } catch (error) {
    return {
      pass: false,
      score: 0,
      reason: `Error evaluating format compliance: ${error instanceof Error ? error.message : String(error)}`,
      assertion: {
        type: 'format-compliance',
        value: 'evaluation_error'
      }
    };
  }
}

/**
 * Analyze format compliance of the response
 */
function analyzeFormatCompliance(response: string, parsed: any) {
  const analysis = {
    hasHeader: /##\s*Guardrail Review Results/i.test(response),
    hasStatus: /Status\s*:/i.test(response),
    hasSummary: /Summary/i.test(response) && parsed.summary.length > 0,
    hasValidStatus: ['APPROVED', 'BLOCKED', 'NEEDS REVISION'].includes(parsed.status),
    hasIssueDetails: response.includes('Issue') || response.includes('Violation') || response.includes('Concern'),
    hasLineReferences: /line\s*\d+/i.test(response) || /section/i.test(response),
    hasRecommendations: /recommend/i.test(response) || /suggest/i.test(response) || /should/i.test(response),
    hasMarkdownFormatting: response.includes('##') || response.includes('**') || response.includes('*'),
    hasLogicalOrganization: checkLogicalOrganization(response),
    hasAppropriateLength: response.length >= 100 && response.length <= 5000,
    hasAppropriateErrorHandling: checkErrorHandling(response),
    structureScore: 0
  };

  // Calculate structure score
  let structureScore = 0;
  if (analysis.hasHeader) structureScore += 0.2;
  if (analysis.hasStatus) structureScore += 0.2;
  if (analysis.hasSummary) structureScore += 0.2;
  if (analysis.hasValidStatus) structureScore += 0.2;
  if (analysis.hasMarkdownFormatting) structureScore += 0.1;
  if (analysis.hasLogicalOrganization) structureScore += 0.1;
  
  analysis.structureScore = structureScore;

  return analysis;
}

/**
 * Check if the response has logical organization
 */
function checkLogicalOrganization(response: string): boolean {
  // Check for common patterns of good organization
  const patterns = [
    // Status comes before detailed explanation
    /Status\s*:.*(?:\n.*){0,10}(?:Summary|Issue|Violation|Concern)/is,
    // Summary section exists
    /(?:##\s*)?Summary/i,
    // Proper section flow
    /Guardrail Review Results.*Status.*Summary/is
  ];

  return patterns.some(pattern => pattern.test(response));
}

/**
 * Check for appropriate error handling
 */
function checkErrorHandling(response: string): boolean {
  const errorPatterns = [
    /not found/i,
    /does not exist/i,
    /cannot read/i,
    /failed to read/i,
    /empty/i,
    /no content/i,
    /missing content/i,
    /file error/i
  ];

  return errorPatterns.some(pattern => pattern.test(response));
}

/**
 * Calculate score for required elements
 */
function calculateRequiredElementsScore(elements: Array<{name: string; present: boolean; required: boolean}>): number {
  const requiredElements = elements.filter(e => e.required);
  const presentCount = requiredElements.filter(e => e.present).length;
  return requiredElements.length > 0 ? presentCount / requiredElements.length : 1;
}

/**
 * Calculate score for optional elements
 */
function calculateOptionalElementsScore(elements: Array<{name: string; present: boolean; required: boolean}>): number {
  const optionalElements = elements.filter(e => !e.required);
  const presentCount = optionalElements.filter(e => e.present).length;
  return optionalElements.length > 0 ? presentCount / optionalElements.length : 1;
}

/**
 * Calculate summary quality score
 */
function calculateSummaryQuality(summary: string): number {
  if (!summary || summary.length === 0) return 0;
  
  let score = 0.3; // Base score for having a summary
  
  // Length appropriateness
  if (summary.length >= 20 && summary.length <= 200) {
    score += 0.3;
  } else if (summary.length >= 10 && summary.length <= 400) {
    score += 0.2;
  }
  
  // Content quality indicators
  if (summary.toLowerCase().includes('violation') || 
      summary.toLowerCase().includes('issue') ||
      summary.toLowerCase().includes('approved')) {
    score += 0.2;
  }
  
  // Actionable language
  if (summary.toLowerCase().includes('recommend') ||
      summary.toLowerCase().includes('should') ||
      summary.toLowerCase().includes('need')) {
    score += 0.2;
  }
  
  return Math.min(1, score);
}

/**
 * Calculate overall format score
 */
function calculateOverallFormatScore(analysis: any, namedScores: Record<string, number>): number {
  const weights = {
    required_elements: 0.4,
    status_validity: 0.2,
    markdown_formatting: 0.1,
    logical_organization: 0.1,
    summary_quality: 0.1,
    optional_elements: 0.05,
    appropriate_length: 0.05
  };

  let score = 0;
  for (const [metric, weight] of Object.entries(weights)) {
    score += (namedScores[metric] || 0) * weight;
  }

  // Bonus for excellent formatting
  if (analysis.structureScore >= 0.9) {
    score = Math.min(1, score * 1.05);
  }

  return Math.max(0, Math.min(1, score));
}