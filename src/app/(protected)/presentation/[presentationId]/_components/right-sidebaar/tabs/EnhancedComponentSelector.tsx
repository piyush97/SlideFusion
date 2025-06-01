"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { component } from "@/config";
import { useSlideStore } from "@/store/useSlideStore";
import { Lightbulb, Sparkles } from "lucide-react";
import ComponentCard from "./components/ComponentPreview";

const EnhancedComponentSelector = () => {
  const { currentTheme } = useSlideStore();

  // Component recommendations and tips
  const getComponentTips = (componentType: string) => {
    const tips: Record<
      string,
      { description: string; bestFor: string; badge?: string }
    > = {
      title: {
        description: "Main slide heading",
        bestFor: "Slide titles, section headers, or key points",
        badge: "Essential",
      },
      heading1: {
        description: "Primary heading for major sections",
        bestFor: "Chapter titles, main topics, or primary sections",
      },
      heading2: {
        description: "Secondary heading for subsections",
        bestFor: "Subtopics, feature categories, or subsections",
      },
      heading3: {
        description: "Third-level heading for details",
        bestFor: "Detailed points, specific features, or sub-items",
      },
      paragraph: {
        description: "Body text for detailed content",
        bestFor: "Explanations, descriptions, or detailed information",
        badge: "Popular",
      },
      table2x2: {
        description: "Simple 2×2 data table",
        bestFor: "Quick comparisons, simple data, or basic layouts",
      },
      table3x3: {
        description: "Medium 3×3 data table",
        bestFor: "Feature comparisons, pricing tables, or structured data",
        badge: "Versatile",
      },
      table4x4: {
        description: "Large 4×4 data table",
        bestFor:
          "Comprehensive data, detailed comparisons, or complex information",
      },
      bulletList: {
        description: "Bulleted list for key points",
        bestFor: "Features, benefits, or key points without order",
        badge: "Popular",
      },
      numberedList: {
        description: "Numbered list for ordered items",
        bestFor: "Steps, processes, or ranked items",
      },
      todoList: {
        description: "Checklist for actionable items",
        bestFor: "Tasks, requirements, or action items",
      },
      info: {
        description: "Information callout box",
        bestFor: "Important facts, definitions, or helpful information",
      },
      warning: {
        description: "Warning callout box",
        bestFor: "Cautionary notes, risks, or important warnings",
      },
      success: {
        description: "Success callout box",
        bestFor: "Achievements, completions, or positive outcomes",
      },
      question: {
        description: "Question callout box",
        bestFor: "Discussion points, prompts, or interactive elements",
      },
      resizableColumns: {
        description: "Flexible column layout",
        bestFor: "Side-by-side content, comparisons, or flexible layouts",
      },
    };
    return (
      tips[componentType] || {
        description: "Flexible component",
        bestFor: "Various content types",
      }
    );
  };

  return (
    <ScrollArea
      className="h-[400px]"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.fontColor,
      }}
    >
      <div className="p-5">
        {/* Header with helpful hint */}
        <div className="mb-6 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-green-900 dark:text-green-100">
                🧩 Component Library
              </p>
              <p className="text-green-700 dark:text-green-200">
                Drag components into your slides. Hover for usage tips and best
                practices.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          {component.map((group, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  {group.name}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {group.components.length} components
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {group.components.map((item) => {
                  const componentTip = getComponentTips(item.componentType);

                  return (
                    <TooltipProvider key={item.componentType}>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <div className="relative">
                            {componentTip.badge && (
                              <Badge
                                variant="secondary"
                                className="absolute -top-1 -right-1 z-10 text-xs scale-75"
                              >
                                {componentTip.badge}
                              </Badge>
                            )}
                            <div className="transition-all duration-200 hover:shadow-md hover:scale-105">
                              <ComponentCard item={item} />
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <div className="space-y-2">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {componentTip.description}
                            </p>
                            <div className="flex items-start space-x-1 text-xs">
                              <Lightbulb className="w-3 h-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                              <p className="text-muted-foreground">
                                <span className="font-medium">Best for:</span>{" "}
                                {componentTip.bestFor}
                              </p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer with additional tips */}
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border">
          <div className="text-xs space-y-2 text-muted-foreground">
            <p className="font-semibold text-foreground">✨ Quick Tips:</p>
            <ul className="space-y-1 ml-2">
              <li>
                • Start with titles and headings to structure your content
              </li>
              <li>• Use callout boxes to highlight important information</li>
              <li>• Tables work great for comparisons and data</li>
              <li>• Lists help organize information clearly</li>
              <li>• Combine components for rich, engaging slides</li>
            </ul>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default EnhancedComponentSelector;
