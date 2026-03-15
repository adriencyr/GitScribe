import {Field ,NumberInput } from "@chakra-ui/react"

type NumberInputComponentProp = {
  handleNumberInputChangeEvent: (value: string) => void;
  numMsgs: string;
}

const NumberInputComponent = ({ handleNumberInputChangeEvent, numMsgs }: NumberInputComponentProp) => {
  return (
    <Field.Root>
      <Field.Label>Choose the number of commit messages</Field.Label>
      <NumberInput.Root defaultValue="10" width="200px" value={numMsgs} onValueChange={(details) => { handleNumberInputChangeEvent(details.value) }}>
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Field.Root>
  )
}

export default NumberInputComponent;