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
      <section dir="ltr">
        <p>中文 LTR</p>
        <PrimitiveSlider defaultValue={30} />
      </section>
      <section dir="rtl">
        <p>العربية RTL</p>
        <PrimitiveSlider defaultValue={30} />
      </section>
      <section>
        <p>Reverse</p>
        <PrimitiveSlider defaultValue={30} reverse />
      </section>
      <div class="flex h-48 gap-12">
        <section class="grid gap-2">
          <p>垂直</p>
          <PrimitiveSlider orientation="vertical" defaultValue={35} />
        </section>
        <section class="grid gap-2">
          <p>垂直 Reverse</p>
          <PrimitiveSlider orientation="vertical" reverse defaultValue={35} />
        </section>
      </div>
    </div>
  )
}
