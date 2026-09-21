import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/solid/primitive/slider'
import { createSignal } from 'solid-js'
function PrimitiveSlider(props: any) {
  const values = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue ?? 0]
  return (
    <SliderRoot {...props} defaultValue={values}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      {values.map((_: number, index: number) => (
        <SliderThumb index={index} aria-label={`滑块 ${index + 1}`} />
      ))}
    </SliderRoot>
  )
}
export default function Example() {
  const [value, setValue] = createSignal([42])
  const [ended, setEnded] = createSignal([42])
  return (
    <div class="grid w-full max-w-xl gap-4">
      <PrimitiveSlider value={value()} onChange={setValue} onEnd={setEnded} />
      <p>
        当前值：{value()[0]}；结束值：{ended()[0]}
      </p>
      <PrimitiveSlider defaultValue={60} keyboard={false} />
    </div>
  )
}
