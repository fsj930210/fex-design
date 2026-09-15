import { createSignal } from 'solid-js'
import { Checkbox, CheckboxGroup } from '@fex-design/solid/ui/checkbox'
const values = ['read', 'write', 'publish']
export default function Example() {
  const [selected, setSelected] = createSignal<string[]>(['read'])
  const all = () => selected().length === values.length
  return (
    <div class="grid gap-3">
      <Checkbox
        checked={all()}
        indeterminate={selected().length > 0 && !all()}
        onChange={(event) => setSelected(event.currentTarget.checked ? values : [])}
      >
        全部权限
      </Checkbox>
      <CheckboxGroup
        value={selected()}
        onChange={setSelected}
        options={values.map((value) => ({ value, label: value }))}
      />
    </div>
  )
}
