import { createSignal } from 'solid-js'
import { Button } from '@fex-design/solid/ui/button'
import { Checkbox } from '@fex-design/solid/ui/checkbox'

export default function Example() {
  const [checked, setChecked] = createSignal(true)
  return (
    <div class="grid gap-3">
      <div class="flex gap-2">
        <Button size="sm" onClick={() => setChecked(true)}>
          选中
        </Button>
        <Button size="sm" onClick={() => setChecked(false)}>
          取消选中
        </Button>
      </div>
      <Checkbox checked={checked()} onChange={(event) => setChecked(event.currentTarget.checked)}>
        受控 Checkbox
      </Checkbox>
      <Checkbox defaultChecked>非受控：默认选中</Checkbox>
    </div>
  )
}
