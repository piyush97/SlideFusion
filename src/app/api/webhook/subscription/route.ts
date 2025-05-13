import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // to remove cache

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const { buyerUserId } = body.meta.custom_data;

    if (!buyerUserId) {
      throw new Error("Missing buyerUserId in custom_data");
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
  }
}
