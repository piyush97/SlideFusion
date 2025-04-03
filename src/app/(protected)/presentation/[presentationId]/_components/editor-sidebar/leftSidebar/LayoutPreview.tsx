import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import { useEffect, useState } from "react";

type Props = {};

const LayoutPreview = (props: Props) => {
  const { reorderSlides, getOrderedSlides } = useSlideStore();
  const slides = getOrderedSlides();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <div className="fixed left-0 w-64 h-full overflow-y-auto border-r top-20">
      <ScrollArea className="w-full h-full" suppressHydrationWarning>
        {loading ? (
          <div className="flex flex-col w-full px-4 space-y-6">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-100">
                SLIDES
              </h2>
              <span
                className="text-xs text-gray-400 dark:text-gray-200"
                suppressHydrationWarning
              >
                {slides?.length} slides
              </span>
            </div>
            {/* TODO: After editor */}
            {/* {slides?.map((slide, index) => (
              <DraggableSlidePreview
                key={slide.id || index}
                slide={slide}
                index={index}
                moveSlide={moveSlide}
              />
            ))} */}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
