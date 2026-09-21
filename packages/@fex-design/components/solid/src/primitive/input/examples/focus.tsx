import { Button } from '@fex-design/solid/primitive/button'
import { InputControl, InputRoot } from '@fex-design/solid/primitive/input'

export function FocusExample() {
  let ref!: HTMLInputElement
  return (
    <div class="grid w-full gap-3">
      <InputRoot defaultValue="通过 ref 控制">
        <InputControl ref={ref} />
      </InputRoot>
      <div class="flex gap-2">
        <Button onClick={() => ref.focus()}>聚焦</Button>
        <Button onClick={() => ref.blur()}>失焦</Button>
        <Button onClick={() => ref.select()}>全选</Button>
      </div>
    </div>
  )
}
