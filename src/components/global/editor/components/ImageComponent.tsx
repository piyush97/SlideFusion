import Image from "next/image";
import UploadImage from "./UploadImage";

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (
    newContent: string | string[] | string[][],
    contentId: string
  ) => void;
  isEditable?: boolean;
};

const ImageComponent = ({
  src,
  alt,
  className,
  isPreview = false,
  contentId,
  onContentChange,
  isEditable = true,
}: Props) => {
  return (
    <div className="relative w-full h-full rounded-lg group">
      <Image
        src={src}
        alt={alt}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        className={`object-cover w-full h-full rounded-lg ${className}`}
      />
      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block">
          <UploadImage />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
