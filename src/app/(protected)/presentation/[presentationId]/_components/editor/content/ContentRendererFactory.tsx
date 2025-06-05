import type React from "react";
import type { ContentRendererProps } from "./ContentBase";
import { ListRenderer } from "./ListRenderers";
import { ImageRenderer, TableRenderer } from "./MediaRenderers";
import {
  BlockQuoteRenderer,
  CalloutBoxRenderer,
  CodeBlockRenderer,
  DividerRenderer,
  TableOfContentsRenderer,
} from "./SpecialRenderers";
import { HeadingRenderer, TextRenderer } from "./TextRenderers";

/**
 * Content renderer factory that routes content types to appropriate renderers
 */
export class ContentRendererFactory {
  /**
   * Renders content based on its type using the appropriate renderer
   */
  static render(props: ContentRendererProps): React.ReactElement | null {
    const { content } = props;

    // Text-based content
    if (ContentRendererFactory.isHeadingType(content.type)) {
      return <HeadingRenderer {...props} />;
    }

    if (content.type === "paragraph") {
      return <TextRenderer {...props} />;
    }

    // List content
    if (ContentRendererFactory.isListType(content.type)) {
      return <ListRenderer {...props} />;
    }

    // Media content
    if (content.type === "table") {
      return <TableRenderer {...props} />;
    }

    if (content.type === "image") {
      return <ImageRenderer {...props} />;
    }

    // Special content
    if (content.type === "blockquote") {
      return <BlockQuoteRenderer {...props} />;
    }

    if (content.type === "calloutBox") {
      return <CalloutBoxRenderer {...props} />;
    }

    if (content.type === "codeBlock") {
      return <CodeBlockRenderer {...props} />;
    }

    if (content.type === "tableOfContents") {
      return <TableOfContentsRenderer {...props} />;
    }

    if (content.type === "divider") {
      return <DividerRenderer {...props} />;
    }

    // Layout content will be handled by the main Content component
    // to avoid circular dependencies

    return null;
  }

  /**
   * Check if the content type is a heading type
   */
  private static isHeadingType(type: string): boolean {
    return ["heading1", "heading2", "heading3", "heading4", "title"].includes(
      type,
    );
  }

  /**
   * Check if the content type is a list type
   */
  private static isListType(type: string): boolean {
    return ["numberedList", "bulletedList", "todoList"].includes(type);
  }

  /**
   * Check if the content type is a layout type
   */
  static isLayoutType(type: string): boolean {
    return ["column", "resizable-column"].includes(type);
  }

  /**
   * Get all supported content types
   */
  static getSupportedTypes(): string[] {
    return [
      "heading1",
      "heading2",
      "heading3",
      "heading4",
      "title",
      "paragraph",
      "numberedList",
      "bulletedList",
      "todoList",
      "table",
      "image",
      "blockquote",
      "calloutBox",
      "codeBlock",
      "tableOfContents",
      "divider",
      "column",
      "resizable-column",
    ];
  }
}

export default ContentRendererFactory;
