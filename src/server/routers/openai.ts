import { ContentType } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openaiRouter = createTRPCRouter({
  generateCreativePrompt: protectedProcedure
    .input(z.object({ userPrompt: z.string() }))
    .mutation(async ({ input }) => {
      const finalPrompt = `
        Create a coherent and relevant outline for the following prompt: ${input.userPrompt}.
        The outline should consist of at least 6 points, with each point written as a single sentence.
        Ensure the outline is well-structured and directly related to the topic.
        Return the output in the following JSON format:

        {
          "outlines": [
            "Point 1",
            "Point 2",
            "Point 3",
            "Point 4",
            "Point 5",
            "Point 6"
          ]
        }

        Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
        `;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4.1-nano-2025-04-14",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI that generates outlines for presentations.",
            },
            {
              role: "user",
              content: finalPrompt,
            },
          ],
          max_tokens: 1000,
          temperature: 0.0,
        });

        const responseContent = completion.choices[0].message?.content;
        if (responseContent) {
          const cleanedResponseContent = responseContent
            .replace(/```json|```/g, "")
            .trim();
          try {
            const jsonResponse = JSON.parse(cleanedResponseContent);
            return { status: 200, data: jsonResponse };
          } catch (error) {
            console.error(
              "Invalid JSON received:",
              cleanedResponseContent,
              error
            );
            return {
              status: 500,
              error: "Invalid JSON format received from AI",
            };
          }
        }
        return { status: 500, error: "No response from AI" };
      } catch (error) {
        console.error("OpenAI API error:", error);
        return { status: 500, error: "AI service unavailable" };
      }
    }),

  generateLayouts: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        theme: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.projectId) {
          return { status: 400, error: "Project ID is required" };
        }

        const user = await currentUser();
        if (!user) {
          return { status: 403, error: "User not authenticated" };
        }

        const userExist = await ctx.db.user.findUnique({
          where: { clerkId: user.id },
        });

        if (!userExist || !userExist.subscription) {
          return {
            status: 403,
            error: !userExist?.subscription
              ? "User does not have an active subscription"
              : "User not found in the database",
          };
        }

        const project = await ctx.db.project.findUnique({
          where: { id: input.projectId, isDeleted: false },
        });

        if (!project) {
          return { status: 404, error: "Project not found" };
        }

        if (!project.outlines || project.outlines.length === 0) {
          return { status: 400, error: "Project does not have any outlines" };
        }

        const layouts = await generateLayoutsJson(project.outlines);

        if (layouts.status !== 200) {
          console.log(`🔴 Error in generateLayoutsJson: ${layouts.error}`);
          return {
            status: layouts.status,
            error: layouts.error || "Failed to generate layouts",
            data: [],
          };
        }

        await ctx.db.project.update({
          where: { id: input.projectId },
          data: { slides: layouts.data, themeName: input.theme },
        });

        return { status: 200, data: layouts.data };
      } catch (error) {
        console.error("🔴 ERROR:", error);
        return { status: 500, error: "Internal server error", data: [] };
      }
    }),
});

async function generateLayoutsJson(outlineArray: string[]): Promise<{
  status: number;
  data?: Array<{
    id: string;
    slideName: string;
    type: string;
    slideOrder: number;
    content: {
      id: string;
      type: ContentType;
      name: string;
      content: Array<{
        id: string;
        type: ContentType;
        name: string;
        content: string;
        placeholder: string;
      }>;
      className: string;
      placeholder: string;
    };
    className: string;
  }>;
  error?: string;
}> {
  try {
    const layouts = outlineArray.map((outline, index) => ({
      id: uuidv4(),
      slideName: outline,
      type: "title-content",
      slideOrder: index + 1,
      content: {
        id: uuidv4(),
        type: "column" as ContentType,
        name: "Column",
        content: [
          {
            id: uuidv4(),
            type: "heading1" as ContentType,
            name: "Heading1",
            content: outline,
            placeholder: "Heading1",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "start typing here",
          },
        ],
        className: "w-full h-full p-8 flex justify-center items-center",
        placeholder: "Heading1",
      },
      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    }));

    return { status: 200, data: layouts };
  } catch {
    return { status: 500, error: "Failed to generate layouts" };
  }
}
