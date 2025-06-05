import {
  BlankCardIcon,
  FourColumnsIcon,
  FourImageColumnsIcon,
  ImageAndTextIcon,
  TextAndImageIcon,
  ThreeColumnsIcon,
  ThreeColumnsWithHeadingsIcon,
  ThreeImageColumnsIcon,
  TwoColumnsIcon,
  TwoColumnsWithHeadingsIcon,
  TwoImageColumnsIcon,
} from "@/components/global/editor/components/IconsComponent";
import {
  AccentLeft,
  AccentRight,
  BlankCard,
  FourColumns,
  FourImageColumns,
  ImageAndText,
  TextAndImage,
  ThreeColumns,
  ThreeColumnsWithHeadings,
  ThreeImageColumns,
  TwoColumns,
  TwoColumnsWithHeadings,
  TwoImageColumns,
} from "@/lib/slideLayouts";
import type { LayoutGroup } from "@/lib/types";

export const LAYOUT_GROUPS: LayoutGroup[] = [
  {
    name: "Basic",
    layouts: [
      {
        name: "Blank card",
        icon: BlankCardIcon,
        type: "layout",
        component: BlankCard,
        layoutType: "blank-card",
      },
      {
        name: "Image and text",
        icon: ImageAndTextIcon,
        type: "layout",
        component: ImageAndText,
        layoutType: "imageAndText",
      },
      {
        name: "Text and image",
        icon: TextAndImageIcon,
        type: "layout",
        component: TextAndImage,
        layoutType: "textAndImage",
      },
      {
        name: "Accent Left",
        icon: ImageAndTextIcon,
        type: "layout",
        component: AccentLeft,
        layoutType: "accentLeft",
      },
      {
        name: "Accent Right",
        icon: TextAndImageIcon,
        type: "layout",
        component: AccentRight,
        layoutType: "accentRight",
      },
    ],
  },
  {
    name: "Columns",
    layouts: [
      {
        name: "Two columns",
        icon: TwoColumnsIcon,
        type: "layout",
        component: TwoColumns,
        layoutType: "twoColumns",
      },
      {
        name: "Two columns with headings",
        icon: TwoColumnsWithHeadingsIcon,
        type: "layout",
        component: TwoColumnsWithHeadings,
        layoutType: "twoColumnsWithHeadings",
      },
      {
        name: "Three columns",
        icon: ThreeColumnsIcon,
        type: "layout",
        component: ThreeColumns,
        layoutType: "threeColumns",
      },
      {
        name: "Three columns with headings",
        icon: ThreeColumnsWithHeadingsIcon,
        type: "layout",
        component: ThreeColumnsWithHeadings,
        layoutType: "threeColumnsWithHeadings",
      },
      {
        name: "Four columns",
        icon: FourColumnsIcon,
        type: "layout",
        component: FourColumns,
        layoutType: "fourColumns",
      },
    ],
  },
  {
    name: "Image Grids",
    layouts: [
      {
        name: "Two image columns",
        icon: TwoImageColumnsIcon,
        type: "layout",
        component: TwoImageColumns,
        layoutType: "twoImageColumns",
      },
      {
        name: "Three image columns",
        icon: ThreeImageColumnsIcon,
        type: "layout",
        component: ThreeImageColumns,
        layoutType: "threeImageColumns",
      },
      {
        name: "Four image columns",
        icon: FourImageColumnsIcon,
        type: "layout",
        component: FourImageColumns,
        layoutType: "fourImageColumns",
      },
    ],
  },
];
