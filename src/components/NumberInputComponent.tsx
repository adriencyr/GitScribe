import { NumberInput } from "@chakra-ui/react"

type NumberInputComponentProp = {
  handleNumberInputChangeEvent: (value:string) => void;
  numMsgs: string;
}

const NumberInputComponent = ({handleNumberInputChangeEvent, numMsgs}:NumberInputComponentProp) => {
  return (
    <NumberInput.Root defaultValue="10" width="200px" value={numMsgs} onValueChange={(details) => {handleNumberInputChangeEvent(details.value)}}>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

export default NumberInputComponent;