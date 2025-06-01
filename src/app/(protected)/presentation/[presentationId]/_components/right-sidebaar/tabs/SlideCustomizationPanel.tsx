"use client";
import { generateImagesForSlide } from "@/actions/openai";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSlideStore } from "@/store/useSlideStore";
import {
  Download,
  Eye,
  Image as ImageIcon,
  Info,
  Layout,
  Palette,
  RefreshCw,
  Share2,
  Sparkles,
  Type,
} from "lucide-react";
import { useState } from "react";

const SlideCustomizationPanel = () => {
  const { currentSlide, slides, updateSlide } = useSlideStore();
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(100);
  const [textSize, setTextSize] = useState("medium");
  const [aiPrompt, setAiPrompt] = useState("");
  const currentSlideData = slides[currentSlide];

  if (!currentSlideData) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="w-5 h-5" />
            <span>Slide Customization</span>
          </CardTitle>
          <CardDescription>
            Select a slide to customize its appearance and content.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  const handleGenerateAllImages = async () => {
    setIsGeneratingAll(true);
    try {
      const result = await generateImagesForSlide(currentSlideData);

      if (result.success && result.slide) {
        // Update the slide in the store with the new images
        updateSlide(currentSlideData.id, result.slide);
        console.log("✅ Generated new images for slide");
      } else {
        console.error("❌ Failed to generate images:", result.error);
      }
    } catch (error) {
      console.error("❌ Error generating images:", error);
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const handleBackgroundOpacityChange = (value: number[]) => {
    setBackgroundOpacity(value[0]);
    // Update slide with new background opacity
    const updatedSlide = {
      ...currentSlideData,
      className: `${currentSlideData.className || ""} opacity-${value[0]}`,
    };
    updateSlide(currentSlideData.id, updatedSlide);
  };

  const handleTextSizeChange = (size: string) => {
    setTextSize(size);
    // Logic to update text size would go here
    console.log("Text size changed to:", size);
  };

  const handlePreview = () => {
    // Open preview in a new window or modal
    window.open(`/presentation/${currentSlideData.id}/preview`, "_blank");
  };

  const handleDownload = () => {
    // Generate and download the slide as PDF or image
    console.log("Downloading slide...");
    // This would typically trigger a download API
  };

  const handleAiEnhance = async () => {
    if (!aiPrompt.trim()) return;

    console.log("AI Enhancement requested:", aiPrompt);
    // This would call an AI service to enhance the slide
    setAiPrompt("");
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Slide Info Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center space-x-2">
              <Layout className="w-5 h-5" />
              <span>Slide {currentSlide + 1}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {currentSlideData.type}
            </Badge>
          </CardTitle>
          <CardDescription className="text-sm">
            {currentSlideData.slideName || `Slide ${currentSlide + 1}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Actions */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>Quick Actions</span>
            </Label>

            <div className="grid grid-cols-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={handleGenerateAllImages}
                      disabled={isGeneratingAll}
                    >
                      {isGeneratingAll ? (
                        <>
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3 mr-1" />
                          Refresh Images
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate new AI images for this slide</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                    >
                      <Type className="w-3 h-3 mr-1" />
                      Auto-Format
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Automatically format text and spacing</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Style Adjustments */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center space-x-1">
              <Palette className="w-4 h-4" />
              <span>Style</span>
            </Label>

            <div className="space-y-2">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Background Opacity
                </Label>
                <Slider
                  value={[backgroundOpacity]}
                  onValueChange={handleBackgroundOpacityChange}
                  max={100}
                  step={10}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">
                  Text Size
                </Label>
                <Select value={textSize} onValueChange={handleTextSizeChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* AI Enhancement */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Enhancement</span>
            </Label>

            <div className="space-y-2">
              <Input
                placeholder="Describe improvements..."
                className="h-8 text-xs"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <Button
                size="sm"
                className="w-full text-xs"
                onClick={handleAiEnhance}
                disabled={!aiPrompt.trim()}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Enhance with AI
              </Button>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>Export</span>
            </Label>

            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={handlePreview}
              >
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={handleDownload}
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-1 text-sm text-blue-900 dark:text-blue-100">
            <Info className="w-4 h-4" />
            <span>💡 Pro Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-blue-700 dark:text-blue-200 space-y-2">
          <p>
            • <strong>Image Quality:</strong> AI images are automatically
            optimized for presentations
          </p>
          <p>
            • <strong>Consistency:</strong> Use similar image styles across
            slides
          </p>
          <p>
            • <strong>Text:</strong> Keep text concise and use bullet points
          </p>
          <p>
            • <strong>Layout:</strong> Maintain visual hierarchy with headings
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlideCustomizationPanel;
