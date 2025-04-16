import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  items: string[];
  onItemClick?: (item: string) => void;
  className?: string;
};

const TableOfContents = ({ items, className = "" }: Props) => {
  const { currentTheme } = useSlideStore();
  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <div key={index} className={cn("cursor-pointer hover:underline")}>
          {item}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
