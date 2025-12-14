/**
 * Kestra Workflow Orchestration Client
 * Integrates with Kestra.io for workflow orchestration
 * 
 * Features:
 * - Structured logging via Kestra logger
 * - Metrics tracking (counters, timers, gauges)
 * - Output management for workflow results
 * - Works standalone or within Kestra server
 */

import Kestra from "@kestra-io/libs";

// Kestra functions with safe wrappers
const logger = Kestra.logger();

// Safe wrapper for counter (requires value and tags)
const logCounter = (name: string, value: number, tags?: Record<string, any>) => {
  try {
    Kestra.counter(name, value, tags || {});
  } catch (e) {
    // Silently fail if not in Kestra environment
  }
};

// Safe wrapper for timer
const logTimer = (name: string) => {
  const start = Date.now();
  return (duration?: number) => {
    try {
      const actualDuration = duration !== undefined ? duration : Date.now() - start;
      Kestra.timer(name, actualDuration, {});
    } catch (e) {
      // Silently fail if not in Kestra environment
    }
  };
};

// Safe wrapper for gauge
const logGauge = (name: string, value: number, tags?: Record<string, any>) => {
  try {
    Kestra.gauge(name, value, tags || {});
  } catch (e) {
    // Silently fail if not in Kestra environment
  }
};

// Safe wrapper for outputs
const logOutputs = (data: any) => {
  try {
    Kestra.outputs(data);
  } catch (e) {
    // Silently fail if not in Kestra environment
  }
};
import {
  generateCatchUpSummary,
  rewriteMessage,
  explainText,
  type CatchUpResult,
  type RewriteResult,
  type ExplainResult,
  type UserContext,
} from "./oumi-client";

export interface WorkflowExecutionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  executionId: string;
  steps: WorkflowStep[];
  duration: number;
}

export interface WorkflowStep {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  startTime?: number;
  endTime?: number;
  error?: string;
}

/**
 * Kestra workflow for "Did I Miss Anything?" feature
 * Integrates Kestra logging, metrics, and outputs
 */
export async function executeCatchUpWorkflow(
  input: string,
  context?: UserContext
): Promise<WorkflowExecutionResult<CatchUpResult>> {
  const executionId = `catch-up-${Date.now()}`;
  const startTime = Date.now();
  const steps: WorkflowStep[] = [
    { name: "validate-input", status: "pending" },
    { name: "preprocess-content", status: "pending" },
    { name: "ai-analysis", status: "pending" },
    { name: "format-results", status: "pending" },
  ];

  // Kestra: Log workflow start
  logger.info("Starting catch-up workflow", { executionId, userId: context?.userId });
  
  // Kestra: Increment workflow counter
  logCounter("workflow.catchup.started", 1, { userId: context?.userId });

  try {
    // Step 1: Validate input
    steps[0].status = "running";
    steps[0].startTime = Date.now();
    
    logger.info("Validating input", { inputLength: input?.length || 0 });
    
    if (!input || input.trim().length < 10) {
      throw new Error("Input text is too short or empty");
    }
    
    steps[0].status = "completed";
    steps[0].endTime = Date.now();
    
    logger.info("Input validated successfully");

    // Step 2: Preprocess content
    steps[1].status = "running";
    steps[1].startTime = Date.now();
    
    logger.info("Preprocessing content");
    
    // Remove excessive whitespace and normalize
    const preprocessed = input.trim().replace(/\s+/g, " ");
    
    steps[1].status = "completed";
    steps[1].endTime = Date.now();
    
    logger.info("Content preprocessed", { preprocessedLength: preprocessed.length });

    // Step 3: AI Analysis
    steps[2].status = "running";
    steps[2].startTime = Date.now();
    
    logger.info("Starting AI analysis with Oumi/Groq");
    
    // Kestra: Start timer for AI processing
    const aiTimer = logTimer("workflow.catchup.ai_analysis_duration");
    
    const result = await generateCatchUpSummary(preprocessed, context);
    
    // Kestra: Stop timer
    aiTimer();
    
    steps[2].status = "completed";
    steps[2].endTime = Date.now();
    
    logger.info("AI analysis completed", { 
      decisionsCount: result.keyDecisions?.length || 0,
      actionItemsCount: result.actionItems?.length || 0 
    });

    // Step 4: Format results
    steps[3].status = "running";
    steps[3].startTime = Date.now();
    
    logger.info("Formatting results");
    
    // Ensure all fields are properly formatted
    const formattedResult: CatchUpResult = {
      summary: result.summary || "No summary available",
      keyDecisions: result.keyDecisions || [],
      actionItems: result.actionItems || [],
      deadlines: result.deadlines || [],
      importantDiscussions: result.importantDiscussions || [],
    };
    
    steps[3].status = "completed";
    steps[3].endTime = Date.now();

    const duration = Date.now() - startTime;
    
    // Kestra: Record success metrics
    logCounter("workflow.catchup.completed", 1);
    logTimer("workflow.catchup.total_duration")(duration);
    
    // Kestra: Output results for downstream tasks
    logOutputs({
      executionId,
      duration,
      decisionsCount: formattedResult.keyDecisions.length,
      actionItemsCount: formattedResult.actionItems.length,
      deadlinesCount: formattedResult.deadlines.length,
    });
    
    logger.info("Workflow completed successfully", { executionId, duration });

    return {
      success: true,
      data: formattedResult,
      executionId,
      steps,
      duration,
    };
  } catch (error) {
    const failedStep = steps.find((s) => s.status === "running");
    if (failedStep) {
      failedStep.status = "failed";
      failedStep.endTime = Date.now();
      failedStep.error = error instanceof Error ? error.message : "Unknown error";
    }

    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    // Kestra: Record failure metrics
    logCounter("workflow.catchup.failed", 1, { 
      error: errorMessage,
      failedStep: failedStep?.name 
    });
    
    logger.error("Workflow failed", { 
      executionId, 
      error: errorMessage,
      failedStep: failedStep?.name,
      duration 
    });

    return {
      success: false,
      error: errorMessage,
      executionId,
      steps,
      duration,
    };
  }
}

