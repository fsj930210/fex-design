import { Radio, RadioButton, RadioGroup } from '@fex-design/solid/primitive/radio'
export default function Example() {
  return (
    <div class="grid gap-4">
      <section class="grid gap-2">
        <span>Radio</span>
        <RadioGroup aria-invalid={props.invalid} defaultValue="apple" orientation="horizontal">
          <label class="inline-flex items-center gap-2">
            <Radio aria-invalid={props.invalid} value="apple" />
            苹果
          </label>
          <label class="inline-flex items-center gap-2">
            <Radio aria-invalid={props.invalid} value="pear" />梨
          </label>
        </RadioGroup>
      </section>
      <section class="grid gap-2">
        <span>RadioButton</span>
        <RadioGroup
          aria-invalid={props.invalid}
          defaultValue="apple"
          orientation="horizontal"
          class="gap-0"
        >
          <RadioButton aria-invalid={props.invalid} value="apple">
            苹果
          </RadioButton>
          <RadioButton aria-invalid={props.invalid} value="pear">
            梨
          </RadioButton>
        </RadioGroup>
      </section>
    </div>
  )
}
