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
import { containerVariants, itemVariant } from "@/config";
import { api } from "@/lib/api";
import { OutlineCard } from "@/lib/types";
import { useCreativeAIStore } from "@/store/useCreativeAIStore";
import { usePromptStore } from "@/store/usePromptStore";
import { useSlideStore } from "@/store/useSlideStore";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  // tRPC mutations
  const generatePromptMutation =
    api.openai.generateCreativePrompt.useMutation();
  const createProjectMutation = api.project.create.useMutation({
    onSuccess: (data) => {
      if (data.status === 200 && data.data) {
        router.push(`/presentation/${data.data.id}/select-theme`);
        setProject(data.data);
      } else {
        toast.error("Failed to create project");
      }
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
      setIsGenerating(false);
    },
  });

  const {
    currentAIPrompt,
    setCurrentAIPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();

  const { prompts, addPrompt } = usePromptStore();
  const { setProject } = useSlideStore();

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

    try {
      const res = await generatePromptMutation.mutateAsync({
        userPrompt: currentAIPrompt,
      });
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
    } catch (error) {
      console.error("Error generating outline:", error);
      toast.error("Error", {
        description: "Failed to generate outline",
      });
    }
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast.error("Error", {
        description:
          "Failed to generate outline, Please add at least on card to generate slides",
      });
      return;
    }

    setIsGenerating(true);

    try {
      await createProjectMutation.mutateAsync({
        title: currentAIPrompt,
        outlines: outlines.slice(0, noOfCards),
      });

      addPrompt({
        id: uuidv4(),
        title: currentAIPrompt || outlines?.[0]?.title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });

      toast.success("Project Created successfully");
      setCurrentAIPrompt("");
      resetOutlines();
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to generate project",
      });
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    setNoOfCards(outlines.length);
  }, [outlines.length]);

  return (
    <motion.div
      className="w-full max-w-4xl px-4 mx-auto space-y-6 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ChevronLeft className="h-4 mr-2" />
      </Button>
      <motion.div variants={itemVariant} className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className="text-secondary">What would you like to create?</p>
      </motion.div>
      <motion.div
        className="p-4 bg-primary/10 rounded-xl"
        variants={itemVariant}
      >
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row rounded-xl">
          <Input
            placeholder="Enter prompt and add to the cards..."
            className="flex-grow p-0 text-base bg-transparent border-0 shadow-none sm:text-xl focus-visible:ring-0"
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
              <SelectTrigger className="gap-2 font-semibold shadow-xl w-fit">
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
                    )
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
      <div className="flex items-center justify-center w-full">
        <Button
          className="flex items-center gap-2 text-lg font-medium"
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
              <Loader2 className="mr-2 animate-spin" /> Generating...
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
