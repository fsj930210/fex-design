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
    <div class="grid w-full max-w-xl gap-6">
      <PrimitiveSlider size="sm" defaultValue={25} />
      <PrimitiveSlider size="md" defaultValue={50} />
      <PrimitiveSlider size="lg" defaultValue={75} />
    </div>
  )
}
