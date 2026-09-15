import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/solid/primitive/slider'
import { createSignal, For } from 'solid-js'
export default function Example() {
  const [values, setValues] = createSignal([20, 50, 80])
  return (
    <div class="grid w-full max-w-xl gap-3">
      <SliderRoot value={values()} editable minCount={2} maxCount={5} onChange={setValues}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
        <For each={values()}>{(_, index) => <SliderThumb index={index()} aria-label={`滑块 ${index() + 1}`} />}</For>
      </SliderRoot>
      <p>当前节点：{values().join('、')}</p>
    </div>
  )
}
