import { Button, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

const UploadFile = () => {
  return (
    <FileUpload.Root directory>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  );
};
export default UploadFile;
