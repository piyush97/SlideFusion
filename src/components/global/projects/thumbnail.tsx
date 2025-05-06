/* eslint-disable jsx-a11y/alt-text */
import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentationId]/_components/editor/Content";
import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";

type Props = {
  slide: Slide;
  theme: Theme;
};

const Thumbnail = ({ slide, theme }: Props) => {
  return (
    <div
      className={cn(
        "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2"
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
          <MasterRecursiveComponent
            content={slide.content}
            isPreview={true}
            slideId={slide.id}
            onContentChange={() => {}}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-400">
          <Image className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
