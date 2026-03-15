import { NumberInput } from "@chakra-ui/react"

type NumberInputComponentProp = {
  handleNumberInputChangeEvent: (value:string) => void;
}

const NumberInputComponent = ({handleNumberInputChangeEvent}:NumberInputComponentProp) => {
  return (
    <NumberInput.Root defaultValue="10" width="200px" onValueChange={(details) => {handleNumberInputChangeEvent(details.value)}}>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

export default NumberInputComponent;