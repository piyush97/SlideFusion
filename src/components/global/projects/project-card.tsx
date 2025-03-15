"use client";
import { itemVariant, ROUTES, themes } from "@/global/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import router from "next/router";
import Thumbnail from "./thumbnail";
type Props = {
  projectId: string;
  isDeleted?: boolean;
  createdAt: Date;
  slideData: JsonValue;
  src: string;
  title: string;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  isDeleted,
  createdAt,
  slideData,
  src,
  title,
  themeName,
}: Props) => {
  const { setSlides } = useSlideStore();
  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`${ROUTES.presentation}/${projectId}`);
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariant}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <Thumbnail
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
          theme={theme}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
