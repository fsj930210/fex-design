import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/solid/primitive/checkbox'

export default function Example() {
  return (
    <div class="grid gap-3">
      <CheckboxRoot>
        <CheckboxControl />
        <CheckboxIndicator />
        <CheckboxLabel>接收产品更新</CheckboxLabel>
      </CheckboxRoot>
      <CheckboxRoot>
        <CheckboxControl defaultChecked />
        <CheckboxIndicator />
        <CheckboxLabel>接收安全提醒</CheckboxLabel>
      </CheckboxRoot>
    </div>
  )
}
