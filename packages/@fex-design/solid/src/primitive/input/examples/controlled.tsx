import { createSignal } from 'solid-js'
import { Button } from '@fex-design/solid/primitive/button'
import { InputClear, InputControl, InputRoot } from '@fex-design/solid/primitive/input'

export function ControlledExample() {
  const [value, setValue] = createSignal('受控内容')
  return (
    <div class="grid w-full gap-3">
      <InputRoot value={value()} onValueChange={setValue}>
        <InputControl />
        <InputClear />
      </InputRoot>
      <InputRoot defaultValue="非受控内容">
        <InputControl />
        <InputClear />
      </InputRoot>
      <div class="flex gap-2">
        <Button onClick={() => setValue('外部设置')}>外部设置</Button>
        <Button onClick={() => setValue('')}>外部清空</Button>
      </div>
    </div>
  )
}
