import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/solid/primitive/slider'
import { Checkbox } from '@fex-design/solid/ui/checkbox'
import { createSignal, For } from 'solid-js'
function PrimitiveSlider(props: any) {
  const values = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue ?? 0]
  const disabledThumbs = Array.isArray(props.disabled) ? props.disabled : []
  return (
    <SliderRoot
      {...props}
      defaultValue={values}
      disabled={props.disabled === true}
      disabledThumbs={disabledThumbs}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      {values.map((_: number, index: number) => (
        <SliderThumb
          index={index}
          disabled={disabledThumbs[index]}
          aria-label={`滑块 ${index + 1}`}
        />
      ))}
    </SliderRoot>
  )
}
export default function Example() {
  const [disabledThumbs, setDisabledThumbs] = createSignal([true, true, true])
  const toggle = (index: number) =>
    setDisabledThumbs((current) => current.map((value, item) => (item === index ? !value : value)))
  return (
    <div class="grid w-full max-w-2xl gap-10">
      <section class="grid gap-4">
        <h4>整体禁用</h4>
        <PrimitiveSlider defaultValue={40} disabled />
      </section>
      <section class="grid gap-4">
        <h4>禁用指定 Thumb</h4>
        <div class="flex flex-wrap gap-4">
          <For each={disabledThumbs()}>
            {(checked, index) => (
              <Checkbox checked={checked} onChange={() => toggle(index())}>
                Thumb {index() + 1}
              </Checkbox>
            )}
          </For>
        </div>
        <PrimitiveSlider defaultValue={[20, 50, 80]} disabled={disabledThumbs()} />
      </section>
    </div>
  )
}
