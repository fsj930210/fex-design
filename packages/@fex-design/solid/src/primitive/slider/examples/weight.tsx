import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/solid/primitive/slider'
import { createSignal } from 'solid-js'
export default function Example() {
  const [value, setValue] = createSignal([40])
  const left = () => value()[0]!
  return (
    <div class="grid w-full max-w-xl gap-3">
      <div class="flex justify-between"><span>模型准确率 {left()}%</span><span>响应速度 {100 - left()}%</span></div>
      <SliderRoot value={value()} onChange={setValue}>
        <SliderTrack class="bg-orange-500"><SliderRange class="bg-blue-500" /></SliderTrack>
        <SliderThumb aria-label="模型权重分配" aria-valuetext={`模型准确率 ${left()}%，响应速度 ${100 - left()}%`} />
      </SliderRoot>
    </div>
  )
}
