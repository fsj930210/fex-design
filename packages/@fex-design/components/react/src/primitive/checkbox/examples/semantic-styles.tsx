import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/react/primitive/checkbox'

export function CheckboxSemanticStylesExample() {
  return (
    <CheckboxRoot className="gap-3">
      <CheckboxControl
        defaultChecked
        className="ring-2 ring-orange-300"
        style={{ backgroundColor: '#ea580c', borderColor: '#c2410c' }}
      />
      <CheckboxIndicator className="drop-shadow-sm" style={{ color: '#ffffff' }} />
      <CheckboxLabel className="font-bold" style={{ color: '#6d28d9' }}>
        结构化样式
      </CheckboxLabel>
    </CheckboxRoot>
  )
}
