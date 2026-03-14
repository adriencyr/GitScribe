"use client";

import { Button, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const CopyText = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <Stack gap="4" align="stretch">
      <Textarea
        placeholder="Paste your text here..."
        minH="100px"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button onClick={handleSubmit} alignSelf="flex-end" colorPalette="teal">
        Copy
      </Button>
      <Button onClick={handleSubmit} alignSelf="flex-end" colorPalette="teal">
       Re-Generate
      </Button>
    </Stack>
  );
};

export default CopyText;
