import ColumnComponent from "@/components/global/editor/components/ColumnComponent";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import DropZone from "../DropZone";
import { ContentRendererProps, ContentWrapper } from "./ContentBase";

// Forward declaration to avoid circular dependency
interface RecursiveContentProps extends ContentRendererProps {
  renderContent: (props: ContentRendererProps) => React.ReactElement | null;
}

// Column renderer
export const ColumnRenderer: React.FC<RecursiveContentProps> = ({
  content,
  onContentChange,
  isPreview = false,
  isEditable = true,
  slideId,
  renderContent,
}) => {
  if (!Array.isArray(content.content)) {
    return null;
  }

  return (
    <ContentWrapper
      className={cn("w-full h-full flex flex-col", content.className)}
    >
      {content.content.length > 0 ? (
        (content.content as ContentItem[]).map(
          (subItem: ContentItem, subIndex: number) => (
            <React.Fragment key={subItem.id || `item-${subIndex}`}>
              {!isPreview &&
                !subItem.restrictToDrop &&
                subIndex === 0 &&
                isEditable && (
                  <DropZone
                    index={0}
                    parentId={content.id}
                    slideId={slideId || ""}
                  />
                )}
              {renderContent({
                content: subItem,
                onContentChange,
                isPreview,
                isEditable,
                slideId,
                index: subIndex,
              })}
              {!isPreview && !subItem.restrictToDrop && isEditable && (
                <DropZone
                  index={subIndex + 1}
                  parentId={content.id}
                  slideId={slideId || ""}
                />
              )}
            </React.Fragment>
          )
        )
      ) : isEditable ? (
        <DropZone index={0} parentId={content.id} slideId={slideId || ""} />
      ) : null}
    </ContentWrapper>
  );
};

// Resizable column renderer
export const ResizableColumnRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
  isPreview = false,
  isEditable = true,
  slideId,
}) => {
  if (!Array.isArray(content.content)) {
    return null;
  }

  return (
    <ContentWrapper>
      <ColumnComponent
        content={content.content as ContentItem[]}
        onContentChange={onContentChange}
        className={content.className}
        isPreview={isPreview}
        isEditable={isEditable}
        slideId={slideId || ""}
      />
    </ContentWrapper>
  );
};

ColumnRenderer.displayName = "ColumnRenderer";
ResizableColumnRenderer.displayName = "ResizableColumnRenderer";
