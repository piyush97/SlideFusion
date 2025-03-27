import { Button } from "@/components/ui/button";
import {
  containerVariants,
  CreatePageCard,
  itemVariant,
} from "@/global/constants";
import { usePromptStore } from "@/store/usePromptStore";
import { motion } from "motion/react";
import RecentPrompts from "../GenerateAI/RecentPrompts";

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
  const { prompts } = usePromptStore();

  return (
    <motion.div
      initial={"hidden"}
      animate="visible"
      className="space-y-8"
      variants={containerVariants}
    >
      <motion.div variants={itemVariant} className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-primary">
          How would you like to get started?
        </h1>
        <p className="text-secondary">
          Choose your preferred method to create a new project
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        {CreatePageCard.map((card) => (
          <motion.div
            key={card.type}
            variants={itemVariant}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`${
              card.highlight
                ? "bg-vivid-gradient"
                : "hover:bg-vivid-gradient border"
            } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
            onClick={() => onSelectOption(card.type)}
          >
            <motion.div
              className="flex flex-col items-start w-full p-4 bg-white gap-y-6 dark:bg-black rounded-xl"
              whileHover={{ transition: { duration: 0.1 } }}
            >
              <div className="flex flex-col items-start w-full gap-y-3">
                <div>
                  <p className="text-lg font-semibold text-primary">
                    {card.title}
                  </p>
                  <p
                    className={`${
                      card.highlight ? "text-vivid" : "text-primary"
                    } text-4xl font-bold`}
                  >
                    {card.highlightedText}
                  </p>
                </div>
                <p className="text-sm font-normal text-secondary">
                  {card.description}
                </p>
              </div>
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={card.highlight ? "default" : "outline"}
                  className="font-bold w-fit rounded-xl"
                  size="sm"
                  onClick={() => onSelectOption(card.type)}
                >
                  {card.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      {prompts?.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreatePage;
