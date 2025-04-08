import { useSlideStore } from "@/store/useSlideStore";

type Props = { index: number; parentId: string; slideId: string };

const DropZone = ({ index, parentId, slideId }: Props) => {
  const { addComponentInSlide } = useSlideStore();
  return <div>DropZone</div>;
};

export default DropZone;
