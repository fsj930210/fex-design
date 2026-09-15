import type { CSSProperties } from 'react'
import {
  CheckboxControl,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/react/primitive/checkbox'

export default function Example() {
  return (
    <div className="grid gap-3">
      <CheckboxRoot
        style={
          {
            '--checkbox-size': '1.25rem',
            '--checkbox-checked-background': '#7c3aed',
            '--checkbox-indicator-color': 'white',
          } as CSSProperties
        }
      >
        <CheckboxControl defaultChecked />
        <CheckboxIndicator />
        <CheckboxLabel>品牌色 Checkbox</CheckboxLabel>
      </CheckboxRoot>
    </div>
  )
}
