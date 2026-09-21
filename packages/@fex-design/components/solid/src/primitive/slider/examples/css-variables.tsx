import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/solid/primitive/slider'
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
  return (
    <PrimitiveSlider
      defaultValue={45}
      class="[--slider-track-height:10px] [--slider-track-background:#fed7aa] [--slider-range-background:#2563eb] [--slider-thumb-size:24px] [--slider-thumb-background:white] [--slider-thumb-border-color:#1d4ed8]"
    />
  )
}
