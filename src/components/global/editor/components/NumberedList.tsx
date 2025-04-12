import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { Props } from "next/script";

type Props = {
  items: string[];
  onChange: (items: string[]) => void;
  className?: string;
  isEditable?: boolean;
};

type ListItemProps = {
  item: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  isEditable: boolean;
  fontColor: string;
};

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  onChange,
  onKeyDown,
  isEditable,
  fontColor,
}) => (
  <input
    type="text"
    value={item}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(e, index)}
    className="w-full py-1 bg-transparent outline-none"
    style={{ color: fontColor }}
    readOnly={!isEditable}
  />
);

const NumberedList: React.FC<Props> = ({
  items,
  onChange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();
  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedItems = [...items];
      updatedItems.splice(index + 1, 0, "");
      onChange(updatedItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      onChange(updatedItems);
    }
  };

  return (
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index}>
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ol>
  );
};

export const BulletList: React.FC<Props> = ({
  items,
  onChange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();
  const handleChange = (index: number, value: string) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedItems = [...items];
      updatedItems.splice(index + 1, 0, "");
      onChange(updatedItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      onChange(updatedItems);
    }
  };

  return (
    <ul
      className={cn("list-disc pl-5 space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="pl-1 marker:text-current">
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

export default NumberedList;
