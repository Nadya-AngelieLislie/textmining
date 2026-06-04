import { NextRequest, NextResponse } from "next/server";

const FLASK_API = process.env.FLASK_API_URL || "http://localhost:5000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!Array.isArray(body.texts) || body.texts.length === 0) {
      return NextResponse.json(
        { error: "texts array is required and must not be empty" },
        { status: 400 }
      );
    }

    const response = await fetch(`${FLASK_API}/predict/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texts: body.texts.slice(0, 50) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to predict batch" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Batch prediction error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
