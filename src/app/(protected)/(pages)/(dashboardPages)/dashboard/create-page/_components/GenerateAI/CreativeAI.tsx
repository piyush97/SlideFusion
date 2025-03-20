"use client";

import { Button } from "@/components/ui/button";
import { containerVariants } from "@/global/constants";
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
    </motion.div>
  );
};

export default CreativeAI;
