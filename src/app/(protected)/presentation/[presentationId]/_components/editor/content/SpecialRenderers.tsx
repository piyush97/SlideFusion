import BlockQuote from "@/components/global/editor/components/BlockQuote";
import CalloutBox from "@/components/global/editor/components/CalloutBox";
import CodeBlock from "@/components/global/editor/components/CodeBlock";
import Divider from "@/components/global/editor/components/Divider";
import Paragraph from "@/components/global/editor/components/Paragraph";
import TableOfContents from "@/components/global/editor/components/TableOfContents";
import { cn } from "@/lib/utils";
import type React from "react";
import {
  type ContentRendererProps,
  ContentWrapper,
  useCommonTextProps,
} from "./ContentBase";

// Block quote renderer
export const BlockQuoteRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
  isPreview = false,
}) => {
  const commonProps = useCommonTextProps(content, onContentChange, isPreview);

  return (
    <ContentWrapper>
      <BlockQuote>
        <Paragraph {...commonProps} />
      </BlockQuote>
    </ContentWrapper>
  );
};

// Callout box renderer
export const CalloutBoxRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
  isPreview = false,
}) => {
  const commonProps = useCommonTextProps(content, onContentChange, isPreview);

  return (
    <ContentWrapper className={cn("w-full h-full")}>
      <CalloutBox
        type={content.callOutType || "info"}
        className={content.className}
      >
        <Paragraph {...commonProps} />
      </CalloutBox>
    </ContentWrapper>
  );
};

// Code block renderer
export const CodeBlockRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
}) => {
  return (
    <ContentWrapper>
      <CodeBlock
        code={content.code}
        language={content.language}
        onChange={(newCode) => onContentChange(newCode, content.id)}
        className={content.className}
      />
    </ContentWrapper>
  );
};

// Table of contents renderer
export const TableOfContentsRenderer: React.FC<ContentRendererProps> = ({
  content,
}) => {
  const handleItemClick = (id: string) => {
    console.log(`Navigate to section: ${id}`);
  };

  return (
    <ContentWrapper>
      <TableOfContents
        items={content.content as string[]}
        onItemClick={handleItemClick}
        className={content.className}
      />
    </ContentWrapper>
  );
};

// Divider renderer
export const DividerRenderer: React.FC<ContentRendererProps> = ({
  content,
}) => {
  return (
    <ContentWrapper className={cn("w-full h-full border-b", content.className)}>
      <Divider className={content.className} />
    </ContentWrapper>
  );
};

BlockQuoteRenderer.displayName = "BlockQuoteRenderer";
CalloutBoxRenderer.displayName = "CalloutBoxRenderer";
CodeBlockRenderer.displayName = "CodeBlockRenderer";
TableOfContentsRenderer.displayName = "TableOfContentsRenderer";
DividerRenderer.displayName = "DividerRenderer";
