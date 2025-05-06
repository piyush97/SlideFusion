import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { MasterRecursiveComponent } from "../editor/Content";

type Props = {
  onClose: () => void;
};

const PresentationMode = ({ onClose }: Props) => {
  const { getOrderedSlides, currentTheme } = useSlideStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = getOrderedSlides();
  const isLastSlide = currentSlideIndex === slides.length - 1;

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex === slides.length - 1) {
      onClose();
    } else {
      setCurrentSlideIndex((prevIndex) =>
        Math.min(prevIndex + 1, slides.length - 1)
      );
    }
  }, [currentSlideIndex, onClose, slides.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPreviousSlide();
      } else if (event.key === "ArrowRight") {
        goToNextSlide();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slides.length, onClose, goToNextSlide]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div
        className="relative w-full h-full"
        style={{
          aspectRatio: "16/9",
          maxHeight: "100vh",
          maxWidth: "177.78vh",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-full pointer-events-none ${slides[currentSlideIndex].className}`}
            style={{
              backgroundColor: currentTheme.slideBackgroundColor,
              backgroundImage: currentTheme.gradientBackground,
              color: currentTheme.accentColor,
              fontFamily: currentTheme.fontFamily,
            }}
          >
            <MasterRecursiveComponent
              content={slides[currentSlideIndex].content}
              slideId={slides[currentSlideIndex].id}
              onContentChange={() => {}}
              isPreview={false}
              isEditable={false}
            />
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size={"icon"}
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>
        <div className="absolute flex space-x-4 transform translate-x-1/2 bottom-4 left-1/2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousSlide}
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {!isLastSlide && (
            <Button variant="outline" size="icon" onClick={goToNextSlide}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
