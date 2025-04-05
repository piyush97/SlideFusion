"use client";
import { Heading1 } from "@/components/global/editor/components/Headings";
import { ContentItem } from "@/lib/types";
import { motion } from "motion/react";
import React, { useCallback } from "react";

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
          <motion.div className="w-full h-full">
            <Heading1 {...commonProps} />
          </motion.div>
        );
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
