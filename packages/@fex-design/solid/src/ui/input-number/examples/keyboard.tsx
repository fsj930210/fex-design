import { InputNumber } from '@fex-design/solid/ui/input-number'
export function KeyboardExample() {
  return (
    <div class="grid w-full gap-2">
      <p>ArrowUp 增加，ArrowDown 减少</p>
      <InputNumber defaultValue={5} />
    </div>
  )
}
