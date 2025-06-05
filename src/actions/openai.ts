"use server";

import { client } from "@/lib/prisma";
import { ContentItem, ContentType, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCreativePrompt = async (userPrompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const finalPrompt = `
    Create a coherent and relevant outline for the following prompt: ${userPrompt}.
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
      model: "chatgpt-4o-latest",
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
        console.error("Invalid JSON received:", cleanedResponseContent, error);
        return { status: 500, error: "Invalid JSON format received from AI" };
      }
    }

    return { status: 400, error: "No content generated" };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const generateImageUrl = async (prompt: string): Promise<string> => {
  console.log("🎨 Starting image generation for prompt:", prompt);

  try {
    const improvedPrompt = `
    Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

    Description: ${prompt}

    Important Notes:
    - The image must be in a photorealistic style and visually compelling.
    - Ensure all text, signs, or visible writing in the image are in English.
    - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
    - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
    - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.

    Example Use Cases: Business presentations, educational slides, professional designs.
  `;

    console.log("🎨 Calling DALL-E API...");
    const dalleResponse = await openai.images.generate({
      prompt: improvedPrompt,
      n: 1,
      size: "1024x1024",
      model: "dall-e-3",
      quality: "standard",
    });

    if (dalleResponse.data && dalleResponse.data.length > 0) {
      const generatedUrl =
        dalleResponse.data[0]?.url || "https://via.placeholder.com/1024";
      console.log("🎨 Image generated successfully:", generatedUrl);
      return generatedUrl;
    }

    console.log("🎨 No image data returned, using placeholder");
    return "https://via.placeholder.com/1024";
  } catch (error) {
    console.error("🎨 Failed to generate image:", error);
    return "https://via.placeholder.com/1024";
  }
};

const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = [];
  if (layout.type === "image") {
    images.push(layout);
  }
  if (Array.isArray(layout.content)) {
    layout.content.forEach((child: ContentItem | string | string[]) => {
      if (typeof child === "object" && !Array.isArray(child)) {
        images.push(...findImageComponents(child as ContentItem));
      }
    });
  } else if (
    layout.content &&
    typeof layout.content === "object" &&
    !Array.isArray(layout.content)
  ) {
    images.push(...findImageComponents(layout.content));
  }
  return images;
};

const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);
  console.log("� Found image components:", imageComponents.length);
  console.log(
    "🔍 Image components details:",
    imageComponents.map((c) => ({ id: c.id, alt: c.alt, content: c.content })),
  );

  for (const component of imageComponents) {
    console.log("� Generating image for component:", component.alt);
    const originalContent = component.content;
    const generatedUrl = await generateImageUrl(
      component.alt || "Placeholder Image",
    );
    component.content = generatedUrl;
    console.log("🔥 Image generation result:", {
      original: originalContent,
      generated: generatedUrl,
      alt: component.alt,
    });
  }
};

export const generateLayoutsJson = async (outlineArray: string[]) => {
  const prompt = `### Guidelines
You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

Use these outlines as a starting point for the content of the presentations
  ${JSON.stringify(outlineArray)}

The output must be an array of JSON objects.
  1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
  2. Ensuring each layout is unique.
  3. Adhere to the structure of existing layouts
  4. Fill placeholder data into content fields where required.
  5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
  6. Ensure proper formatting and schema alignment for the output JSON.
7. First create LAYOUTS TYPES  at the top most level of the JSON output as follows ${JSON.stringify(
    [
      {
        slideName: "Blank card",
        type: "blank-card",
        className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
        content: {},
      },
    ],
  )}

8.The content property of each LAYOUTS TYPE should start with “column” and within the columns content property you can use any  of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string.Here is an example of what 1 layout with 1 column with 1 title inside would look like:
${JSON.stringify([
  {
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },
])}


9. Here is a final example of an example output for you to get an idea
${JSON.stringify([
  {
    id: uuidv4(),
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Accent left",
    type: "accentLeft",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      restrictDropTo: true,
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
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
          ],
        },
      ],
    },
  },
])}

 For Images
  - The alt text should describe the image clearly and concisely.
  - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
  - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
  - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

  Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
