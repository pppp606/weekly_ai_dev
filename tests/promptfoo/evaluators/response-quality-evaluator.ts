/**
 * Custom evaluator for assessing response quality and explanation clarity
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
 * Evaluates the quality and clarity of guardrail review explanations
 */
export default async function responseQualityEvaluator(
  response: string,
  context: EvaluationContext
): Promise<EvaluationResult> {
  try {
    const parsed = ResponseParser.parseGuardrailResponse(response);
    const qualityAnalysis = analyzeResponseQuality(response, parsed);
    
    let reason = 'Response quality analysis:\n';
    
    // Summary Quality Assessment
    reason += `\n📝 Summary Quality (${(qualityAnalysis.summaryQuality * 100).toFixed(1)}%):\n`;
    if (qualityAnalysis.summaryQuality >= 0.8) {
      reason += `✅ Excellent summary - clear, concise, and informative\n`;
    } else if (qualityAnalysis.summaryQuality >= 0.6) {
      reason += `✅ Good summary - adequate information provided\n`;
    } else if (qualityAnalysis.summaryQuality >= 0.4) {
      reason += `⚠️  Basic summary - could be more detailed\n`;
    } else {
      reason += `❌ Poor summary - lacks clarity or detail\n`;
    }

    // Explanation Clarity Assessment
    reason += `\n🔍 Explanation Clarity (${(qualityAnalysis.explanationClarity * 100).toFixed(1)}%):\n`;
    if (qualityAnalysis.explanationClarity >= 0.8) {
      reason += `✅ Clear explanations with specific details\n`;
    } else if (qualityAnalysis.explanationClarity >= 0.6) {
      reason += `✅ Adequate explanations provided\n`;
    } else if (qualityAnalysis.explanationClarity >= 0.4) {
      reason += `⚠️  Explanations could be clearer\n`;
    } else {
      reason += `❌ Unclear or insufficient explanations\n`;
    }

    // Actionability Assessment
    reason += `\n🎯 Actionability (${(qualityAnalysis.actionability * 100).toFixed(1)}%):\n`;
    if (qualityAnalysis.actionability >= 0.8) {
      reason += `✅ Provides clear, actionable recommendations\n`;
    } else if (qualityAnalysis.actionability >= 0.6) {
      reason += `✅ Some actionable guidance provided\n`;
    } else if (qualityAnalysis.actionability >= 0.4) {
      reason += `⚠️  Limited actionable recommendations\n`;
    } else {
      reason += `❌ Lacks actionable recommendations\n`;
    }

    // Completeness Assessment
    reason += `\n📋 Completeness (${(qualityAnalysis.completeness * 100).toFixed(1)}%):\n`;
    if (qualityAnalysis.completeness >= 0.8) {
      reason += `✅ Comprehensive coverage of all aspects\n`;
    } else if (qualityAnalysis.completeness >= 0.6) {
      reason += `✅ Covers main aspects adequately\n`;
    } else if (qualityAnalysis.completeness >= 0.4) {
      reason += `⚠️  Some aspects could be covered better\n`;
    } else {
      reason += `❌ Incomplete coverage of important aspects\n`;
    }

    // Professional Tone Assessment
    reason += `\n💼 Professional Tone (${(qualityAnalysis.professionalTone * 100).toFixed(1)}%):\n`;
    if (qualityAnalysis.professionalTone >= 0.8) {
      reason += `✅ Professional and appropriate tone throughout\n`;
    } else if (qualityAnalysis.professionalTone >= 0.6) {
      reason += `✅ Generally professional tone\n`;
    } else {
      reason += `⚠️  Tone could be more professional\n`;
    }

    // Evidence-Based Assessment
    reason += `\n📊 Evidence-Based (${(qualityAnalysis.evidenceBased * 100).toFixed(1)}%):\n`;
    if (qualityAnalysis.evidenceBased >= 0.8) {
      reason += `✅ Well-supported with specific examples and references\n`;
    } else if (qualityAnalysis.evidenceBased >= 0.6) {
      reason += `✅ Some supporting evidence provided\n`;
    } else if (qualityAnalysis.evidenceBased >= 0.4) {
      reason += `⚠️  Could benefit from more specific evidence\n`;
    } else {
      reason += `❌ Lacks supporting evidence or examples\n`;
    }

    // Named scores for detailed tracking
    const namedScores = {
      summary_quality: qualityAnalysis.summaryQuality,
      explanation_clarity: qualityAnalysis.explanationClarity,
      actionability: qualityAnalysis.actionability,
      completeness: qualityAnalysis.completeness,
      professional_tone: qualityAnalysis.professionalTone,
      evidence_based: qualityAnalysis.evidenceBased,
      response_length_appropriate: qualityAnalysis.responseLength >= 100 && qualityAnalysis.responseLength <= 3000 ? 1 : 0,
      violation_specificity: calculateViolationSpecificity(parsed.violations),
      contextual_understanding: assessContextualUnderstanding(response, context),
      overall_quality: qualityAnalysis.overallQuality
    };

    // Calculate overall score
    const overallScore = calculateOverallQualityScore(qualityAnalysis);
    
    // Determine pass/fail based on quality thresholds
    let pass = true;
    const minQualityThreshold = 0.6;
    
    if (overallScore < minQualityThreshold) {
      pass = false;
      reason += `\n❌ Overall quality below minimum threshold (${(minQualityThreshold * 100).toFixed(1)}%)\n`;
    }

    // Critical quality failures
    if (qualityAnalysis.summaryQuality < 0.3) {
      pass = false;
      reason += `❌ CRITICAL: Summary quality too low\n`;
    }

    if (qualityAnalysis.completeness < 0.4) {
      pass = false;
      reason += `❌ CRITICAL: Response lacks essential completeness\n`;
    }

    reason += `\n📊 Overall Quality Score: ${(overallScore * 100).toFixed(1)}%`;

    return {
      pass,
      score: overallScore,
      reason: reason.trim(),
      namedScores,
      assertion: {
        type: 'response-quality',
        value: {
          overall_score: overallScore,
          summary_quality: qualityAnalysis.summaryQuality,
          explanation_clarity: qualityAnalysis.explanationClarity,
          actionability: qualityAnalysis.actionability,
          completeness: qualityAnalysis.completeness
        }
      }
    };

  } catch (error) {
    return {
      pass: false,
      score: 0,
      reason: `Error evaluating response quality: ${error instanceof Error ? error.message : String(error)}`,
      assertion: {
        type: 'response-quality',
        value: 'evaluation_error'
      }
    };
  }
}

