import { RadioButton, RadioGroup } from '@fex-design/solid/primitive/radio'
export default function Example() {
  return (
    <RadioGroup defaultValue="apple" orientation="horizontal" class="gap-0">
      <RadioButton value="apple">苹果</RadioButton>
      <RadioButton value="pear">梨</RadioButton>
    </RadioGroup>
  )
}
