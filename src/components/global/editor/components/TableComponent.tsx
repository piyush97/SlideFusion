"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useState } from "react";

type Props = {
  content: string[][];
  onChange: (newContent: string[][]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  initialRowSize?: number;
  initialColumnSize?: number;
};

const TableComponent = ({
  content,
  onChange,
  isPreview = false,
  isEditable = false,
  initialRowSize = 3,
  initialColumnSize = 3,
}: Props) => {
  const { currentTheme } = useSlideStore();
  const [tableData, setTableData] = useState<string[][]>(() => {
    if (content.length === 0 || content[0].length === 0)
      return Array(initialRowSize).fill(Array(initialColumnSize).fill(""));
    return content;
  });

  const [colSizes, setColSizes] = useState<number[]>(() =>
    Array(tableData[0].length).fill(0)
  );

  const [rowSizes, setRowSizes] = useState<number[]>(() =>
    Array(tableData.length).fill(0)
  );

  const handleResizeColumn = (colIndex: number, newSize: number) => {
    if (!isEditable) return;
    setColSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes[colIndex] = newSize;
      return updatedSizes;
    });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    if (!isEditable) return;
    const newData = tableData.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        const newRow = [...row];
        newRow[colIndex] = value;
        return newRow;
      }
      return row;
    });
    setTableData(newData);
    onChange(newData);
  };

  if (isPreview)
    return (
      <div className="w-full overflow-x-auto text-xs">
        <table className="w-full">
          <thead>
            <tr>
              {tableData[0].map((cell, colIndex) => (
                <th
                  key={colIndex}
                  className="p-2 border"
                  style={{ width: `${colSizes[colIndex]}%` }}
                >
                  {cell || "Type here..."}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{ height: `${rowSizes[rowIndex + 1]}%` }}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2 border">
                    {cell || "Type here..."}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div
      className="relative w-full h-full"
      style={{
        background:
          currentTheme.gradientBackground || currentTheme.backgroundColor,
        borderRadius: "8px",
      }}
    >
      <ResizablePanelGroup
        direction="vertical"
        className={`h-full w-full rounded-lg border ${
          initialColumnSize === 2
            ? "min-h-[100px]"
            : initialColumnSize === 3
            ? "min-h-[150px]"
            : initialColumnSize === 4
            ? "min-h-[200px]"
            : "min-h-[100px]"
        }`}
        onLayout={(sizes) => setRowSizes(sizes)}
      >
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowIndex > 0 && <ResizableHandle />}
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full h-full"
              onLayout={(sizes) => setColSizes(sizes)}
            >
              {row.map((cell, colIndex) => (
                <React.Fragment key={colIndex}>
                  {colIndex > 0 && <ResizableHandle />}
                  <ResizablePanel
                    defaultSize={colSizes[colIndex]}
                    onResize={(newSize) => {
                      handleResizeColumn(colIndex, newSize);
                    }}
                    className="w-full h-full min-h-9"
                  >
                    <div className="relative w-full h-full min-h-3">
                      <input
                        value={cell}
                        onChange={(e) =>
                          updateCell(rowIndex, colIndex, e.target.value)
                        }
                        className="w-full h-full p-4 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ color: currentTheme.fontColor }}
                        placeholder="Type here..."
                        readOnly={!isEditable}
                      />
                    </div>
                  </ResizablePanel>
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default TableComponent;
