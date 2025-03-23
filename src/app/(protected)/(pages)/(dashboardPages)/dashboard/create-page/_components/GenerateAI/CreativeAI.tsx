"use client";

import { generateCreativePrompt } from "@/actions/openai";
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
import { OutlineCard } from "@/lib/types";
import { useCreativeAIStore } from "@/store/useCreativeAIStore";
import { usePromptStore } from "@/store/usePromptStore";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import CardList from "../Common/CardList";
import RecentPrompts from "./RecentPrompts";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const [noOfCards, setNoOfCards] = useState(0);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const {
    currentAIPrompt,
    setCurrentAIPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();

  const { prompts } = usePromptStore();

  const resetCards = () => {
    setNoOfCards(0);
    setEditingCard(null);
    setIsGenerating(false);
    setSelectedCard(null);
    setEditText("");
    resetOutlines();
    setCurrentAIPrompt("");
  };

  const generateOutline = async () => {
    if (currentAIPrompt === "") {
      toast.error("Error", {
        description: "Please enter a prompt",
      });
      return;
    }
    setIsGenerating(true);

    const res = await generateCreativePrompt(currentAIPrompt);
    if (res.status === 200 && res?.data?.outlines) {
      const cardsData: OutlineCard[] = [];
      res.data?.outlines?.map((outline: string, idx: number) => {
        const newCard = {
          id: uuidv4(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);
      toast.success("Outline generated successfully");
    } else {
      toast.error("Error", {
        description: "Failed to generate outline",
      });
    }
    setIsGenerating(false);
    resetCards();
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    generateOutline();
    setIsGenerating(false);
  };

  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4" />
      </Button>
      <motion.div variants={itemVariant} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className="text-secondary">What would you like to create?</p>
      </motion.div>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariant}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <Input
            placeholder="Enter prompt and add to the cards..."
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            value={currentAIPrompt || ""}
            onChange={(e) => {
              setCurrentAIPrompt(e.target.value);
            }}
            required
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of Cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    {" "}
                    No Cards{" "}
                  </SelectItem>
                ) : (
                  Array.from({ length: outlines.length }, (_, i) => i + 1).map(
                    (num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="font-semibold"
                      >
                        {num} Card{num > 1 ? "s" : ""}
                      </SelectItem>
                    ),
                  )
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
      <div className="w-full flex justify-center items-center">
        <Button
          className="font-medium text-lg flex gap-2 items-center"
          onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 animate-spin" /> Generating...
            </>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>
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
      {outlines.length > 0 && (
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      )}
      {prompts?.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreativeAI;
