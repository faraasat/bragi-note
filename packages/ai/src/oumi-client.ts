/**
 * Oumi AI Client for Bragi Note
 * Uses free-tier AI APIs for MVP phase
 * 
 * Provider:
 * - Groq: Fast Llama inference (free tier, 7000 RPM)
 */

import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export interface AIModelConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP?: number;
}

export interface UserContext {
  userId: string;
  preferences?: {
    tone?: string;
    style?: string;
  };
}

export interface CatchUpResult {
  summary: string;
  keyDecisions: string[];
  actionItems: string[];
  deadlines: Array<{ task: string; deadline: string }>;
  importantDiscussions: string[];
}

export interface RewriteResult {
  originalText: string;
  rewrittenText: string;
  improvements: string[];
  tone: string;
}

export interface ExplainResult {
  tldr: string;
  simpleExplanation: string;
  keyPoints: string[];
  actionRequired: boolean;
  urgencyLevel: "low" | "medium" | "high";
}

/**
 * Configuration for different features
 */
export const OUMI_CONFIG = {
  catchUp: {
    model: "llama-3.1-70b-versatile", // Groq model
    temperature: 0.3,
    maxTokens: 2000,
    topP: 0.9,
  },
  rewrite: {
    model: "llama-3.1-70b-versatile", // Groq model
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.95,
  },
  explain: {
    model: "llama-3.1-70b-versatile", // Groq model
    temperature: 0.4,
    maxTokens: 1500,
    topP: 0.9,
  },
} as const;

/**
 * Generate catch-up summary from conversation/meeting content
 */
export async function generateCatchUpSummary(
  content: string,
  context?: UserContext
): Promise<CatchUpResult> {
  const config = OUMI_CONFIG.catchUp;

  const prompt = `You are an AI assistant helping someone catch up on what they missed.

Analyze the following conversation/meeting content and provide:
1. A brief summary of what happened
2. Key decisions that were made
3. Action items assigned (with who is responsible if mentioned)
4. Deadlines mentioned (with dates)
5. Important discussions they should know about

Content to analyze:
${content}

Respond in JSON format with this structure:
{
  "summary": "Brief overview",
  "keyDecisions": ["decision 1", "decision 2"],
  "actionItems": ["action 1", "action 2"],
  "deadlines": [{"task": "task name", "deadline": "date"}],
  "importantDiscussions": ["discussion 1", "discussion 2"]
}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    top_p: config.topP,
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
  return {
    summary: result.summary || "",
    keyDecisions: result.keyDecisions || [],
    actionItems: result.actionItems || [],
    deadlines: result.deadlines || [],
    importantDiscussions: result.importantDiscussions || [],
  };
}

/**
 * Rewrite text with specified tone/intent
 */
export async function rewriteMessage(
  originalText: string,
  intent: string,
  context?: UserContext
): Promise<RewriteResult> {
  const config = OUMI_CONFIG.rewrite;

  const toneInstructions: Record<string, string> = {
    professional:
      "Make it professional, clear, and respectful. Remove casual language and emotions.",
    friendly:
      "Make it warm and friendly while maintaining clarity. Add appropriate warmth.",
    firm: "Make it firm and direct while remaining professional. Be assertive but not aggressive.",
    apologetic:
      "Make it apologetic and understanding. Show empathy and willingness to resolve issues.",
    "de-escalate":
      "Remove aggressive or emotional language. Focus on understanding and finding common ground.",
    calm: "Make it calm and measured. Remove any emotional or reactive language.",
  };

  const instruction =
    toneInstructions[intent.toLowerCase()] ||
    "Improve the message to be clearer and more professional.";

  const prompt = `You are an AI communication assistant helping someone improve their message.

Original message:
"${originalText}"

Task: ${instruction}

Requirements:
- Keep the core meaning unchanged
- Maintain key information and requests
- Make it clear and easy to understand
- Suggest specific improvements made

Respond in JSON format:
{
  "rewrittenText": "The improved message",
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tone": "${intent}"
}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    top_p: config.topP,
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
  return {
    originalText,
    rewrittenText: result.rewrittenText || originalText,
    improvements: result.improvements || [],
    tone: intent,
  };
}

/**
 * Explain complex text in simple terms
 */
export async function explainText(
  content: string,
  category?: string,
  context?: UserContext
): Promise<ExplainResult> {
  const config = OUMI_CONFIG.explain;

  const categoryInstructions: Record<string, string> = {
    medical:
      "This is a medical document. Explain medical terms in simple language. Add disclaimers.",
    legal:
      "This is a legal document. Explain legal terms clearly. Note this is not legal advice.",
    financial:
      "This is a financial document. Explain financial terms simply. Note this is not financial advice.",
    technical:
      "This is a technical document. Explain technical concepts in everyday language.",
  };

  const categoryNote = category
    ? categoryInstructions[category.toLowerCase()] || ""
    : "";

  const prompt = `You are an AI assistant helping someone understand a complex document.

${categoryNote}

Document to explain:
${content}

Provide:
1. A one-sentence TL;DR summary
2. A simple, calming explanation in plain language
3. Key points they should know (3-5 points)
4. Whether action is required from them
5. Urgency level (low, medium, or high)

Respond in JSON format:
{
  "tldr": "One sentence summary",
  "simpleExplanation": "Easy to understand explanation",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "actionRequired": true/false,
  "urgencyLevel": "low/medium/high"
}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    top_p: config.topP,
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
  return {
    tldr: result.tldr || "",
    simpleExplanation: result.simpleExplanation || "",
    keyPoints: result.keyPoints || [],
    actionRequired: result.actionRequired || false,
    urgencyLevel: result.urgencyLevel || "medium",
  };
}

/**
 * Health check for AI services
 */
export async function checkAIHealth(): Promise<{
  groq: boolean;
}> {
  const results = {
    groq: false,
  };

  try {
    await groq.chat.completions.create({
      messages: [{ role: "user", content: "ping" }],
      model: "llama-3.1-70b-versatile",
      max_tokens: 5,
    });
    results.groq = true;
  } catch {
    // Groq unavailable
  }

  return results;
}
