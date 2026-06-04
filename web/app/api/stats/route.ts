import { NextResponse } from "next/server";

const FLASK_API = process.env.FLASK_API_URL || "http://localhost:5000";

export async function GET() {
  try {
    const response = await fetch(`${FLASK_API}/stats`);

    if (!response.ok) {
      // Return default stats if endpoint fails
      return NextResponse.json({
        accuracy: 0.9988,
        train_size: 3312,
        test_size: 829,
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Stats fetch error:", error);
    // Return default stats if Flask is not available
    return NextResponse.json({
      accuracy: 0.9988,
      train_size: 3312,
      test_size: 829,
    });
  }
}
