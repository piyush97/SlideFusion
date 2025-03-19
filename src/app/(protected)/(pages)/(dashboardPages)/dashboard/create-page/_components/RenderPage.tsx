"use client";

import { usePromptStore } from "@/store/usePromptStore";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatePage from "./CreatePage/CreatePage";

const RenderPage = () => {
  const { page, setPage } = usePromptStore();
  const router = useRouter();
  const onSelectOption = (option: string) => {
    if (option === "template") router.push("/templates");
    else if (option === "create-scratch") {
      setPage("create-scratch");
    } else {
      setPage("creative-ai");
    }
  };

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
