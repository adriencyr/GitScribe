"use client";

import { Button, FileUpload, Stack } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

const UploadFile = () => {
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
        <FileUpload.HiddenInput />

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
