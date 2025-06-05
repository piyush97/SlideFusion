import ImageComponent from "@/components/global/editor/components/ImageComponent";
import TableComponent from "@/components/global/editor/components/TableComponent";
import type React from "react";
import { type ContentRendererProps, ContentWrapper } from "./ContentBase";

// Table renderer
export const TableRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
  isPreview = false,
  isEditable = true,
}) => {
  return (
    <ContentWrapper>
      <TableComponent
        content={content.content as string[][]}
        onChange={(newContent) =>
          onContentChange(newContent !== null ? newContent : "", content.id)
        }
        isPreview={isPreview}
        isEditable={isEditable}
        initialColumnSize={content.initialColumns}
        initialRowSize={content.initialRows}
      />
    </ContentWrapper>
  );
};

// Image renderer
export const ImageRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
  isPreview = false,
  isEditable = true,
}) => {
  return (
    <ContentWrapper>
      <ImageComponent
        src={content.content as string}
        alt={content.alt || "image"}
        className={content.className}
        isPreview={isPreview}
        contentId={content.id}
        onContentChange={onContentChange}
        isEditable={isEditable}
      />
    </ContentWrapper>
  );
};

TableRenderer.displayName = "TableRenderer";
ImageRenderer.displayName = "ImageRenderer";
