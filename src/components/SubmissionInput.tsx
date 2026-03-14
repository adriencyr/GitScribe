import { Button, HStack } from "@chakra-ui/react";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

const SubmissionInput = () => {
  return (
    <HStack>
      <Button colorPalette="teal" variant="solid">
        File Upload
        <RiArrowRightLine />
      </Button>
      <Button colorPalette="teal" variant="outline">
        Copy Text <RiArrowRightLine />
      </Button>
    </HStack>
  );
};

export default SubmissionInput;
