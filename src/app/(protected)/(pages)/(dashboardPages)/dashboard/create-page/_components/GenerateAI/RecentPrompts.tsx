import { Card } from "@/components/ui/card";
import { containerVariants, itemVariant } from "@/global/constants";
import { timeAgo } from "@/lib/utils";
import { usePromptStore } from "@/store/usePromptStore";
import { motion } from "framer-motion";

const RecentPrompts = () => {
  const { prompts, setPage } = usePromptStore();
  return (
    <motion.div variants={containerVariants} className="space-y-4 !mt-20">
      <motion.h2
        variants={itemVariant}
        className="text-2xl font-semibold text-center"
      >
        Your Recent Prompts
      </motion.h2>
      <motion.div
        variants={containerVariants}
        className="space-y-2 w-full lg:max-w-[80%] mx-auto"
      >
        {prompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            variants={itemVariant}
            // className="flex items-center justify-between w-full p-4 bg-white rounded-xl dark:bg-black"
          >
            <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
              <div className="max-w-[70%]">
                <h3 className="font-semibold text-xl line-clamp-1">
                  {prompt?.title}
                </h3>
                <p className="font-semibold text-sm text-muted-foreground">
                  {timeAgo(new Date(prompt?.createdAt))}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
