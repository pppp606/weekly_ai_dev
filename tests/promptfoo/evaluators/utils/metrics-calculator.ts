/**
 * Utility for calculating evaluation metrics and performance scores
 */

import { ParsedGuardrailResponse, ResponseMetrics } from './response-parser.js';
import { ViolationClassification, ExpectedViolation } from './violation-classifier.js';

export interface EvaluationMetrics {
  overallScore: number;
  accuracyScore: number;
  formatScore: number;
  qualityScore: number;
  performanceScore: number;
  breakdown: MetricBreakdown;
}

export interface MetricBreakdown {
  detection: DetectionMetrics;
  format: FormatMetrics;
  quality: QualityMetrics;
  performance: PerformanceMetrics;
}

export interface DetectionMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  criticalMissed: number;
  severityAccuracy: Record<string, number>;
}

export interface FormatMetrics {
  hasRequiredSections: boolean;
  statusPresent: boolean;
  summaryPresent: boolean;
  structureScore: number;
}

export interface QualityMetrics {
  summaryQuality: number;
  explanationClarity: number;
  actionabilityScore: number;
  completeness: number;
}

export interface PerformanceMetrics {
  responseTime?: number;
  responseLength: number;
  efficiencyScore: number;
}

export class MetricsCalculator {
  /**
   * Calculate comprehensive evaluation metrics
   */
  static calculateMetrics(
    parsed: ParsedGuardrailResponse,
    detected: ViolationClassification[],
    expected: ExpectedViolation[],
    responseTime?: number
  ): EvaluationMetrics {
    const detectionMetrics = this.calculateDetectionMetrics(detected, expected);
    const formatMetrics = this.calculateFormatMetrics(parsed);
    const qualityMetrics = this.calculateQualityMetrics(parsed);
    const performanceMetrics = this.calculatePerformanceMetrics(parsed, responseTime);

    const breakdown: MetricBreakdown = {
      detection: detectionMetrics,
      format: formatMetrics,
      quality: qualityMetrics,
      performance: performanceMetrics
    };

    // Calculate weighted overall score
    const overallScore = this.calculateOverallScore(breakdown);
    
    return {
      overallScore,
      accuracyScore: detectionMetrics.accuracy,
      formatScore: formatMetrics.structureScore,
      qualityScore: (qualityMetrics.summaryQuality + qualityMetrics.explanationClarity + qualityMetrics.completeness) / 3,
      performanceScore: performanceMetrics.efficiencyScore,
      breakdown
    };
  }

  /**
   * Calculate detection-related metrics
   */
  private static calculateDetectionMetrics(
    detected: ViolationClassification[],
    expected: ExpectedViolation[]
  ): DetectionMetrics {
    let truePositives = 0;
    let falsePositives = 0;
    let falseNegatives = 0;
    let criticalMissed = 0;

    const severityResults: Record<string, { tp: number; total: number }> = {
      'critical': { tp: 0, total: 0 },
      'high': { tp: 0, total: 0 },
      'medium': { tp: 0, total: 0 },
      'low': { tp: 0, total: 0 }
    };

    // Calculate true positives and false negatives
    for (const expectedViolation of expected) {
      const wasDetected = detected.some(d => 
        d.category === expectedViolation.category && d.confidence > 0.5
      );

      severityResults[expectedViolation.severity].total++;

      if (wasDetected) {
        truePositives++;
        severityResults[expectedViolation.severity].tp++;
      } else {
        falseNegatives++;
        if (expectedViolation.mustDetect && expectedViolation.severity === 'critical') {
          criticalMissed++;
        }
      }
    }

    // Calculate false positives
    for (const detectedViolation of detected) {
      if (detectedViolation.confidence > 0.5) {
        const wasExpected = expected.some(e => e.category === detectedViolation.category);
        if (!wasExpected) {
          falsePositives++;
        }
      }
    }

    const precision = truePositives > 0 ? truePositives / (truePositives + falsePositives) : 0;
    const recall = truePositives > 0 ? truePositives / (truePositives + falseNegatives) : 0;
    const accuracy = truePositives > 0 ? truePositives / (truePositives + falsePositives + falseNegatives) : 0;
    const f1Score = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

    const severityAccuracy: Record<string, number> = {};
    for (const [severity, results] of Object.entries(severityResults)) {
      severityAccuracy[severity] = results.total > 0 ? results.tp / results.total : 1;
    }

    return {
      accuracy,
      precision,
      recall,
      f1Score,
      criticalMissed,
      severityAccuracy
    };
  }

