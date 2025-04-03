"use client";
import { containerVariants } from "@/global/constants";
import { Project } from "@prisma/client";
import * as motion from "motion/react-client";
import ProjectCard from "./project-card";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          projectId={project.id}
          isDeleted={project.isDeleted}
          createdAt={project.createdAt}
          slideData={project.slides}
          themeName={project.themeName}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
