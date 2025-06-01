import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCw, Settings2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UploadImage from "./UploadImage";

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (
    newContent: string | string[] | string[][],
    contentId: string
  ) => void;
  isEditable?: boolean;
};

const ImageComponent = ({
  src,
  alt,
  className,
  isPreview = false,
  contentId,
  onContentChange,
  isEditable = true,
}: Props) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/test-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        onContentChange(data.imageUrl, contentId);
        setImagePrompt("");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateImage = async () => {
    const defaultPrompt =
      "professional business presentation image, clean modern style";
    setIsGenerating(true);
    try {
      const response = await fetch("/api/test-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: defaultPrompt }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        onContentChange(data.imageUrl, contentId);
      }
    } catch (error) {
      console.error("Error regenerating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative w-full h-full rounded-lg group">
      <Image
        src={src}
        alt={alt}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        className={`object-cover w-full h-full rounded-lg transition-all duration-200 ${className} ${
          isGenerating ? "opacity-50" : ""
        }`}
      />

      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
          <div className="flex flex-col items-center space-y-2 text-white">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="text-sm font-medium">Generating...</span>
          </div>
        </div>
      )}

      {!isPreview && isEditable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex flex-col space-y-2">
            {/* AI Generate Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 shadow-lg"
                        disabled={isGenerating}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" side="left">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="image-prompt"
                              className="text-sm font-semibold"
                            >
                              Generate AI Image
                            </Label>
                            <Badge variant="secondary" className="text-xs">
                              DALL-E 3
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Describe what image you want to generate. Be
                            specific for better results.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Input
                            id="image-prompt"
                            placeholder="e.g., modern office building, data visualization chart, team meeting..."
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            className="text-sm"
                          />

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={handleGenerateImage}
                              disabled={!imagePrompt.trim() || isGenerating}
                              className="flex-1"
                            >
                              {isGenerating ? (
                                <>
                                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Generate
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleRegenerateImage}
                              disabled={isGenerating}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-xs text-muted-foreground space-y-1">
                            <p className="font-medium">
                              💡 Tips for better images:
                            </p>
                            <ul className="space-y-0.5 ml-2">
                              <li>
                                • Use descriptive adjectives (modern, clean,
                                professional)
                              </li>
                              <li>
                                • Specify style (minimalist, corporate,
                                colorful)
                              </li>
                              <li>
                                • Mention context (office, presentation, data,
                                team)
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Generate AI image with DALL-E</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Upload Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 shadow-lg"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72" side="left">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">
                            Upload Image
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Upload from your computer, camera, or cloud storage.
                          </p>
                        </div>
                        <UploadImage
                          contentId={contentId}
                          onContentChange={onContentChange}
                        />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium">📁 Supported formats:</p>
                          <p>JPG, PNG, WebP up to 10MB</p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Upload your own image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Settings Button for future enhancements */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 shadow-lg opacity-50"
                    disabled
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Image settings (coming soon)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
