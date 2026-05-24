import { generateImageUrl } from "@/actions/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  prompt: z.string().trim().min(1).max(1000),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session.userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const parsedBody = requestSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsedBody.success) {
    return NextResponse.json(
      { success: false, error: "Prompt is required" },
      { status: 400 },
    );
  }

  const imageUrl = await generateImageUrl(parsedBody.data.prompt);
  return NextResponse.json({ success: true, imageUrl });
}