/**
 * Kestra workflow for "Say It Better" feature
 * Integrates Kestra logging, metrics, and outputs
 */
export async function executeRewriteWorkflow(
  originalText: string,
  intent: string,
  context?: UserContext
): Promise<WorkflowExecutionResult<RewriteResult>> {
  const executionId = `rewrite-${Date.now()}`;
  const startTime = Date.now();
  const steps: WorkflowStep[] = [
    { name: "validate-input", status: "pending" },
    { name: "analyze-tone", status: "pending" },
    { name: "ai-rewrite", status: "pending" },
    { name: "quality-check", status: "pending" },
  ];

  logger.info("Starting rewrite workflow", { executionId, intent, userId: context?.userId });
  logCounter("workflow.rewrite.started", 1, { intent });

  try {
    // Step 1: Validate input
    steps[0].status = "running";
    steps[0].startTime = Date.now();
    
    logger.info("Validating input", { originalLength: originalText?.length || 0 });
    
    if (!originalText || originalText.trim().length < 5) {
      throw new Error("Message is too short to rewrite");
    }
    
    steps[0].status = "completed";
    steps[0].endTime = Date.now();

    // Step 2: Analyze original tone
    steps[1].status = "running";
    steps[1].startTime = Date.now();
    
    logger.info("Analyzing tone");
    
    // Simple tone analysis (could be enhanced with sentiment analysis)
    const hasAngryWords = /angry|hate|terrible|awful|stupid/i.test(originalText);
    const hasUrgentWords = /urgent|asap|immediately|now/i.test(originalText);
    
    steps[1].status = "completed";
    steps[1].endTime = Date.now();
    
    logger.info("Tone analyzed", { hasAngryWords, hasUrgentWords });

    // Step 3: AI Rewrite
    steps[2].status = "running";
    steps[2].startTime = Date.now();
    
    logger.info("Starting AI rewrite with Oumi/Groq");
    const aiTimer = logTimer("workflow.rewrite.ai_rewrite_duration");
    
    const result = await rewriteMessage(originalText, intent, context);
    
    aiTimer();
    steps[2].status = "completed";
    steps[2].endTime = Date.now();
    
    logger.info("AI rewrite completed", { 
      originalLength: originalText.length,
      rewrittenLength: result.rewrittenText.length 
    });

    // Step 4: Quality check
    steps[3].status = "running";
    steps[3].startTime = Date.now();
    
    logger.info("Performing quality check");
    
    // Ensure rewritten text is different and not empty
    if (
      !result.rewrittenText ||
      result.rewrittenText === originalText ||
      result.rewrittenText.length < 5
    ) {
      throw new Error("Rewrite quality check failed");
    }
    
    steps[3].status = "completed";
    steps[3].endTime = Date.now();

    const duration = Date.now() - startTime;
    
    // Kestra: Record success metrics
    logCounter("workflow.rewrite.completed", 1, { intent });
    logTimer("workflow.rewrite.total_duration")(duration);
    
    // Kestra: Output results
    logOutputs({
      executionId,
      duration,
      intent,
      improvementsCount: result.improvements.length,
    });
    
    logger.info("Workflow completed successfully", { executionId, duration });

    return {
      success: true,
      data: result,
      executionId,
      steps,
      duration,
    };
  } catch (error) {
    const failedStep = steps.find((s) => s.status === "running");
    if (failedStep) {
      failedStep.status = "failed";
      failedStep.endTime = Date.now();
      failedStep.error = error instanceof Error ? error.message : "Unknown error";
    }

    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    logCounter("workflow.rewrite.failed", 1, { error: errorMessage, intent });
    logger.error("Workflow failed", { executionId, error: errorMessage, duration });

    return {
      success: false,
      error: errorMessage,
      executionId,
      steps,
      duration,
    };
  }
}

/**
 * Kestra workflow for "Explain It Like I'm Stressed" feature
 * Integrates Kestra logging, metrics, and outputs
 */
