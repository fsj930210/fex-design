import type { CSSProperties } from 'react'
import { Checkbox, CheckboxGroup } from '@fex-design/react/ui/checkbox'

export default function Example() {
  return <div className="grid gap-3"><Checkbox defaultChecked style={{ '--checkbox-size': '1.25rem', '--checkbox-checked-background': '#7c3aed', '--checkbox-indicator-color': 'white' } as CSSProperties}>品牌色 Checkbox</Checkbox></div>
}
