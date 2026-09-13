import { createSignal } from 'solid-js'
import { CheckboxControl, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/solid/primitive/checkbox'

const values = ['read', 'write', 'publish']
function Item(props: { value: string }) { return <CheckboxRoot value={props.value}><CheckboxControl /><CheckboxIndicator /><CheckboxLabel>{props.value}</CheckboxLabel></CheckboxRoot> }
export default function Example() {
  const [selected, setSelected] = createSignal<string[]>(['read'])
  const all = () => selected().length === values.length
  return <div class="grid gap-3"><CheckboxRoot><CheckboxControl checked={all()} indeterminate={selected().length > 0 && !all()} onChange={(event) => setSelected(event.currentTarget.checked ? values : [])} /><CheckboxIndicator /><CheckboxLabel>全部权限</CheckboxLabel></CheckboxRoot><CheckboxGroup value={selected()} onChange={setSelected}>{values.map((value) => <Item value={value} />)}</CheckboxGroup></div>
}
