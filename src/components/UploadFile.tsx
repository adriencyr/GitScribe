"use client";

import { Button, FileUpload, Stack } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

type UploadFileProps = {
  handleChangeEvent: (event: React.ChangeEvent<HTMLInputElement>, fileName:string) => void;
  fileName: string;
};

const UploadFile = ({handleChangeEvent, fileName}: UploadFileProps) => {
  return (
    <Stack gap="4" align="stretch">
      <FileUpload.Root
        accept={[
          ".java",
          ".py",
          ".c",
          ".cpp",
          ".js",
          ".ts",
          ".jsx",
          ".tsx",
          ".html",
          ".css",
        ]}
      >
        <FileUpload.HiddenInput onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleChangeEvent(e,fileName)}}/>

        <FileUpload.Trigger asChild>
          <Button variant="outline" size="sm" width="fit-content">
            <HiUpload /> Upload your {fileName=="newFile" ? "new file" : "old file"} here
          </Button>
        </FileUpload.Trigger>

        <FileUpload.List />
      </FileUpload.Root>
    </Stack>
  );
};

export default UploadFile;
