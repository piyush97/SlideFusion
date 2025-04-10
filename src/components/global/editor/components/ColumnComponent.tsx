import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentationId]/_components/editor/Content";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { v4 } from "uuid";

type Props = {
  content: ContentItem[];
  className?: string;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  onContentChange: (
    newContent: string | string[] | string[][],
    contentId: string
  ) => void;
};

const ColumnComponent = ({
  content,
  className,
  isPreview = false,
  isEditable = true,
  slideId,
  onContentChange,
}: Props) => {
  const [columns, setColumns] = React.useState<ContentItem[]>(content);

  const createDefaultColumns = (num: number) => {
    return Array(num)
      .fill(null)
      .map(() => ({
        id: v4(),
        type: "paragraph" as const,
        name: "Paragraph",
        content: "",
        placeholder: "Start typing...",
      }));
  };

  useEffect(() => {
    if (content.length === 0) setColumns(createDefaultColumns(2));
    else setColumns(content);
  }, [content]);

  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          "h-full w-full flex",
          !isEditable && "!border-0",
          className
        )}
      >
        {columns.map((column, index) => (
          <React.Fragment key={column.id}>
            <ResizablePanel minSize={20} defaultSize={100 / columns.length}>
              <div className={cn("h-full w-full", column.className)}>
                <MasterRecursiveComponent
                  content={column}
                  isPreview={isPreview}
                  onContentChange={onContentChange}
                  slideId={slideId}
                  isEditable={isEditable}
                />
              </div>
            </ResizablePanel>
            {index < columns.length - 1 && isEditable && (
              <ResizableHandle withHandle={!isPreview} />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
