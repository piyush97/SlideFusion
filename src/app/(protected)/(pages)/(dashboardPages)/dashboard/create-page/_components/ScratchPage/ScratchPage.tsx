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
import useScratchStore from "@/store/useScratchStore";
import { motion } from "framer-motion";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CardList from "../Common/CardList";

import { createProject } from "@/actions/project";
import { OutlineCard } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ScratchPage = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const { resetOutlines, outlines, addOutline, addMultipleOutlines } =
    useScratchStore();

  const { setProject } = useSlideStore();

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
    const res = await createProject(outlines?.[0]?.title, outlines);

    if (res.status !== 200) {
      toast.error(`${res.status} Failed to create project`);
      return;
    }
    if (res.data) {
      setProject(res.data);
      resetOutlines();
      toast.success("Project created successfully");
      router.push(`/presentation/${res.data.id}/select-theme`);
    } else {
      toast.error("Failed to create project");
    }
  };

  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariant}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter prompt and add to the cards..."
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
          />
          <div className="flex items-center gap-3">
            <Select
              value={outlines.length > 0 ? outlines.length.toString() : "0"}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
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
                    (_, index) => index + 1,
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
              <RotateCcw className="h-4 w-4" />
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
