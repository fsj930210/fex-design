import { useState } from 'react'
import { Checkbox, CheckboxGroup } from '@fex-design/react/ui/checkbox'

const values = ['read', 'write', 'publish']
export default function Example() {
  const [selected, setSelected] = useState<string[]>(['read'])
  const all = selected.length === values.length
  return (
    <div className="grid gap-3">
      <Checkbox
        checked={all}
        indeterminate={selected.length > 0 && !all}
        onChange={(event) => setSelected(event.currentTarget.checked ? values : [])}
      >
        全部权限
      </Checkbox>
      <CheckboxGroup
        value={selected}
        onChange={setSelected}
        options={values.map((value) => ({ value, label: value }))}
      />
    </div>
  )
}
