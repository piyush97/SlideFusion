import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

// Base wrapper component for all rendered content
interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className,
  animate = true,
}) => {
  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <motion.div className={cn("w-full h-full", className)} {...animateProps}>
      {children}
    </motion.div>
  );
};

// Common props interface for content components
export interface ContentRendererProps {
  content: ContentItem;
  onContentChange: (
    newContent: string | string[] | string[][],
    contentId: string,
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId?: string;
  index?: number;
}

// Common props for simple text components
export interface CommonTextProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isPreview?: boolean;
}

// Hook for generating common text component props
export const useCommonTextProps = (
  content: ContentItem,
  onContentChange: ContentRendererProps["onContentChange"],
  isPreview: boolean = false,
): CommonTextProps => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onContentChange(e.target.value, content.id);
    },
    [content.id, onContentChange],
  );

  return {
    placeholder: content.placeholder,
    value: content.content as string,
    onChange: handleChange,
    isPreview,
  };
};
