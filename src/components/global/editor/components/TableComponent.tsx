"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { useState } from "react";

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
    ></div>
  );
};

export default TableComponent;
