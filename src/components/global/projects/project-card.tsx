"use client";
import { itemVariant, ROUTES } from "@/global/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import router from "next/router";
type Props = { project: Project };

const ProjectCard = ({ project }: Props) => {
  const { setSlides } = useSlideStore();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(project.slides)));
    router.push(`${ROUTES.presentation}/${project.id}`);
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !project.isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariant}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      ></div>
    </motion.div>
  );
};

export default ProjectCard;
