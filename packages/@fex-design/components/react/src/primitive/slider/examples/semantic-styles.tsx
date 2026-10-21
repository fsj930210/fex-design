import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderMark,
  SliderThumb,
} from '@fex-design/react/primitive/slider'
export function SliderSemanticStylesExample() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <SliderRoot defaultValue={[55]} marks={[25, 75]} className="rounded-lg bg-muted p-6">
        <SliderTrack className="bg-amber-200">
          <SliderRange className="bg-violet-600"></SliderRange>
          <SliderMark value={25} className="text-violet-700">
            低
          </SliderMark>
          <SliderMark value={75} className="text-violet-700">
            高
          </SliderMark>
        </SliderTrack>
        <SliderThumb
          index={0}
          aria-label="滑块 1"
          className="border-violet-600"
          style={{ boxShadow: '0 0 0 4px rgb(124 58 237 / 20%)' }}
        ></SliderThumb>
      </SliderRoot>
      <p className="text-sm text-muted-foreground">
        紫色轨道与刻度由 classNames 定制，Thumb 外圈由 styles 定制。
      </p>
    </div>
  )
}
