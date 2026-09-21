import { Slider } from '@fex-design/solid/ui/slider'
import { createSignal } from 'solid-js'
export default function Example() {
  const [value, setValue] = createSignal(42)
  const [ended, setEnded] = createSignal(42)
  return (
    <div class="grid w-full max-w-xl gap-4">
      <Slider
        value={value()}
        onChange={(next) => typeof next === 'number' && setValue(next)}
        onEnd={(next) => typeof next === 'number' && setEnded(next)}
      />
      <p>
        当前值：{value()}；结束值：{ended()}
      </p>
      <Slider defaultValue={60} keyboard={false} />
    </div>
  )
}
