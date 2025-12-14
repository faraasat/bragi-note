import { NextResponse } from "next/server";
import { checkAIHealth } from "@bragi/ai";

export const runtime = "nodejs";

export async function GET() {
  try {
    const health = await checkAIHealth();

    return NextResponse.json({
      status: "ok",
      services: health,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: "Health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
