import { NextRequest, NextResponse } from "next/server";
import { executeCatchUpWorkflow } from "@bragi/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, userId } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text input is required" },
        { status: 400 }
      );
    }

    // Execute Kestra workflow
    const result = await executeCatchUpWorkflow(text, {
      userId: userId || "anonymous",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Processing failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      executionId: result.executionId,
      steps: result.steps,
      duration: result.duration,
    });
  } catch (error) {
    console.error("Catch-up API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
