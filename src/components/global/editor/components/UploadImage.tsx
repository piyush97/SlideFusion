import "@uploadcare/react-uploader/core.css";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";

type Props = {
  contentId: string;
  onContentChange: (
    newContent: string | string[] | string[][],
    contentId: string,
  ) => void;
};

const UploadImage = ({ contentId, onContentChange }: Props) => {
  const handleChangeEvent = (e: { cdnUrl: string | string[] | string[][] }) => {
    onContentChange(e.cdnUrl, contentId);
  };
  return (
    <FileUploaderRegular
      sourceList="local, camera, facebook, gdrive"
      cameraModes="photo"
      classNameUploader="uc-light"
      pubkey={process.env.UPLOADCARE_PUBLIC_KEY!}
      multiple={false}
      onFileUploadSuccess={handleChangeEvent}
      maxLocalFileSizeBytes={10 * 1024 * 1024}
    />
  );
};

export default UploadImage;
