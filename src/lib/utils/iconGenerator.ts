import React from "react";

/**
 * Base props for icon components
 */
interface IconProps {
  className?: string;
}

/**
 * Creates a column icon with specified number of columns
 */
export function createColumnIcon(
  numberOfColumns: number,
  withHeading: boolean = false
): React.FC<IconProps> {
  return function ColumnIcon({ className = "" }: IconProps) {
    return React.createElement(
      "div",
      {
        className: `flex flex-col items-center justify-center w-full h-full gap-3 ${
          className || ""
        }`,
      },
      withHeading &&
        React.createElement("div", {
          className: "w-full h-4 bg-white rounded",
        }),
      React.createElement(
        "div",
        { className: "flex w-full h-full gap-2" },
        Array.from({ length: numberOfColumns }, (_, i) =>
          React.createElement(
            "div",
            { className: "flex flex-col w-1/2 gap-1", key: i },
            React.createElement("div", {
              className: "w-full h-2 bg-white rounded",
            }),
            React.createElement("div", {
              className: "w-full h-2 bg-white rounded",
            }),
            React.createElement("div", {
              className: "w-2/3 h-2 bg-white rounded",
            })
          )
        )
      )
    );
  };
}
export function createTextImageIcon(
  imageFirst: boolean = false
): React.FC<IconProps> {
  return function TextImageIcon({ className = "" }: IconProps) {
    const textContent = React.createElement(
      "div",
      { className: "flex flex-col justify-center w-1/2 h-full gap-2" },
      React.createElement("div", { className: "w-full h-4 bg-white rounded" }),
      React.createElement("div", { className: "w-3/4 h-2 bg-white rounded" }),
      React.createElement("div", { className: "w-full h-2 bg-white rounded" }),
      React.createElement("div", { className: "w-2/3 h-2 bg-white rounded" })
    );

    const imageContent = React.createElement("div", {
      className: "w-1/2 h-full bg-white rounded",
    });

    return React.createElement(
      "div",
      {
        className: `flex items-center justify-center w-full h-full gap-4 ${
          className || ""
        }`,
      },
      imageFirst ? imageContent : textContent,
      imageFirst ? textContent : imageContent
    );
  };
}

/**
export function createBlankCardIcon(): React.FC<IconProps> {
  return function BlankCardIcon({ className = "" }: IconProps) {
    return React.createElement(
      "div",
      { className: `flex items-center justify-center w-full h-full ${className || ""}` },
      React.createElement("div", { className: "w-3/4 h-3/4 border-2 border-white border-dashed rounded" })
    );
  };
}
  };
}
  **/
