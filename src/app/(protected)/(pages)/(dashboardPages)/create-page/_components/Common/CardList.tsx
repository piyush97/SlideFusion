"use client";
import type { OutlineCard } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";
import AddCardButton from "./AddCardButton";
import Card from "./Card";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
};
const CardList = ({
  outlines,
  editingCard,
  selectedCard,
  editText,
  // addOutline, // Removing unused parameter
  onEditChange,
  onCardSelect,
  onCardDoubleClick,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addMultipleOutlines,
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;
    if (y < threshold) {
      setDraggedItem(outlines[index]);
    } else {
      setDraggedItem(outlines[index + 1]);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || dragOverIndex === null) return;
    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id,
    );
    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

    const [removedCard] = updatedCards.splice(draggedIndex, 1);

    updatedCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard,
    );

    addMultipleOutlines(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 })),
    );
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const onCardUpdate = (id: string, text: string) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: text } : card,
      ),
    );
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
  };

  const onCardDelete = (id: string) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 })),
    );
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: OutlineCard,
  ) => {
    setDraggedItem(card);
    e.dataTransfer.effectAllowed = "move";

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffsetY.current = e.clientY - rect.top;
    const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement;
    draggedEl.style.position = "absolute";
    draggedEl.style.top = "-1000px";
    draggedEl.style.opacity = "0.8";
    draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    document.body.appendChild(draggedEl);
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current);

    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id));
      document.body.removeChild(draggedEl);
    }, 0);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const getDragOverStyles = (cardId: number) => {
    if (dragOverIndex === null || draggedItem === null) return {};
    if (cardId === dragOverIndex) {
      return {
        borderTop: "2px solid #000",
        marginTop: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    }
    if (cardId === dragOverIndex - 1)
      return {
        borderBottom: "2px solid #000",
        marginBottom: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      };
    return {};
  };

  const onAddCard = (index?: number) => {
    const newCard: OutlineCard = {
      id: Math.random().toString(36).substr(2, 9),
      title: editText || "New Section",
      order: (index !== undefined ? index + 1 : outlines.length) + 1,
    };

    const updatedCards =
      index !== undefined
        ? [
            ...outlines.slice(0, index + 1),
            newCard,
            ...outlines.slice(index + 1).map((card) => ({
              ...card,
              order: card.order + 1,
            })),
          ]
        : [...outlines, newCard];

    addMultipleOutlines(updatedCards);
    setEditText("");
  };

  return (
    <motion.div
      className="my-2 space-y-2"
      layout
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          onDragOver(e, outlines.length);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
      }}
    >
      <AnimatePresence>
        {outlines.map((card, index) => (
          <React.Fragment key={card.id}>
            <Card
              onDragOver={(e) => onDragOver(e, index)}
              card={card}
              isEditing={editingCard === card.id}
              isSelected={selectedCard === card.id}
              editText={editText}
              onEditChange={onEditChange}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCardUpdate(card.id, editText);
                }
              }}
              onCardClick={() => onCardSelect(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDeleteClick={() => onCardDelete(card.id)}
              dragHandlers={{
                onDragEnd: onDragEnd,
                onDragStart: (e) => onDragStart(e, card),
              }}
              dragOverStyles={getDragOverStyles(index)}
            />
            <AddCardButton onAddCard={() => onAddCard(index)} />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
