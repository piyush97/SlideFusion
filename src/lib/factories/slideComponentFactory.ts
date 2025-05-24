import { v4 as uuidv4 } from "uuid";
import { ContentItem, ContentType } from "../types";

/**
 * Factory for creating slide components with consistent structure
 */
export class SlideComponentFactory {
  private static defaultPlaceholderImage =
    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  /**
   * Creates a basic heading component
   */
  static createHeading(
    level: 1 | 2 | 3 | 4,
    content: string = "",
    placeholder?: string
  ): ContentItem {
    return {
      id: uuidv4(),
      type: `heading${level}` as ContentType,
      name: `Heading${level}`,
      content,
      placeholder: placeholder || `Heading ${level}`,
    };
  }

  /**
   * Creates a paragraph component
   */
  static createParagraph(
    content: string = "",
    placeholder: string = "Start typing..."
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "paragraph" as ContentType,
      name: "Paragraph",
      content,
      placeholder,
    };
  }

  /**
   * Creates an image component
   */
  static createImage(
    src: string = SlideComponentFactory.defaultPlaceholderImage,
    alt: string = "Image",
    className: string = "p-3"
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "image" as ContentType,
      name: "Image",
      content: src,
      alt,
      className,
    };
  }

  /**
   * Creates a title component
   */
  static createTitle(
    content: string = "",
    placeholder: string = "Untitled Card"
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "title" as ContentType,
      name: "Title",
      content,
      placeholder,
    };
  }

  /**
   * Creates a column component with nested content
   */
  static createColumn(
    content: ContentItem[] = [],
    className?: string
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content,
      className,
    };
  }

  /**
   * Creates a resizable column component
   */
  static createResizableColumn(
    content: ContentItem[] = [],
    className: string = "border"
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "resizable-column" as ContentType,
      name: "Text and image",
      content,
      className,
    };
  }

  /**
   * Creates a standard image + text column combination
   */
  static createImageTextColumn(
    headingText: string = "",
    paragraphText: string = "",
    imageSrc?: string
  ): ContentItem {
    return SlideComponentFactory.createColumn([
      SlideComponentFactory.createImage(imageSrc),
      SlideComponentFactory.createHeading(3, headingText),
      SlideComponentFactory.createParagraph(paragraphText),
    ]);
  }

  /**
   * Creates a standard text + image column combination
   */
  static createTextImageColumn(
    headingText: string = "",
    paragraphText: string = "",
    imageSrc?: string
  ): ContentItem {
    return SlideComponentFactory.createColumn([
      SlideComponentFactory.createHeading(3, headingText),
      SlideComponentFactory.createParagraph(paragraphText),
      SlideComponentFactory.createImage(imageSrc),
    ]);
  }

  /**
   * Creates a table component
   */
  static createTable(
    initialRows: number = 2,
    initialColumns: number = 2
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "table" as ContentType,
      name: "Table",
      initialRows,
      initialColumns,
      content: [],
    };
  }

  /**
   * Creates a list component
   */
  static createList(
    type: "numberedList" | "bulletList" | "todoList",
    items: string[] = []
  ): ContentItem {
    const defaultItems = {
      numberedList: ["First item", "Second item", "Third item"],
      bulletList: ["First item", "Second item", "Third item"],
      todoList: ["[ ] Task 1", "[ ] Task 2", "[ ] Task 3"],
    };

    return {
      id: uuidv4(),
      type: type as ContentType,
      name:
        type === "numberedList"
          ? "Numbered List"
          : type === "bulletList"
          ? "Bullet List"
          : "Todo List",
      content: items.length > 0 ? items : defaultItems[type],
    };
  }

  /**
   * Creates a callout box component
   */
  static createCalloutBox(
    callOutType:
      | "success"
      | "warning"
      | "info"
      | "question"
      | "caution" = "info",
    content: string = "This is a callout box"
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "calloutBox" as ContentType,
      name: "Callout Box",
      content,
      callOutType,
    };
  }

  /**
   * Creates a code block component
   */
  static createCodeBlock(
    code: string = "console.log('Hello World!');",
    language: string = "javascript"
  ): ContentItem {
    return {
      id: uuidv4(),
      type: "codeBlock" as ContentType,
      name: "Code Block",
      content: code,
      language,
    };
  }
}
