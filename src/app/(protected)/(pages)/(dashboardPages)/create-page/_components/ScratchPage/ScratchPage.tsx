"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { containerVariants, itemVariant } from "@/global/constants";
import { api } from "@/lib/api";
import useScratchStore from "@/store/useScratchStore";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CardList from "../Common/CardList";

import { OutlineCard } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ScratchPage = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const { resetOutlines, outlines, addOutline, addMultipleOutlines } =
    useScratchStore();

  const { setProject } = useSlideStore();

  // tRPC mutation
  const createProjectMutation = api.project.create.useMutation({
    onSuccess: (data) => {
      if (data.status === 200 && data.data) {
        setProject(data.data);
        resetOutlines();
        toast.success("Project created successfully");
        router.push(`/presentation/${data.data.id}/select-theme`);
      } else {
        toast.error("Failed to create project");
      }
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });

  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const [editText, setEditText] = useState("");

  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  const resetCards = () => {
    setEditText("");
    resetOutlines();
  };

  const handleCreate = () => {
    const newCard: OutlineCard = {
      id: uuidv4(),
      title: editText || "New Section",
      order: outlines.length + 1,
    };
    addOutline(newCard);
    setEditText("");
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast.error("Please add at least one card before generating.");
      return;
    }

    try {
      await createProjectMutation.mutateAsync({
        title: outlines?.[0]?.title,
        outlines: outlines,
      });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error("Failed to create project:", error);
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl px-4 mx-auto space-y-6 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
      </Button>
      <h1 className="text-2xl font-bold text-left sm:text-3xl text-primary">
        Prompt
      </h1>
      <motion.div
        className="p-4 bg-primary/10 rounded-xl"
        variants={itemVariant}
      >
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row rounded-xl">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter prompt and add to the cards..."
            className="flex-grow p-0 text-base bg-transparent border-0 shadow-none sm:text-xl focus-visible:ring-0"
          />
          <div className="flex items-center gap-3">
            <Select
              value={outlines.length > 0 ? outlines.length.toString() : "0"}
            >
              <SelectTrigger className="gap-2 font-semibold shadow-xl w-fit">
                <SelectValue placeholder="Select Number of Cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No Cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, index) => index + 1
                  ).map((number) => (
                    <SelectItem
                      className="font-semibold"
                      key={number}
                      value={number.toString()}
                    >
                      {number} {number === 1 ? "Card" : "Cards"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              onClick={resetCards}
              size="icon"
              aria-label="Reset Cards"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      <Button
        className="w-full bg-primary-10"
        onClick={handleCreate}
        variant="secondary"
      >
        Add Card
      </Button>

      {outlines.length > 0 && (
        <Button className="w-full" onClick={handleGenerate}>
          Generate PPT
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
