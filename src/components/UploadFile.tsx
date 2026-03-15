"use client";

import { Button, FileUpload, Stack } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

type UploadFileProps = {
  handleChangeEvent: (event: React.ChangeEvent<HTMLInputElement>, fileName:String) => void;
  fileName: String;
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
            <HiUpload /> Upload file
          </Button>
        </FileUpload.Trigger>

        <FileUpload.List />
      </FileUpload.Root>

      <Button colorPalette="teal" type="submit" alignSelf="flex-end">
        Submit
      </Button>
    </Stack>
  );
};

export default UploadFile;
