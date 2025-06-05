"use client";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
  placeholder?: string;
}

const Paragraph = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, styles, isPreview, ...props }: Props, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
      const textarea = textAreaRef.current;
      if (textarea && isPreview) {
        const adjustHeight = () => {
          textarea.style.height = "0";
          textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener("input", adjustHeight);
        adjustHeight();
        return () => textarea.removeEventListener("input", adjustHeight);
      }
    }, [isPreview]);
    return (
      <Textarea
        ref={(el) => {
          (textAreaRef.current as HTMLTextAreaElement | null) = el;

          if (typeof ref === "function") ref(el);
          else if (ref)
            (
              ref as React.MutableRefObject<HTMLTextAreaElement | null>
            ).current = el;
        }}
        className={cn(
          `w-full bg-transparent font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight`,
          `${isPreview ? "text-[0.5rem]" : "text-lg"}`,
          className,
        )}
        readOnly={isPreview}
        style={{
          padding: 0,
          margin: 0,
          color: "inherit",
          boxSizing: "content-box",
          lineHeight: "1.5em",
          minHeight: "1.5em",
          ...styles,
        }}
        {...props}
      />
    );
  },
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
