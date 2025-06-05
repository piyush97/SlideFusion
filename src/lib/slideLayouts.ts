import { SlideLayoutFactory } from "./factories/slideLayoutFactory";
import type { LayoutSlides } from "./types";

// Create layouts using the factory methods for consistency and maintainability
export const BlankCard: LayoutSlides = {
  slideName: "Blank card",
  type: "blank-card",
  className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  content: SlideLayoutFactory.createBasicLayout(),
};

export const ImageAndText: LayoutSlides = {
  slideName: "Image and text",
  type: "imageAndText",
  className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createImageAndTextLayout(true),
};

export const TextAndImage: LayoutSlides = {
  slideName: "Text and image",
  type: "textAndImage",
  className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createImageAndTextLayout(false),
};

export const AccentLeft: LayoutSlides = {
  slideName: "Accent Left",
  type: "accentLeft",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createAccentLayout("left"),
};

export const AccentRight: LayoutSlides = {
  slideName: "Accent Right",
  type: "accentRight",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createAccentLayout("right"),
};

export const TwoColumns: LayoutSlides = {
  slideName: "Two columns",
  type: "twoColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createTwoColumnLayout(),
};

export const TwoColumnsWithHeadings: LayoutSlides = {
  slideName: "Two columns with headings",
  type: "twoColumnsWithHeadings",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createTwoColumnsWithHeadingsLayout(),
};

export const ThreeColumns: LayoutSlides = {
  slideName: "Three columns",
  type: "threeColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createThreeColumnLayout(),
};

export const ThreeColumnsWithHeadings: LayoutSlides = {
  slideName: "Three columns with headings",
  type: "threeColumnsWithHeadings",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createThreeColumnLayout(),
};

export const FourColumns: LayoutSlides = {
  slideName: "Four columns",
  type: "fourColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createFourColumnLayout(),
};

export const TwoImageColumns: LayoutSlides = {
  slideName: "Two image columns",
  type: "twoImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createImageColumnLayout(2),
};

export const ThreeImageColumns: LayoutSlides = {
  slideName: "Three image columns",
  type: "threeImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createImageColumnLayout(3),
};

export const FourImageColumns: LayoutSlides = {
  slideName: "Four image columns",
  type: "fourImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: SlideLayoutFactory.createImageColumnLayout(4),
};

export const TableLayout: LayoutSlides = {
  slideName: "Table Layout",
  type: "tableLayout",
  className:
    "p-8 mx-auto flex flex-col justify-center items-center min-h-[400px]",
  content: SlideLayoutFactory.createTableLayout(),
};
