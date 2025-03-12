import { Project } from "@prisma/client";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  return <div>RecentOpen</div>;
};

export default RecentOpen;
