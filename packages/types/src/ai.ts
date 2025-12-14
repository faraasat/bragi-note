export interface CatchUpSummary {
  criticalActions: Array<{
    action: string;
    priority: "high" | "medium" | "low";
    assignee?: string;
    deadline?: string;
  }>;
  deadlines: Array<{
    date: string;
    description: string;
    riskLevel: "high" | "medium" | "low";
  }>;
  keyDecisions: Array<{
    decision: string;
    context: string;
    impact: string;
  }>;
  questionsForYou: Array<{
    question: string;
    urgency: "urgent" | "normal" | "low";
  }>;
  importantContextChanges: string[];
  statusUpdates: string[];
}

export interface RewriteIntent {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface RewriteResult {
  originalText: string;
  rewrittenText: string;
  intent: RewriteIntent;
  confidence: number;
  changes: Array<{
    type: "tone" | "clarity" | "empathy" | "professionalism";
    description: string;
    before: string;
    after: string;
  }>;
}

export interface ExplanationLevel {
  type: "tldr" | "clear" | "detailed";
  content: string;
  keyPoints: string[];
  nextSteps?: string[];
}

export interface ExplainResult {
  originalText: string;
  category?: "medical" | "legal" | "financial" | "technical" | "general";
  explanations: ExplanationLevel[];
  warnings?: string[];
  questions?: string[];
}
