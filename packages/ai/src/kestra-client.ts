/**
 * Kestra Workflow Orchestration Client
 * Manages multi-step AI processing pipelines
 */

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

  try {
    // Step 1: Validate input
    steps[0].status = "running";
    steps[0].startTime = Date.now();
    
    if (!input || input.trim().length < 10) {
      throw new Error("Input text is too short or empty");
    }
    
    steps[0].status = "completed";
    steps[0].endTime = Date.now();

    // Step 2: Preprocess content
    steps[1].status = "running";
    steps[1].startTime = Date.now();
    
    // Remove excessive whitespace and normalize
    const preprocessed = input.trim().replace(/\s+/g, " ");
    
    steps[1].status = "completed";
    steps[1].endTime = Date.now();

    // Step 3: AI Analysis
    steps[2].status = "running";
    steps[2].startTime = Date.now();
    
    const result = await generateCatchUpSummary(preprocessed, context);
    
    steps[2].status = "completed";
    steps[2].endTime = Date.now();

    // Step 4: Format results
    steps[3].status = "running";
    steps[3].startTime = Date.now();
    
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

    return {
      success: true,
      data: formattedResult,
      executionId,
      steps,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    const failedStep = steps.find((s) => s.status === "running");
    if (failedStep) {
      failedStep.status = "failed";
      failedStep.endTime = Date.now();
      failedStep.error = error instanceof Error ? error.message : "Unknown error";
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      executionId,
      steps,
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Kestra workflow for "Say It Better" feature
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

  try {
    // Step 1: Validate input
    steps[0].status = "running";
    steps[0].startTime = Date.now();
    
    if (!originalText || originalText.trim().length < 5) {
      throw new Error("Message is too short to rewrite");
    }
    
    steps[0].status = "completed";
    steps[0].endTime = Date.now();

    // Step 2: Analyze original tone
    steps[1].status = "running";
    steps[1].startTime = Date.now();
    
    // Simple tone analysis (could be enhanced with sentiment analysis)
    const hasAngryWords = /angry|hate|terrible|awful|stupid/i.test(originalText);
    const hasUrgentWords = /urgent|asap|immediately|now/i.test(originalText);
    
    steps[1].status = "completed";
    steps[1].endTime = Date.now();

    // Step 3: AI Rewrite
    steps[2].status = "running";
    steps[2].startTime = Date.now();
    
    const result = await rewriteMessage(originalText, intent, context);
    
    steps[2].status = "completed";
    steps[2].endTime = Date.now();

    // Step 4: Quality check
    steps[3].status = "running";
    steps[3].startTime = Date.now();
    
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

    return {
      success: true,
      data: result,
      executionId,
      steps,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    const failedStep = steps.find((s) => s.status === "running");
    if (failedStep) {
      failedStep.status = "failed";
      failedStep.endTime = Date.now();
      failedStep.error = error instanceof Error ? error.message : "Unknown error";
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      executionId,
      steps,
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Kestra workflow for "Explain It Like I'm Stressed" feature
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

  try {
    // Step 1: Validate input
    steps[0].status = "running";
    steps[0].startTime = Date.now();
    
    if (!content || content.trim().length < 20) {
      throw new Error("Content is too short to explain");
    }
    
    steps[0].status = "completed";
    steps[0].endTime = Date.now();

    // Step 2: Detect category if not provided
    steps[1].status = "running";
    steps[1].startTime = Date.now();
    
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

    // Step 3: AI Explanation
    steps[2].status = "running";
    steps[2].startTime = Date.now();
    
    const result = await explainText(content, detectedCategory, context);
    
    steps[2].status = "completed";
    steps[2].endTime = Date.now();

    // Step 4: Add disclaimers for sensitive categories
    steps[3].status = "running";
    steps[3].startTime = Date.now();
    
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

    return {
      success: true,
      data: result,
      executionId,
      steps,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    const failedStep = steps.find((s) => s.status === "running");
    if (failedStep) {
      failedStep.status = "failed";
      failedStep.endTime = Date.now();
      failedStep.error = error instanceof Error ? error.message : "Unknown error";
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      executionId,
      steps,
      duration: Date.now() - startTime,
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
