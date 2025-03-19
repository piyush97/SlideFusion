import {
  containerVariants,
  CreatePageCard,
  itemVariant,
} from "@/global/constants";
import { motion } from "framer-motion";

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
  return (
    <motion.div
      initial={"hidden"}
      animate="visible"
      className="space-y-8"
      variants={containerVariants}
    >
      <motion.div variants={itemVariant} className="text-center space-y-2">
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
            onClick={() => onSelectOption(card.title)}
          ></motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CreatePage;