  /**
   * Calculate format compliance metrics
   */
  private static calculateFormatMetrics(parsed: ParsedGuardrailResponse): FormatMetrics {
    const statusPresent = parsed.status !== null;
    const summaryPresent = parsed.summary.length > 0;
    const hasRequiredSections = parsed.hasProperFormat;

    // Calculate structure score based on format elements
    let structureScore = 0;
    if (statusPresent) structureScore += 0.4;
    if (summaryPresent) structureScore += 0.3;
    if (hasRequiredSections) structureScore += 0.3;

    return {
      hasRequiredSections,
      statusPresent,
      summaryPresent,
      structureScore
    };
  }

  /**
   * Calculate response quality metrics
   */
  private static calculateQualityMetrics(parsed: ParsedGuardrailResponse): QualityMetrics {
    // Summary quality based on length and content
    const summaryQuality = this.calculateSummaryQuality(parsed.summary);
    
    // Explanation clarity based on violation details
    const explanationClarity = this.calculateExplanationClarity(parsed);
    
    // Actionability based on specific recommendations
    const actionabilityScore = this.calculateActionabilityScore(parsed);
    
    // Completeness based on addressing all violations
    const completeness = this.calculateCompleteness(parsed);

    return {
      summaryQuality,
      explanationClarity,
      actionabilityScore,
      completeness
    };
  }

  /**
   * Calculate performance metrics
   */
  private static calculatePerformanceMetrics(
    parsed: ParsedGuardrailResponse,
    responseTime?: number
  ): PerformanceMetrics {
    const responseLength = parsed.rawResponse.length;
    
    // Efficiency score based on response length and completeness
    let efficiencyScore = 1.0;
    
    // Penalize overly long responses
    if (responseLength > 5000) {
      efficiencyScore *= 0.8;
    } else if (responseLength > 10000) {
      efficiencyScore *= 0.6;
    }
    
    // Penalize overly short responses if violations were expected
    if (responseLength < 200 && parsed.violations.length === 0) {
      efficiencyScore *= 0.7;
    }

    return {
      responseTime,
      responseLength,
      efficiencyScore
    };
  }

  /**
   * Calculate overall weighted score
   */
  private static calculateOverallScore(breakdown: MetricBreakdown): number {
    const weights = {
      detection: 0.4,    // 40% - Most important
      format: 0.2,       // 20% - Structure matters
      quality: 0.3,      // 30% - Quality of analysis
      performance: 0.1   // 10% - Efficiency
    };

    const detectionScore = (breakdown.detection.accuracy + breakdown.detection.f1Score) / 2;
    const formatScore = breakdown.format.structureScore;
    const qualityScore = (
      breakdown.quality.summaryQuality + 
      breakdown.quality.explanationClarity + 
      breakdown.quality.completeness
    ) / 3;
    const performanceScore = breakdown.performance.efficiencyScore;

    return (
      detectionScore * weights.detection +
      formatScore * weights.format +
      qualityScore * weights.quality +
      performanceScore * weights.performance
    );
  }

  /**
   * Calculate summary quality score
   */
  private static calculateSummaryQuality(summary: string): number {
    if (summary.length === 0) return 0;
    
    let score = 0.3; // Base score for having a summary
    
    // Length appropriateness (50-300 chars is ideal)
    if (summary.length >= 50 && summary.length <= 300) {
      score += 0.3;
    } else if (summary.length >= 25 && summary.length <= 500) {
      score += 0.2;
    } else {
      score += 0.1;
    }
    
    // Contains key information
    if (summary.toLowerCase().includes('violation') || 
        summary.toLowerCase().includes('issue') ||
        summary.toLowerCase().includes('concern')) {
      score += 0.2;
    }
    
    // Action-oriented language
    if (summary.toLowerCase().includes('recommend') ||
        summary.toLowerCase().includes('suggest') ||
        summary.toLowerCase().includes('should')) {
      score += 0.2;
    }
    
    return Math.min(1.0, score);
  }

