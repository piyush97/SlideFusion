import NumberedList, {
  BulletList,
  TodoList,
} from "@/components/global/editor/components/NumberedList";
import React from "react";
import { ContentRendererProps, ContentWrapper } from "./ContentBase";

// List renderers
export const ListRenderer: React.FC<ContentRendererProps> = ({
  content,
  onContentChange,
}) => {
  const handleChange = React.useCallback(
    (newItems: string[]) => onContentChange(newItems, content.id),
    [content.id, onContentChange]
  );

  const getListComponent = () => {
    const items = content.content as string[];
    const className = content.className;

    switch (content.type) {
      case "numberedList":
        return (
          <NumberedList
            items={items}
            onChange={handleChange}
            className={className}
          />
        );
      case "bulletedList":
        return (
          <BulletList
            items={items}
            onChange={handleChange}
            className={className}
          />
        );
      case "todoList":
        return (
          <TodoList
            items={items}
            onChange={handleChange}
            className={className}
          />
        );
      default:
        return null;
    }
  };

  return <ContentWrapper>{getListComponent()}</ContentWrapper>;
};

ListRenderer.displayName = "ListRenderer";
