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
      <CheckboxRoot
        style={{
          '--checkbox-size': '1.25rem',
          '--checkbox-checked-background': '#7c3aed',
          '--checkbox-indicator-color': 'white',
        }}
      >
        <CheckboxControl defaultChecked />
        <CheckboxIndicator />
        <CheckboxLabel>品牌色 Checkbox</CheckboxLabel>
      </CheckboxRoot>
    </div>
  )
}
