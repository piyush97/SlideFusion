export const dynamic = "force-dynamic"; // to remove cache
import { client } from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const { buyerUserId } = body.meta.custom_data;

    if (!buyerUserId) {
      throw new Error("Missing buyerUserId in custom_data");
    }

    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!
    ); // Create HMAC using the secret key

    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8"); // Create HMAC digest

    const signature = Buffer.from(req.headers.get("x-signature")!, "utf8"); // Get the signature from the request header

    console.log("Digest:", digest);
    console.log("Signature:", signature);

    // prevent timing attack
    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature");
    }

    // update the order status in the database

    const buyer = await client.user.update({
      where: {
        id: buyerUserId,
      },
      data: {
        subscription: true,
      },
    });

    if (!buyer) {
      return Response.json({
        message: "Cannot update the subscription",
        status: 404,
      });
    }

    return Response.json(
      {
        message: "Subscription updated successfully",
        data: buyer,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
