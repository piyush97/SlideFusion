import { Project } from "@prisma/client";

type Props = { project: Project };

const ProjectCard = ({ project }: Props) => {
  return <div>{JSON.stringify(project)}</div>;
};

export default ProjectCard;
