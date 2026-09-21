import { createSignal } from 'solid-js'
import { Input } from '@fex-design/solid/ui/input'
import { Button } from '@fex-design/solid/ui/button'
export function ControlledExample() {
  const [value, setValue] = createSignal('受控内容')
  return (
    <div class="grid w-full gap-3">
      <Input value={value()} onValueChange={setValue} clearable />
      <Input defaultValue="非受控内容" clearable />
      <div class="flex gap-2">
        <Button onClick={() => setValue('外部设置')}>外部设置</Button>
        <Button onClick={() => setValue('')}>外部清空</Button>
      </div>
    </div>
  )
}
