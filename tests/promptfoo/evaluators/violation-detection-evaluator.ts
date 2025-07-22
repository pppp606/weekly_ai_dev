/**
 * Custom evaluator for violation detection accuracy and completeness
 */

import fs from 'fs';
import path from 'path';
import { ResponseParser } from './utils/response-parser.js';
import { ViolationClassifier, ExpectedViolation } from './utils/violation-classifier.js';
import { MetricsCalculator } from './utils/metrics-calculator.js';

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
 * Evaluates the accuracy and completeness of violation detection
 */
export default async function violationDetectionEvaluator(
  response: string,
  context: EvaluationContext
): Promise<EvaluationResult> {
  const parsed = ResponseParser.parseGuardrailResponse(response);
  const articlePath = context.vars?.articlePath || context.test?.vars?.articlePath;
  
  try {
    // Read the article content to analyze expected violations
    let articleContent = '';
    let expectedViolations: ExpectedViolation[] = [];
    
    if (articlePath && fs.existsSync(articlePath)) {
      articleContent = fs.readFileSync(articlePath, 'utf-8');
      expectedViolations = ViolationClassifier.getExpectedViolations(articlePath, articleContent);
    }

    // Classify detected violations
    const detectedViolations = parsed.violations.map(v => 
      ViolationClassifier.classifyViolation(v.description)
    );

    // Calculate detection metrics
    const detectionAccuracy = ViolationClassifier.calculateDetectionAccuracy(
      detectedViolations,
      expectedViolations
    );

    // Calculate comprehensive metrics
    const metrics = MetricsCalculator.calculateMetrics(
      parsed,
      detectedViolations,
      expectedViolations
    );

    // Determine pass/fail based on detection performance
    let pass = true;
    let reason = 'Violation detection analysis:\n';
    
    // Critical failure conditions
    if (detectionAccuracy.details.criticallyMissed.length > 0) {
      pass = false;
      reason += `❌ CRITICAL: Missed ${detectionAccuracy.details.criticallyMissed.length} must-detect violations\n`;
      
      for (const missed of detectionAccuracy.details.criticallyMissed) {
        reason += `  - ${missed.category.replace('_', ' ')}: ${missed.description}\n`;
      }
    }

    // Performance thresholds
    const minAccuracy = expectedViolations.length > 0 ? 0.7 : 0.8; // Lower threshold when violations expected
    const minRecall = 0.8; // Must catch most violations
    
    if (detectionAccuracy.accuracy < minAccuracy) {
      pass = false;
      reason += `❌ Low accuracy: ${(detectionAccuracy.accuracy * 100).toFixed(1)}% (minimum: ${(minAccuracy * 100).toFixed(1)}%)\n`;
    }

    if (detectionAccuracy.recall < minRecall && expectedViolations.length > 0) {
      pass = false;
      reason += `❌ Low recall: ${(detectionAccuracy.recall * 100).toFixed(1)}% (minimum: ${(minRecall * 100).toFixed(1)}%)\n`;
    }

    // Positive feedback
    if (detectionAccuracy.accuracy >= minAccuracy) {
      reason += `✅ Good accuracy: ${(detectionAccuracy.accuracy * 100).toFixed(1)}%\n`;
    }

    if (detectionAccuracy.precision >= 0.8) {
      reason += `✅ Good precision: ${(detectionAccuracy.precision * 100).toFixed(1)}%\n`;
    }

    if (expectedViolations.length > 0 && detectionAccuracy.recall >= minRecall) {
      reason += `✅ Good recall: ${(detectionAccuracy.recall * 100).toFixed(1)}%\n`;
    }

    // Add detection details
    reason += `\nDetection Summary:\n`;
    reason += `- Expected violations: ${expectedViolations.length}\n`;
    reason += `- Detected violations: ${detectedViolations.length}\n`;
    reason += `- True positives: ${detectionAccuracy.details.truePositives}\n`;
    reason += `- False positives: ${detectionAccuracy.details.falsePositives}\n`;
    reason += `- False negatives: ${detectionAccuracy.details.falseNegatives}\n`;

    // Named scores for detailed analysis
    const namedScores = {
      detection_accuracy: detectionAccuracy.accuracy,
      detection_precision: detectionAccuracy.precision,
      detection_recall: detectionAccuracy.recall,
      f1_score: detectionAccuracy.f1Score,
      critical_missed: detectionAccuracy.details.criticallyMissed.length === 0 ? 1 : 0,
      violation_count_accuracy: calculateViolationCountAccuracy(detectedViolations.length, expectedViolations.length),
      severity_assessment: calculateSeverityAccuracy(detectedViolations, expectedViolations),
      overall_detection_score: metrics.accuracyScore
    };

    const score = calculateOverallDetectionScore(detectionAccuracy, expectedViolations.length);

    return {
      pass: pass && score >= 0.6, // Require at least 60% score
      score,
      reason: reason.trim(),
      namedScores,
      assertion: {
        type: 'violation-detection',
        value: {
          expected_count: expectedViolations.length,
          detected_count: detectedViolations.length,
          accuracy: detectionAccuracy.accuracy,
          precision: detectionAccuracy.precision,
          recall: detectionAccuracy.recall,
          critical_missed: detectionAccuracy.details.criticallyMissed.length
        }
      }
    };

  } catch (error) {
    return {
      pass: false,
      score: 0,
      reason: `Error evaluating violation detection: ${error instanceof Error ? error.message : String(error)}`,
      assertion: {
        type: 'violation-detection',
        value: 'evaluation_error'
      }
    };
  }
}

