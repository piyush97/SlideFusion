import type { ContentItem } from "../types";
import { SlideComponentFactory } from "./slideComponentFactory";

/**
 * Factory for creating common slide layout patterns
 */
export class SlideLayoutFactory {
  /**
   * Creates a basic slide layout with title and content area (now includes image)
   */
  static createBasicLayout(
    title = "",
    className = "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  ): ContentItem {
    return SlideComponentFactory.createColumn(
      [
        SlideComponentFactory.createTitle(title),
        SlideComponentFactory.createImage(),
        SlideComponentFactory.createParagraph(),
      ],
      className,
    );
  }

  /**
   * Creates a two-column layout with images
   */
  static createTwoColumnLayout(
    leftContent: ContentItem[] = [],
    rightContent: ContentItem[] = [],
    className = "p-4 mx-auto flex justify-center items-center",
  ): ContentItem {
    const defaultLeft =
      leftContent.length > 0
        ? leftContent
        : [
            SlideComponentFactory.createHeading(3),
            SlideComponentFactory.createImage(),
            SlideComponentFactory.createParagraph(),
          ];

    const defaultRight =
      rightContent.length > 0
        ? rightContent
        : [
            SlideComponentFactory.createHeading(3),
            SlideComponentFactory.createImage(),
            SlideComponentFactory.createParagraph(),
          ];

    return SlideComponentFactory.createColumn(
      [
        SlideComponentFactory.createTitle(),
        SlideComponentFactory.createResizableColumn([
          SlideComponentFactory.createColumn(defaultLeft),
          SlideComponentFactory.createColumn(defaultRight),
        ]),
      ],
      className,
    );
  }

  /**
   * Creates a three-column layout with images
   */
  static createThreeColumnLayout(
    columns: ContentItem[][] = [],
    className = "p-4 mx-auto flex justify-center items-center",
  ): ContentItem {
    const defaultColumns =
      columns.length === 3
        ? columns
        : [
            [
              SlideComponentFactory.createHeading(3),
              SlideComponentFactory.createImage(),
              SlideComponentFactory.createParagraph(),
            ],
            [
              SlideComponentFactory.createHeading(3),
              SlideComponentFactory.createImage(),
              SlideComponentFactory.createParagraph(),
            ],
            [
              SlideComponentFactory.createHeading(3),
              SlideComponentFactory.createImage(),
              SlideComponentFactory.createParagraph(),
            ],
          ];

    return SlideComponentFactory.createColumn(
      [
        SlideComponentFactory.createTitle(),
        SlideComponentFactory.createResizableColumn(
          defaultColumns.map((columnContent) =>
            SlideComponentFactory.createColumn(columnContent),
          ),
        ),
      ],
      className,
    );
  }

  /**
   * Creates a four-column layout with images
   */
  static createFourColumnLayout(
    columns: ContentItem[][] = [],
    className = "p-4 mx-auto flex justify-center items-center",
  ): ContentItem {
    const defaultColumns =
      columns.length === 4
        ? columns
        : [
            [
              SlideComponentFactory.createHeading(3),
              SlideComponentFactory.createImage(),
              SlideComponentFactory.createParagraph(),
            ],
            [
              SlideComponentFactory.createHeading(3),
              SlideComponentFactory.createImage(),
              SlideComponentFactory.createParagraph(),
            ],
            [
              SlideComponentFactory.createHeading(3),
              SlideComponentFactory.createImage(),
              SlideComponentFactory.createParagraph(),
            ],
            [
              SlideComponentFactory.createHeading(3),
              SlideComponentFactory.createImage(),
              SlideComponentFactory.createParagraph(),
            ],
          ];

    return SlideComponentFactory.createColumn(
      [
        SlideComponentFactory.createTitle(),
        SlideComponentFactory.createResizableColumn(
          defaultColumns.map((columnContent) =>
            SlideComponentFactory.createColumn(columnContent),
          ),
        ),
      ],
      className,
    );
  }

  /**
   * Creates an image-focused layout with multiple image columns
   */
  static createImageColumnLayout(
    numberOfColumns: 2 | 3 | 4,
    className = "p-4 mx-auto flex justify-center items-center",
  ): ContentItem {
    const columns = Array(numberOfColumns)
      .fill(null)
      .map(() => [SlideComponentFactory.createImageTextColumn()]);

    switch (numberOfColumns) {
      case 2:
        return SlideLayoutFactory.createTwoColumnLayout(
          columns[0],
          columns[1],
          className,
        );
      case 3:
        return SlideLayoutFactory.createThreeColumnLayout(columns, className);
      case 4:
        return SlideLayoutFactory.createFourColumnLayout(columns, className);
      default:
        return SlideLayoutFactory.createTwoColumnLayout(
          columns[0],
          columns[1],
          className,
        );
    }
  }

  /**
   * Creates a layout with heading and two columns
   */
  static createTwoColumnsWithHeadingsLayout(
    className = "p-4 mx-auto flex justify-center items-center",
  ): ContentItem {
    return SlideComponentFactory.createColumn(
      [
        SlideComponentFactory.createTitle(),
        SlideComponentFactory.createResizableColumn([
          SlideComponentFactory.createColumn([
            SlideComponentFactory.createHeading(3),
            SlideComponentFactory.createParagraph(),
          ]),
          SlideComponentFactory.createColumn([
            SlideComponentFactory.createHeading(3),
            SlideComponentFactory.createParagraph(),
          ]),
        ]),
      ],
      className,
    );
  }

  /**
   * Creates image and text side-by-side layout
   */
  static createImageAndTextLayout(
    imageFirst = true,
    className = "min-h-[200px] p-8 mx-auto flex justify-center items-center",
  ): ContentItem {
    const imageColumn = SlideComponentFactory.createColumn([
      SlideComponentFactory.createImage(),
    ]);

    const textColumn = SlideComponentFactory.createColumn(
      [
        SlideComponentFactory.createHeading(1),
        SlideComponentFactory.createParagraph(),
      ],
      "w-full h-full p-8 flex justify-center items-center",
    );

    const columns = imageFirst
      ? [imageColumn, textColumn]
      : [textColumn, imageColumn];

    return SlideComponentFactory.createColumn(
      [SlideComponentFactory.createResizableColumn(columns)],
      className,
    );
  }

  /**
   * Creates accent layouts (left or right positioned content)
   */
  static createAccentLayout(
    position: "left" | "right",
    className = "p-4 mx-auto flex justify-center items-center",
  ): ContentItem {
    const textContent = [
      SlideComponentFactory.createHeading(1),
      SlideComponentFactory.createParagraph(),
    ];

    const imageContent = [SlideComponentFactory.createImage()];

    const columns =
      position === "left"
        ? [
            SlideComponentFactory.createColumn(textContent),
            SlideComponentFactory.createColumn(imageContent),
          ]
        : [
            SlideComponentFactory.createColumn(imageContent),
            SlideComponentFactory.createColumn(textContent),
          ];

    return SlideComponentFactory.createColumn(
      [SlideComponentFactory.createResizableColumn(columns)],
      className,
    );
  }

  /**
   * Creates a table layout
   */
  static createTableLayout(
    initialRows = 2,
    initialColumns = 2,
    className = "p-8 mx-auto flex flex-col justify-center items-center min-h-[400px]",
  ): ContentItem {
    return SlideComponentFactory.createColumn(
      [SlideComponentFactory.createTable(initialRows, initialColumns)],
      className,
    );
  }
}