/**
 * Analyze response quality across multiple dimensions
 */
function analyzeResponseQuality(response: string, parsed: any) {
  return {
    summaryQuality: assessSummaryQuality(parsed.summary),
    explanationClarity: assessExplanationClarity(response, parsed),
    actionability: assessActionability(response),
    completeness: assessCompleteness(response, parsed),
    professionalTone: assessProfessionalTone(response),
    evidenceBased: assessEvidenceBase(response),
    responseLength: response.length,
    overallQuality: 0 // Will be calculated later
  };
}

/**
 * Assess summary quality
 */
function assessSummaryQuality(summary: string): number {
  if (!summary || summary.length === 0) return 0;
  
  let score = 0.2; // Base score for having a summary
  
  // Length appropriateness (50-300 characters ideal)
  if (summary.length >= 50 && summary.length <= 300) {
    score += 0.3;
  } else if (summary.length >= 25 && summary.length <= 500) {
    score += 0.2;
  } else if (summary.length >= 10) {
    score += 0.1;
  }
  
  // Content quality
  const qualityIndicators = [
    /clear|concise|brief/i,
    /violation|issue|concern/i,
    /recommend|suggest|advise/i,
    /approve|block|revision/i,
    /review|analysis|assessment/i
  ];
  
  const matchedIndicators = qualityIndicators.filter(pattern => pattern.test(summary)).length;
  score += (matchedIndicators / qualityIndicators.length) * 0.3;
  
  // Clarity indicators
  if (!/unclear|confusing|vague/i.test(summary)) {
    score += 0.1;
  }
  
  // Professional language
  if (!/informal|casual|slang/i.test(summary)) {
    score += 0.1;
  }
  
  return Math.min(1, score);
}

/**
 * Assess explanation clarity
 */
function assessExplanationClarity(response: string, parsed: any): number {
  let score = 0.3; // Base score
  
  // Check for specific explanations
  if (parsed.violations && parsed.violations.length > 0) {
    const hasDetailedExplanations = parsed.violations.every(v => v.description.length > 20);
    if (hasDetailedExplanations) score += 0.3;
    
    const hasLocationInfo = parsed.violations.some(v => v.location || v.lineNumbers);
    if (hasLocationInfo) score += 0.2;
  } else if (parsed.status === 'APPROVED') {
    // For approved articles, clear reasoning is important
    if (response.toLowerCase().includes('no violation') || 
        response.toLowerCase().includes('no issue') ||
        response.toLowerCase().includes('compliant')) {
      score += 0.4;
    }
  }
  
  // Check for clear structure
  if (/because|since|due to|reason/i.test(response)) {
    score += 0.1;
  }
  
  // Check for technical accuracy
  if (response.includes('API') || response.includes('security') || 
      response.includes('personal information') || response.includes('confidential')) {
    score += 0.1;
  }
  
  return Math.min(1, score);
}

/**
 * Assess actionability of recommendations
 */