  /**
   * Calculate explanation clarity score
   */
  private static calculateExplanationClarity(parsed: ParsedGuardrailResponse): number {
    let score = 0.5; // Base score
    
    // Check if violations are clearly described
    if (parsed.violations.length > 0) {
      const hasDescriptions = parsed.violations.every(v => v.description.length > 10);
      if (hasDescriptions) score += 0.3;
      
      const hasLocations = parsed.violations.some(v => v.location || v.lineNumbers);
      if (hasLocations) score += 0.2;
    } else if (parsed.status === 'APPROVED') {
      // For approved articles, clear explanation is less critical
      score = 0.8;
    }
    
    return Math.min(1.0, score);
  }

  /**
   * Calculate actionability score
   */
  private static calculateActionabilityScore(parsed: ParsedGuardrailResponse): number {
    const response = parsed.rawResponse.toLowerCase();
    let score = 0.3; // Base score
    
    // Check for actionable language
    const actionWords = ['remove', 'replace', 'modify', 'change', 'add', 'update', 'fix'];
    const hasActionWords = actionWords.some(word => response.includes(word));
    if (hasActionWords) score += 0.4;
    
    // Check for specific recommendations
    if (response.includes('recommend') || response.includes('suggest')) {
      score += 0.3;
    }
    
    return Math.min(1.0, score);
  }

  /**
   * Calculate completeness score
   */
  private static calculateCompleteness(parsed: ParsedGuardrailResponse): number {
    let score = 0.5; // Base score
    
    // Has status decision
    if (parsed.status) score += 0.2;
    
    // Has summary
    if (parsed.summary.length > 0) score += 0.15;
    
    // Has proper structure
    if (parsed.hasProperFormat) score += 0.15;
    
    return Math.min(1.0, score);
  }

  /**
   * Generate a human-readable metrics report
   */
  static generateMetricsReport(metrics: EvaluationMetrics): string {
    const { breakdown } = metrics;
    
    return `
## Evaluation Metrics Report

**Overall Score: ${(metrics.overallScore * 100).toFixed(1)}%**

### Detection Performance
- Accuracy: ${(breakdown.detection.accuracy * 100).toFixed(1)}%
- Precision: ${(breakdown.detection.precision * 100).toFixed(1)}%
- Recall: ${(breakdown.detection.recall * 100).toFixed(1)}%
- F1 Score: ${(breakdown.detection.f1Score * 100).toFixed(1)}%
- Critical Violations Missed: ${breakdown.detection.criticalMissed}

### Format Compliance
- Structure Score: ${(breakdown.format.structureScore * 100).toFixed(1)}%
- Status Present: ${breakdown.format.statusPresent ? '✓' : '✗'}
- Summary Present: ${breakdown.format.summaryPresent ? '✓' : '✗'}
- Required Sections: ${breakdown.format.hasRequiredSections ? '✓' : '✗'}

### Response Quality
- Summary Quality: ${(breakdown.quality.summaryQuality * 100).toFixed(1)}%
- Explanation Clarity: ${(breakdown.quality.explanationClarity * 100).toFixed(1)}%
- Actionability: ${(breakdown.quality.actionabilityScore * 100).toFixed(1)}%
- Completeness: ${(breakdown.quality.completeness * 100).toFixed(1)}%

### Performance
- Response Length: ${breakdown.performance.responseLength} chars
- Efficiency Score: ${(breakdown.performance.efficiencyScore * 100).toFixed(1)}%
${breakdown.performance.responseTime ? `- Response Time: ${breakdown.performance.responseTime}ms` : ''}
    `.trim();
  }
}