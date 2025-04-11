"use client";
import ColumnComponent from "@/components/global/editor/components/ColumnComponent";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/Headings";
import ImageComponent from "@/components/global/editor/components/ImageComponent";
import Paragraph from "@/components/global/editor/components/Paragraph";
import TableComponent from "@/components/global/editor/components/TableComponent";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useCallback } from "react";
import DropZone from "./DropZone";

type Props = {
  content: ContentItem;
  onContentChange: (
    newContent: string | string[] | string[][],
    contentId: string
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId?: string;
  index?: number;
};

const Content: React.FC<Props> = React.memo(
  ({
    content,
    onContentChange,
    isPreview = false,
    isEditable = false,
    slideId,
    index,
  }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animateProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        );

      case "heading2":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <Heading2 {...commonProps} />
          </motion.div>
        );

      case "heading3":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <Heading3 {...commonProps} />
          </motion.div>
        );

      case "heading4":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <Heading4 {...commonProps} />
          </motion.div>
        );

      case "title":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <Title {...commonProps} />
          </motion.div>
        );

      case "paragraph":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <Paragraph {...commonProps} />
          </motion.div>
        );

      case "table":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <TableComponent
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(
                  newContent !== null ? newContent : "",
                  content.id
                )
              }
              isPreview={isPreview}
              isEditable={isEditable}
              initialColumnSize={content.initialColumns}
              initialRowSize={content.initialRows}
            />
          </motion.div>
        );

      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div className="w-full h-full" {...animateProps}>
              <ColumnComponent
                content={content.content as ContentItem[]}
                onContentChange={onContentChange}
                className={content.className}
                isPreview={isPreview}
                isEditable={isEditable}
                slideId={slideId || ""}
              />
            </motion.div>
          );
        }
        return null;

      case "image":
        return (
          <motion.div className="w-full h-full" {...animateProps}>
            <ImageComponent
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );

      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              className={cn("w-full h-full flex flex-col", content.className)}
              {...animateProps}
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
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        isPreview={isPreview}
                        isEditable={isEditable}
                        slideId={slideId}
                        index={subIndex}
                      />
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
                <DropZone
                  index={0}
                  parentId={content.id}
                  slideId={slideId || ""}
                />
              ) : null}
            </motion.div>
          );
        }
        return null;

      default:
        return null;
    }
  }
);

Content.displayName = "ContentRenderer";

export const MasterRecursiveComponent: React.FC<Props> = React.memo(
  ({
    content,
    onContentChange,
    slideId,
    index,
    isPreview = false,
    isEditable = true,
  }) => {
    if (isPreview) {
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
    }
    return (
      <React.Fragment>
        <Content
          content={content}
          onContentChange={onContentChange}
          isPreview={isPreview}
          isEditable={isEditable}
          slideId={slideId}
          index={index}
        />
      </React.Fragment>
    );
  }
);
MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
