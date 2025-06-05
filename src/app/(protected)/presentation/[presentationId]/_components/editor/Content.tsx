"use client";
import type { ContentItem } from "@/lib/types";
import React from "react";
import {
  ColumnRenderer,
  ResizableColumnRenderer,
} from "./content/ColumnRenderers";
import type { ContentRendererProps } from "./content/ContentBase";
import ContentRendererFactory from "./content/ContentRendererFactory";

type Props = {
  content: ContentItem;
  onContentChange: (
    newContent: string | string[] | string[][],
    contentId: string,
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId?: string;
  index?: number;
};

/**
 * Main content renderer component - now much cleaner and focused
 */
const Content: React.FC<Props> = React.memo(
  ({
    content,
    onContentChange,
    isPreview = false,
    isEditable = true,
    slideId,
    index,
  }) => {
    const contentProps: ContentRendererProps = {
      content,
      onContentChange,
      isPreview,
      isEditable,
      slideId,
      index,
    };

    // Handle layout types that need special recursive handling
    if (content.type === "column") {
      return (
        <ColumnRenderer
          {...contentProps}
          renderContent={(props) => <MasterRecursiveComponent {...props} />}
        />
      );
    }

    if (content.type === "resizable-column") {
      return <ResizableColumnRenderer {...contentProps} />;
    }

    // Use factory for all other content types
    return ContentRendererFactory.render(contentProps);
  },
);

Content.displayName = "ContentRenderer";

/**
 * Recursive component wrapper for handling nested content
 */
export const MasterRecursiveComponent: React.FC<Props> = React.memo(
  ({
    content,
    onContentChange,
    slideId,
    index,
    isPreview = false,
    isEditable = true,
  }) => {
    return (
      <Content
        content={content}
        onContentChange={onContentChange}
        isPreview={isPreview}
        isEditable={isEditable}
        slideId={slideId}
        index={index}
      />
    );
  },
);

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";

export default Content;
