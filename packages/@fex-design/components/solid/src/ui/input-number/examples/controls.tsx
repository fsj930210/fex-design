import { InputNumber } from '@fex-design/solid/ui/input-number'
export function ControlsExample() {
  return (
    <div class="grid w-full gap-3">
      <p>默认控制</p>
      <InputNumber defaultValue={8} />
      <p>隐藏控制</p>
      <InputNumber defaultValue={8} controls={false} />
    </div>
  )
}
