import { generateImageUrl } from "@/actions/openai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🧪 Testing image generation...");
    const imageUrl = await generateImageUrl(
      "A professional business meeting in a modern office",
    );
    console.log("🧪 Test image result:", imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl,
      message: "Image generation test completed",
    });
  } catch (error) {
    console.error("🧪 Test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
