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
        onChange={(e) => setText(e.target.value)}
      />
      <Stack gap="2">
        <Button onClick={handleSubmit} alignSelf="flex-end" colorPalette="teal">
          Copy
        </Button>
        <Button onClick={handleSubmit} alignSelf="flex-end" colorPalette="teal">
          Re-Generate
        </Button>
      </Stack>
    </Flex>
  );
};

export default CopyText;
