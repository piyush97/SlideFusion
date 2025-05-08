"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Props = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setShowGap] = useState(false);

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            transition={{ duration: 0.2, delay: 0.1 }}
            exit={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -10 }}
          >
            <div className="w-[40%] h-[1px] bg-primary" />
            <Button
              variant="outline"
              size="sm"
              onClick={onAddCard}
              className="w-8 h-8 p-0 rounded-full bg-primary hover:bg-primary"
            >
              <Plus className="w-4 h-4 text-black" />
            </Button>
            <div className="w-[40%] h-[1px] bg-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default AddCardButton;
