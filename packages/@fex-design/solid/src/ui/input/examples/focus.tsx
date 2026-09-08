import { Input } from '@fex-design/solid/ui/input'
import { Button } from '@fex-design/solid/ui/button'
export function FocusExample() {
  let ref!: HTMLInputElement
  return (
    <div class="grid w-full gap-3">
      <Input ref={ref} defaultValue="通过 ref 控制" />
      <div class="flex gap-2">
        <Button onClick={() => ref.focus()}>聚焦</Button>
        <Button onClick={() => ref.blur()}>失焦</Button>
        <Button onClick={() => ref.select()}>全选</Button>
      </div>
    </div>
  )
}
