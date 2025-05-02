import { ContentItem } from "@/lib/types";

type Props = {
  type: string;
  componentType: string;
  name: string;
  component: ContentItem;
  icon: string;
};

const ComponentCard = ({ item }: { item: Props }) => {
  return <div>ComponentCard</div>;
};

export default ComponentCard;