function assessActionability(response: string): number {
  let score = 0.2; // Base score
  
  // Action words
  const actionWords = [
    'remove', 'delete', 'replace', 'modify', 'change', 'update', 'fix', 'revise',
    'add', 'include', 'implement', 'consider', 'ensure', 'verify'
  ];
  
  const actionWordsFound = actionWords.filter(word => 
    new RegExp(`\\b${word}\\b`, 'i').test(response)
  ).length;
  
  score += Math.min(0.4, (actionWordsFound / actionWords.length) * 2);
  
  // Specific recommendations
  if (/recommend|suggest|should|must|need to/i.test(response)) {
    score += 0.2;
  }
  
  // Specific steps or instructions
  if (/step|instruction|guideline|procedure/i.test(response)) {
    score += 0.2;
  }
  
  return Math.min(1, score);
}

/**
 * Assess completeness of the response
 */
function assessCompleteness(response: string, parsed: any): number {
  let score = 0.2; // Base score
  
  // Has status decision
  if (parsed.status) score += 0.2;
  
  // Has summary
  if (parsed.summary && parsed.summary.length > 0) score += 0.2;
  
  // Has proper structure
  if (parsed.hasProperFormat) score += 0.2;
  
  // Addresses the main concern
  if (parsed.status === 'BLOCKED' && parsed.violations && parsed.violations.length > 0) {
    score += 0.2; // Blocked articles should have violations listed
  } else if (parsed.status === 'APPROVED') {
    score += 0.2; // Approved articles should be justified
  }
  
  return Math.min(1, score);
}

/**
 * Assess professional tone
 */
function assessProfessionalTone(response: string): number {
  let score = 0.6; // Start with good assumption
  
  // Professional language indicators
  if (/analysis|assessment|evaluation|review/i.test(response)) {
    score += 0.1;
  }
  
  // Avoid informal language
  const informalPatterns = [/yeah|yep|nope|gonna|wanna|kinda|sorta/i, /!!!/];
  if (informalPatterns.some(pattern => pattern.test(response))) {
    score -= 0.2;
  }
  
  // Appropriate formality
  if (/please|kindly|respectfully/i.test(response)) {
    score += 0.1;
  }
  
  // Objective language
  if (!/obviously|clearly|definitely|absolutely/i.test(response)) {
    score += 0.2;
  }
  
  return Math.min(1, Math.max(0, score));
}

/**
 * Assess evidence-based reasoning
 */
function assessEvidenceBase(response: string): number {
  let score = 0.3; // Base score
  
  // Specific references
  if (/line \d+|section|paragraph|page|reference/i.test(response)) {
    score += 0.3;
  }
  
  // Examples provided
  if (/example|instance|case|such as|including/i.test(response)) {
    score += 0.2;
  }
  
  // Technical specificity
  const technicalTerms = ['API', 'SQL', 'XSS', 'authentication', 'encryption', 'vulnerability'];
  if (technicalTerms.some(term => response.includes(term))) {
    score += 0.2;
  }
  
  return Math.min(1, score);
}

/**
 * Calculate violation specificity score
 */
function calculateViolationSpecificity(violations: any[]): number {
  if (violations.length === 0) return 1; // No violations to be specific about
  
  let totalSpecificity = 0;
  for (const violation of violations) {
    let specificity = 0.3; // Base score
    
    if (violation.description.length > 50) specificity += 0.3;
    if (violation.location || violation.lineNumbers) specificity += 0.2;
    if (violation.type && violation.type !== 'other') specificity += 0.2;
    
    totalSpecificity += Math.min(1, specificity);
  }
  
  return totalSpecificity / violations.length;
}

/**
 * Assess contextual understanding
 */
function assessContextualUnderstanding(response: string, context: EvaluationContext): number {
  let score = 0.5; // Base score
  
  const articlePath = context.vars?.articlePath || context.test?.vars?.articlePath;
  if (articlePath) {
    // Understanding of file type
    if (articlePath.includes('.md') && /markdown|article|content/i.test(response)) {
      score += 0.2;
    }
    
    // Understanding of test scenario
    if (articlePath.includes('guardrail-fail') && response.includes('BLOCKED')) {
      score += 0.3;
    }
    
    if (articlePath.includes('empty') && /empty|no content/i.test(response)) {
      score += 0.3;
    }
  }
  
  return Math.min(1, score);
}

/**
 * Calculate overall quality score
 */
function calculateOverallQualityScore(analysis: any): number {
  const weights = {
    summaryQuality: 0.25,
    explanationClarity: 0.25,
    actionability: 0.20,
    completeness: 0.15,
    professionalTone: 0.10,
    evidenceBased: 0.05
  };
  
  let score = 0;
  for (const [metric, weight] of Object.entries(weights)) {
    score += (analysis[metric] || 0) * weight;
  }
  
  // Update overall quality in analysis
  analysis.overallQuality = score;
  
  return Math.max(0, Math.min(1, score));
}