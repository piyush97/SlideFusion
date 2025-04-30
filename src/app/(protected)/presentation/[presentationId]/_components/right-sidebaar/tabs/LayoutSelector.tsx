"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {};

const LayoutSelector = (props: Props) => {
  const { currentTheme } = useSlideStore();
  return (
    <ScrollArea
      className="h-[400px]"
      style={{ backgroundColor: currentTheme.slideBackgroundColor }}
    >
      <div className="p-4"></div>
    </ScrollArea>
  );
};

export default LayoutSelector;
