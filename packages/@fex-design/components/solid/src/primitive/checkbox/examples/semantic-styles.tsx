import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/solid/primitive/checkbox'

export function CheckboxSemanticStylesExample() {
  return (
    <CheckboxRoot class="gap-3">
      <CheckboxControl
        defaultChecked
        class="ring-2 ring-orange-300"
        style={{ 'background-color': '#ea580c', 'border-color': '#c2410c' }}
      />
      <CheckboxIndicator class="drop-shadow-sm" style={{ color: '#ffffff' }} />
      <CheckboxLabel class="font-bold" style={{ color: '#6d28d9' }}>
        结构化样式
      </CheckboxLabel>
    </CheckboxRoot>
  )
}
