import { Box, Tabs } from "@chakra-ui/react";
import CopyText from "./CopyText";
import UploadForm from "./UploadForm";

const SubmissionInput = () => {
  return (
    <Box mt="6">
      <Tabs.Root defaultValue="file" variant="outline">
        <Tabs.List>
          <Tabs.Trigger value="file">File Upload</Tabs.Trigger>
          <Tabs.Trigger value="text">Copy Text</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="file">
          <Box mt="4">
            <UploadForm />
          </Box>
        </Tabs.Content>

        <Tabs.Content value="text">
          <Box mt="4">
            <CopyText />
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default SubmissionInput;
