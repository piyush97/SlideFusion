import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";

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
      {slide ? <div></div> : ""}
    </div>
  );
};

export default Thumbnail;
