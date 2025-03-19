"use client";

import { usePromptStore } from "@/store/usePromptStore";
import { AnimatePresence, motion } from "framer-motion";
import CreatePage from "./CreatePage/CreatePage";

const RenderPage = () => {
  const { page } = usePromptStore();
  const onSelectOption = () => {};

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePage onSelectOption={onSelectOption} />;
      case "creative-ai":
        return <></>;
      case "create-scratch":
        return <></>;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
