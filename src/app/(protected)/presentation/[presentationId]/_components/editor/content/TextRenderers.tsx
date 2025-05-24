import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/Headings";
import Paragraph from "@/components/global/editor/components/Paragraph";
import React from "react";
import {
  ContentRendererProps,
  ContentWrapper,
  useCommonTextProps,
} from "./ContentBase";

// Heading renderers
export const HeadingRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
  isPreview = false,
}) => {
  const commonProps = useCommonTextProps(content, onContentChange, isPreview);

  const getHeadingComponent = () => {
    switch (content.type) {
      case "heading1":
        return <Heading1 {...commonProps} />;
      case "heading2":
        return <Heading2 {...commonProps} />;
      case "heading3":
        return <Heading3 {...commonProps} />;
      case "heading4":
        return <Heading4 {...commonProps} />;
      case "title":
        return <Title {...commonProps} />;
      default:
        return null;
    }
  };

  return <ContentWrapper>{getHeadingComponent()}</ContentWrapper>;
};

// Text content renderer
export const TextRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
  isPreview = false,
}) => {
  const commonProps = useCommonTextProps(content, onContentChange, isPreview);

  return (
    <ContentWrapper>
      <Paragraph {...commonProps} />
    </ContentWrapper>
  );
};

HeadingRenderer.displayName = "HeadingRenderer";
TextRenderer.displayName = "TextRenderer";
