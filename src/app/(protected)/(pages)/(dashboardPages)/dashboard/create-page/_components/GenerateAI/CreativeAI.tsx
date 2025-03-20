"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { containerVariants, itemVariant } from "@/global/constants";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const router = useRouter();

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
            required
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreativeAI;
