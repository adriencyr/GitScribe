import { Button, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

type UploadFileProps = {
  handleChangeEvent: (event: React.ChangeEvent<HTMLInputElement>, fileName:String) => void;
  fileName: String;
};

const UploadFile = ({handleChangeEvent, fileName}: UploadFileProps) => {
  return (
    <FileUpload.Root directory>
      <FileUpload.HiddenInput onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleChangeEvent(e,fileName)}} />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload the old file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  );
};
export default UploadFile;
