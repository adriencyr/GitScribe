"use client";

import { Button, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const CopyText = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <Stack gap="6" align="stretch">
      <Textarea
        placeholder="Paste your text here..."
        minH="220px"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button onClick={handleSubmit} width="full" colorPalette="teal">
        Submit
      </Button>
    </Stack>
  );
};

export default CopyText;
