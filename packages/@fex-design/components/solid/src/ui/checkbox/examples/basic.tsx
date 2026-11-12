import { Checkbox, CheckboxGroup } from '@fex-design/solid/ui/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <Checkbox aria-invalid={props.invalid}>接收产品更新</Checkbox>
      <Checkbox aria-invalid={props.invalid} defaultChecked>
        接收安全提醒
      </Checkbox>
    </div>
  )
}
