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
        <CheckboxControl defaultChecked />
        <CheckboxIndicator>
          <span class="text-xs">★</span>
        </CheckboxIndicator>
        <CheckboxLabel>收藏项目</CheckboxLabel>
      </CheckboxRoot>
    </div>
  )
}
