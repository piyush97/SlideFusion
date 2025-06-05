"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { layouts } from "@/config";
import type { Layout } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Lightbulb, Sparkles } from "lucide-react";
import { useDrag } from "react-dnd";
import LayoutPreviewItem from "./components/LayoutPreviewItem";

const DraggableLayoutItem = ({
  component,
  icon,
  layoutType,
  name,
  type,
}: Layout) => {
  const { currentTheme } = useSlideStore();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LAYOUT",
    item: { type, layoutType, component },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Layout recommendations based on use case
  const getLayoutTips = (layoutType: string) => {
    const tips: Record<
      string,
      { description: string; bestFor: string; badge?: string }
    > = {
      "blank-card": {
        description: "Start with a clean slate",
        bestFor:
          "Custom content, title slides, or when you want full creative control",
      },
      imageAndText: {
        description: "Image on left, text on right",
        bestFor:
          "Product showcases, before/after comparisons, or visual storytelling",
        badge: "Popular",
      },
      textAndImage: {
        description: "Text on left, image on right",
        bestFor:
          "Feature explanations, process descriptions, or concept introductions",
      },
      twoColumns: {
        description: "Split content into two equal sections",
        bestFor: "Comparisons, pros/cons, or parallel information",
        badge: "Versatile",
      },
      threeColumns: {
        description: "Three equal sections for organized content",
        bestFor:
          "Feature lists, step-by-step processes, or category breakdowns",
      },
      fourColumns: {
        description: "Four sections for detailed breakdowns",
        bestFor:
          "Team introductions, product catalogs, or comprehensive overviews",
      },
      twoImageColumns: {
        description: "Two image-focused columns",
        bestFor: "Photo galleries, product comparisons, or visual portfolios",
        badge: "Visual",
      },
      threeImageColumns: {
        description: "Three image-focused columns",
        bestFor:
          "Service showcases, portfolio displays, or visual case studies",
        badge: "Visual",
      },
      fourImageColumns: {
        description: "Four image-focused columns",
        bestFor: "Team photos, product grids, or comprehensive visual displays",
        badge: "Visual",
      },
    };
    return (
      tips[layoutType] || {
        description: "Flexible layout option",
        bestFor: "Various content types",
      }
    );
  };

  const layoutTip = getLayoutTips(layoutType);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div
            ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
            style={{
              opacity: isDragging ? 0.5 : 1,
              backgroundColor: currentTheme.slideBackgroundColor,
            }}
            className="border rounded-lg transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-grab active:cursor-grabbing"
          >
            <div className="relative">
              {layoutTip.badge && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 z-10 text-xs scale-75"
                >
                  {layoutTip.badge}
                </Badge>
              )}
              <LayoutPreviewItem
                name={name}
                Icon={icon}
                type={type}
                component={component}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">
              {layoutTip.description}
            </p>
            <div className="flex items-start space-x-1 text-xs">
              <Lightbulb className="w-3 h-3 mt-0.5 text-yellow-500 flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-medium">Best for:</span>{" "}
                {layoutTip.bestFor}
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const LayoutSelector = () => {
  const { currentTheme } = useSlideStore();
  return (
    <ScrollArea
      className="h-[400px]"
      style={{ backgroundColor: currentTheme.slideBackgroundColor }}
    >
      <div className="p-4">
        {/* Header with helpful hint */}
        <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-blue-900 dark:text-blue-100">
                💡 Layout Selection Tips
              </p>
              <p className="text-blue-700 dark:text-blue-200">
                Drag layouts to your slides or hover for recommendations. Each
                layout includes images by default.
              </p>
            </div>
          </div>
        </div>

        {layouts.map((group) => (
          <div key={group.name} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">
                {group.name}
              </h3>
              <Badge variant="outline" className="text-xs">
                {group.layouts.length} layouts
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {group.layouts.map((layout) => (
                <DraggableLayoutItem key={layout.layoutType} {...layout} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer with additional tips */}
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border">
          <div className="text-xs space-y-2 text-muted-foreground">
            <p className="font-semibold text-foreground">🎨 Pro Tips:</p>
            <ul className="space-y-1 ml-2">
              <li>
                • Start with image-focused layouts for visual presentations
              </li>
              <li>• Use column layouts for data-heavy content</li>
              <li>• Mix different layouts to create dynamic presentations</li>
              <li>• All layouts automatically include AI-generated images</li>
            </ul>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default LayoutSelector;