export async function executeExplainWorkflow(
  content: string,
  category?: string,
  context?: UserContext
): Promise<WorkflowExecutionResult<ExplainResult>> {
  const executionId = `explain-${Date.now()}`;
  const startTime = Date.now();
  const steps: WorkflowStep[] = [
    { name: "validate-input", status: "pending" },
    { name: "detect-category", status: "pending" },
    { name: "ai-explanation", status: "pending" },
    { name: "add-disclaimers", status: "pending" },
  ];

  logger.info("Starting explain workflow", { executionId, category, userId: context?.userId });
  logCounter("workflow.explain.started", 1, { category: category || "unknown" });

  try {
    // Step 1: Validate input
    steps[0].status = "running";
    steps[0].startTime = Date.now();
    
    logger.info("Validating input", { contentLength: content?.length || 0 });
    
    if (!content || content.trim().length < 20) {
      throw new Error("Content is too short to explain");
    }
    
    steps[0].status = "completed";
    steps[0].endTime = Date.now();

    // Step 2: Detect category if not provided
    steps[1].status = "running";
    steps[1].startTime = Date.now();
    
    logger.info("Detecting category");
    
    let detectedCategory = category;
    if (!detectedCategory) {
      const lowerContent = content.toLowerCase();
      if (
        lowerContent.includes("medical") ||
        lowerContent.includes("diagnosis") ||
        lowerContent.includes("patient")
      ) {
        detectedCategory = "medical";
      } else if (
        lowerContent.includes("legal") ||
        lowerContent.includes("contract") ||
        lowerContent.includes("agreement")
      ) {
        detectedCategory = "legal";
      } else if (
        lowerContent.includes("bank") ||
        lowerContent.includes("payment") ||
        lowerContent.includes("invoice")
      ) {
        detectedCategory = "financial";
      } else if (
        lowerContent.includes("technical") ||
        lowerContent.includes("code") ||
        lowerContent.includes("system")
      ) {
        detectedCategory = "technical";
      }
    }
    
    steps[1].status = "completed";
    steps[1].endTime = Date.now();
    
    logger.info("Category detected", { category: detectedCategory });

    // Step 3: AI Explanation
    steps[2].status = "running";
    steps[2].startTime = Date.now();
    
    logger.info("Starting AI explanation with Oumi/Groq");
    const aiTimer = logTimer("workflow.explain.ai_explanation_duration");
    
    const result = await explainText(content, detectedCategory, context);
    
    aiTimer();
    steps[2].status = "completed";
    steps[2].endTime = Date.now();
    
    logger.info("AI explanation completed", { urgencyLevel: result.urgencyLevel });

    // Step 4: Add disclaimers for sensitive categories
    steps[3].status = "running";
    steps[3].startTime = Date.now();
    
    logger.info("Adding disclaimers", { category: detectedCategory });
    
    if (detectedCategory === "medical") {
      result.simpleExplanation +=
        "\n\nNote: This is for informational purposes only and not medical advice. Consult a healthcare professional.";
    } else if (detectedCategory === "legal") {
      result.simpleExplanation +=
        "\n\nNote: This is for informational purposes only and not legal advice. Consult a qualified attorney.";
    } else if (detectedCategory === "financial") {
      result.simpleExplanation +=
        "\n\nNote: This is for informational purposes only and not financial advice. Consult a financial advisor.";
    }
    
    steps[3].status = "completed";
    steps[3].endTime = Date.now();

    const duration = Date.now() - startTime;
    
    // Kestra: Record success metrics
    logCounter("workflow.explain.completed", 1, { category: detectedCategory });
    logTimer("workflow.explain.total_duration")(duration);
    logGauge("workflow.explain.urgency_level", result.urgencyLevel === "high" ? 3 : result.urgencyLevel === "medium" ? 2 : 1);
    
    // Kestra: Output results
    logOutputs({
      executionId,
      duration,
      category: detectedCategory,
      urgencyLevel: result.urgencyLevel,
      actionRequired: result.actionRequired,
    });
    
    logger.info("Workflow completed successfully", { executionId, duration });

    return {
      success: true,
      data: result,
      executionId,
      steps,
      duration,
    };
  } catch (error) {
    const failedStep = steps.find((s) => s.status === "running");
    if (failedStep) {
      failedStep.status = "failed";
      failedStep.endTime = Date.now();
      failedStep.error = error instanceof Error ? error.message : "Unknown error";
    }

    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    logCounter("workflow.explain.failed", 1, { error: errorMessage });
    logger.error("Workflow failed", { executionId, error: errorMessage, duration });

    return {
      success: false,
      error: errorMessage,
      executionId,
      steps,
      duration,
    };
  }
}

/**
 * Get workflow execution status
 */
export function getWorkflowStatus(executionId: string): {
  id: string;
  status: "pending" | "running" | "completed" | "failed";
} {
  // In a real implementation, this would query Kestra's API
  // For MVP, we return mock status
  return {
    id: executionId,
    status: "completed",
  };
}
