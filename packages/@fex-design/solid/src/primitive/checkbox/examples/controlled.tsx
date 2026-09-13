import { createSignal } from 'solid-js'
import { Button } from '@fex-design/solid/primitive/button'
import { CheckboxControl, CheckboxIndicator, CheckboxLabel, CheckboxRoot } from '@fex-design/solid/primitive/checkbox'

export default function Example() {
  const [checked, setChecked] = createSignal(true)
  return <div class="grid gap-3"><div class="flex gap-2"><Button size="sm" onClick={() => setChecked(true)}>选中</Button><Button size="sm" onClick={() => setChecked(false)}>取消选中</Button></div><CheckboxRoot><CheckboxControl checked={checked()} onChange={(event) => setChecked(event.currentTarget.checked)} /><CheckboxIndicator /><CheckboxLabel>受控 Checkbox</CheckboxLabel></CheckboxRoot><CheckboxRoot><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>非受控：默认选中</CheckboxLabel></CheckboxRoot></div>
}
