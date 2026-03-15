"use client";

import { Button, Flex, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const CopyText = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <Flex gap="4" align="flex-start">
      <Textarea
        placeholder="Result from GitScribe..."
        minH="150px"
        value={text}
        readOnly
        cursor="default"
      />

      <Stack gap="2">
        <Button onClick={handleSubmit} colorPalette="teal">
          Copy
        </Button>

        <Button onClick={handleSubmit} colorPalette="teal">
          Re-Generate
        </Button>
      </Stack>
    </Flex>
  );
};

export default CopyText;
