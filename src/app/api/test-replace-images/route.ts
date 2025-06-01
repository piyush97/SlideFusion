import { SlideComponentFactory } from "@/lib/factories/slideComponentFactory";
import { ContentItem, Slide } from "@/lib/types";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Import the replaceImagePlaceholders function - we need to copy it since it's not exported
const generateImageUrl = async (): Promise<string> => {
  const response = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/test-image`
  );
  const data = await response.json();
  return data.imageUrl || "https://via.placeholder.com/1024";
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
  console.log("🔍 Found image components:", imageComponents.length);
  console.log(
    "🔍 Image components details:",
    imageComponents.map((c) => ({ id: c.id, alt: c.alt, content: c.content }))
  );

  for (const component of imageComponents) {
    console.log("🔥 Generating image for component:", component.alt);
    const originalContent = component.content;
    const generatedUrl = await generateImageUrl();
    component.content = generatedUrl;
    console.log("🔥 Image generation result:", {
      original: originalContent,
      generated: generatedUrl,
      alt: component.alt,
    });
  }
};

export async function GET() {
  try {
    console.log("🧪 Testing replaceImagePlaceholders...");

    // Create a test slide with an image component
    const testSlide: Slide = {
      id: uuidv4(),
      slideName: "Test Slide",
      type: "basic",
      slideOrder: 0,
      className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
      content: {
        id: uuidv4(),
        type: "column",
        name: "Column",
        content: [
          SlideComponentFactory.createTitle("Test Title"),
          SlideComponentFactory.createImage(
            "https://via.placeholder.com/1024",
            "A test business meeting"
          ),
          SlideComponentFactory.createParagraph("Test paragraph"),
        ],
      },
    };

    console.log("🧪 Original slide:", JSON.stringify(testSlide, null, 2));

    await replaceImagePlaceholders(testSlide);

    console.log("🧪 Modified slide:", JSON.stringify(testSlide, null, 2));

    return NextResponse.json({
      success: true,
      slide: testSlide,
      message: "replaceImagePlaceholders test completed",
    });
  } catch (error) {
    console.error("🧪 Test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
