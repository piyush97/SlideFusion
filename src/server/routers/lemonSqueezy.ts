import { lemonSqueezyClient } from "@/lib/axios";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";

export const lemonSqueezyRouter = createTRPCRouter({
  buySubscription: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const res = await lemonSqueezyClient(
          process.env.LEMON_SQUEEZY_API_KEY,
        ).post("/checkout", {
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                custom: {
                  buyUserId: input.userId,
                },
              },
              product_options: {
                redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: process.env.LEMON_SQUEEZY_STORE_ID,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: process.env.LEMON_SQUEEZY_VARIANT_ID,
                },
              },
            },
          },
        });

        const checkoutUrl = res.data.data.attributes.url;
        return { url: checkoutUrl, status: 200 };
      } catch (error) {
        console.error("LemonSqueezy API error:", error);
        return { status: 500, error: "Payment service unavailable" };
      }
    }),
});
