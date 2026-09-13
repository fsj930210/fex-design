import { useState } from 'react'
import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/react/primitive/checkbox'

const values = ['read', 'write', 'publish']
function Item({ value }: { value: string }) { return <CheckboxRoot value={value}><CheckboxControl /><CheckboxIndicator /><CheckboxLabel>{value}</CheckboxLabel></CheckboxRoot> }
export default function Example() {
  const [selected, setSelected] = useState<string[]>(['read'])
  const all = selected.length === values.length
  return <div className="grid gap-3"><CheckboxRoot><CheckboxControl checked={all} indeterminate={selected.length > 0 && !all} onChange={(event) => setSelected(event.currentTarget.checked ? values : [])} /><CheckboxIndicator /><CheckboxLabel>全部权限</CheckboxLabel></CheckboxRoot><CheckboxGroup value={selected} onChange={setSelected}>{values.map((value) => <Item key={value} value={value} />)}</CheckboxGroup></div>
}