/**
 * Calculate accuracy of violation count estimation
 */
function calculateViolationCountAccuracy(detected: number, expected: number): number {
  if (expected === 0 && detected === 0) return 1;
  if (expected === 0) return Math.max(0, 1 - (detected * 0.2)); // Penalize false positives
  
  const ratio = detected / expected;
  if (ratio >= 0.8 && ratio <= 1.2) return 1; // Within 20% is perfect
  if (ratio >= 0.6 && ratio <= 1.4) return 0.8; // Within 40% is good
  if (ratio >= 0.4 && ratio <= 1.6) return 0.6; // Within 60% is acceptable
  return 0.3; // Poor count estimation
}

/**
 * Calculate severity assessment accuracy
 */
function calculateSeverityAccuracy(
  detected: Array<{ severity: string; category: string }>,
  expected: ExpectedViolation[]
): number {
  if (expected.length === 0) return 1;
  
  let correctSeverity = 0;
  
  for (const expectedViolation of expected) {
    const matchingDetection = detected.find(d => d.category === expectedViolation.category);
    if (matchingDetection) {
      // Allow some flexibility in severity assessment
      if (matchingDetection.severity === expectedViolation.severity) {
        correctSeverity += 1;
      } else if (
        (expectedViolation.severity === 'critical' && matchingDetection.severity === 'high') ||
        (expectedViolation.severity === 'high' && matchingDetection.severity === 'critical') ||
        (expectedViolation.severity === 'high' && matchingDetection.severity === 'medium') ||
        (expectedViolation.severity === 'medium' && matchingDetection.severity === 'high')
      ) {
        correctSeverity += 0.7; // Partial credit for close severity
      } else {
        correctSeverity += 0.3; // Small credit for detecting the violation even with wrong severity
      }
    }
  }
  
  return correctSeverity / expected.length;
}

/**
 * Calculate overall detection score combining multiple factors
 */
function calculateOverallDetectionScore(
  detectionAccuracy: any,
  expectedViolationCount: number
): number {
  let score = 0;
  
  // Base score from accuracy
  score += detectionAccuracy.accuracy * 0.4;
  
  // Precision component
  score += detectionAccuracy.precision * 0.3;
  
  // Recall component (more important when violations are expected)
  const recallWeight = expectedViolationCount > 0 ? 0.3 : 0.1;
  score += detectionAccuracy.recall * recallWeight;
  
  // F1 score component
  score += detectionAccuracy.f1Score * 0.2;
  
  // Penalty for missing critical violations
  if (detectionAccuracy.details.criticallyMissed.length > 0) {
    score *= Math.max(0.1, 1 - (detectionAccuracy.details.criticallyMissed.length * 0.3));
  }
  
  // Bonus for perfect detection
  if (detectionAccuracy.accuracy === 1 && detectionAccuracy.precision === 1 && detectionAccuracy.recall === 1) {
    score = Math.min(1, score * 1.1);
  }
  
  return Math.max(0, Math.min(1, score));
}