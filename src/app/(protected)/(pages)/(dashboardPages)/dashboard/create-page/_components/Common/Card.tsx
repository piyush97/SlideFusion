"use client";
import { OutlineCard } from "@/lib/types";
import { useRef } from "react";

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (text: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHandlers: {
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: () => void;
  };
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOverStyles: React.CSSProperties;
};
const Card = ({
  card,
  isEditing,
  isSelected,
  editText,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  dragHandlers,
  onDragOver,
  dragOverStyles,
}: Props) => {
  const useInputRef = useRef<HTMLInputElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    ></motion.div>
  );
};

export default Card;
