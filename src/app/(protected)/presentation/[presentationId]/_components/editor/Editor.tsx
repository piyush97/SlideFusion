import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  isEditable: boolean;
};

const Editor = ({ isEditable }: Props) => {
  const { slides, project } = useSlideStore();
  return <div>Editor</div>;
};

export default Editor;