`;

  //   `
  //   You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the existing layouts as examples for structure and design, and generate unique designs based on the provided outline.

  //   ### Guidelines:
  //   1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
  //   2. Use diverse and engaging designs, ensuring each layout is unique.
  //   3. Adhere to the structure of existing layouts but add new styles or components if needed.
  //   4. Fill placeholder data into content fields where required.
  //   5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
  //   6. Ensure proper formatting and schema alignment for the output JSON.

  //   ### Example Layouts:
  //   ${JSON.stringify(existingLayouts, null, 2)}

  //   ### Outline Array:
  //   ${JSON.stringify(outlineArray)}

  //   For each entry in the outline array, generate:
  //   - A unique JSON layout with creative designs.
  //   - Properly filled content, including placeholders for image components.
  //   - Clear and well-structured JSON data.
  //   For Images
  //   - The alt text should describe the image clearly and concisely.
  //   - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
  //   - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
  //   - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

  //   Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
  // `

  try {
    console.log("🟢 Generating layouts...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-11-20",
      messages: [
        {
          role: "system",
          content: "You generate JSON layouts for presentations.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 5000,
      temperature: 0.7,
    });

    const responseContent = completion?.choices?.[0]?.message?.content;

    if (!responseContent) {
      return { status: 400, error: "No content generated" };
    }

    let jsonResponse;
    try {
      // More robust JSON extraction and parsing
      const jsonContent = responseContent.trim();
      let jsonString = jsonContent;

      // Try to extract JSON if it's wrapped in text
      const jsonMatch = jsonContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }

      console.log("🟢 Attempting to parse JSON");
      jsonResponse = JSON.parse(jsonString);

      if (!Array.isArray(jsonResponse)) {
        throw new Error("Response is not an array as expected");
      }

      console.log(
        "🔍 Generated layouts before image replacement:",
        jsonResponse.length,
      );
      console.log(
        "🔍 Sample layout structure:",
        JSON.stringify(jsonResponse[0], null, 2),
      );

      // Count image components before replacement
      const imageCountBefore = jsonResponse.reduce((count, layout) => {
        return count + findImageComponents(layout.content).length;
      }, 0);
      console.log(
        "🔍 Total image components found across all layouts:",
        imageCountBefore,
      );

      await Promise.all(jsonResponse.map(replaceImagePlaceholders));

      // Count and log after replacement
      const imageCountAfter = jsonResponse.reduce((count, layout) => {
        return count + findImageComponents(layout.content).length;
      }, 0);
      console.log("🔍 Image components processed:", imageCountAfter);
    } catch (error) {
      console.log("🔴 ERROR parsing JSON:", error);
      console.log("🔴 Raw response content:", responseContent);

      // Return error instead of throwing to allow graceful handling
      return {
        status: 400,
        error: "Invalid JSON format received from AI. Please try again.",
      };
    }

    console.log("🟢 Layouts generated successfully");
    return { status: 200, data: jsonResponse };
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return { status: 500, error: "Internal server error" };
  }
};

export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return { status: 400, error: "Project ID is required" };
    }
    const user = await currentUser();
    if (!user) {
      return { status: 403, error: "User not authenticated" };
    }

    const userExist = await client.user.findUnique({
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

    const project = await client.project.findUnique({
      where: { id: projectId, isDeleted: false },
    });

    if (!project) {
      return { status: 404, error: "Project not found" };
    }

    if (!project.outlines || project.outlines.length === 0) {
      return { status: 400, error: "Project does not have any outlines" };
    }

    const layouts = await generateLayoutsJson(project.outlines);

    if (layouts.status !== 200) {
      // Better error logging and returning the specific error
      console.log(`🔴 Error in generateLayoutsJson: ${layouts.error}`);
      return {
        status: layouts.status,
        error: layouts.error || "Failed to generate layouts",
        data: [], // Return empty array to avoid null errors
      };
    }

    // Generate images for all slides
    console.log("🟢 Generating images for slides...");
    try {
      if (layouts.data && Array.isArray(layouts.data)) {
        for (const slide of layouts.data) {
          await replaceImagePlaceholders(slide);
        }
        console.log("🟢 Images generated successfully for all slides");
      }
    } catch (error) {
      console.error("🔴 Error generating images:", error);
      // Continue without failing the entire process
    }

    await client.project.update({
      where: { id: projectId },
      data: { slides: layouts.data, themeName: theme },
    });

    return { status: 200, data: layouts.data };
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return { status: 500, error: "Internal server error", data: [] };
  }
};

export const generateImagesForSlide = async (slide: Slide) => {
  try {
    console.log("🖼️ Starting image generation for slide:", slide.id);

    // Create a copy of the slide to avoid modifying the original
    const slideWithImages = JSON.parse(JSON.stringify(slide));

    // Generate images for this slide
    await replaceImagePlaceholders(slideWithImages);

    console.log("✅ Successfully generated images for slide");
    return { success: true, slide: slideWithImages };
  } catch (error) {
    console.error("❌ Error generating images for slide:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
