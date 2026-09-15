import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/react/primitive/slider'
import { useState } from 'react'

function Demo({ value, defaultValue, marks = [], disabled = false, dots = false, included = true, ...props }: any) {
  const values = value ?? defaultValue ?? [0]
  return (
    <SliderRoot
      value={value}
      defaultValue={defaultValue}
      marks={marks.map((mark: any) => mark.value)}
      disabled={disabled === true}
      disabledThumbs={Array.isArray(disabled) ? disabled : []}
      {...props}
    >
      <SliderTrack>
        {included && <SliderRange />}
        {dots && props.step != null && Array.from({ length: Math.floor(100 / props.step) + 1 }, (_, index) => (
          <SliderMark key={`dot-${index}`} value={index * props.step} aria-hidden="true" />
        ))}
        {marks.map((mark: any) => (
          <SliderMark key={mark.value} value={mark.value}>
            {mark.label}
          </SliderMark>
        ))}
      </SliderTrack>
      {values.map((_: number, index: number) => (
        <SliderThumb
          key={index}
          index={index}
          disabled={Array.isArray(disabled) && disabled[index]}
          aria-label={`滑块 ${index + 1}`}
        />
      ))}
    </SliderRoot>
  )
}
export default function Example() {
  const [recommended, setRecommended] = useState(37)
  const marks = [
    { value: 0, label: '0°C' },
    { value: 26, label: '26°C' },
    { value: recommended, label: `建议 ${recommended}°C` },
    { value: 100, label: '100°C' },
  ]
  return (
    <div className="grid w-full max-w-2xl gap-8 pb-6">
      <button onClick={() => setRecommended((value) => (value === 37 ? 60 : 37))}>
        将建议刻度移到 {recommended === 37 ? 60 : 37}°C
      </button>
      <section className="grid gap-4"><h4>included=true（单值与范围）</h4><Demo defaultValue={[37]} marks={marks} /><Demo defaultValue={[26, 37]} marks={marks} /></section>
      <section className="grid gap-4"><h4>included=false（刻度彼此独立）</h4><Demo defaultValue={[37]} marks={marks} included={false} /></section>
      <section className="grid gap-4"><h4>marks &amp; step（步长与刻度并存）</h4><Demo defaultValue={[37]} marks={marks} dots step={10} /></section>
      <section className="grid gap-4"><h4>step=null（只能落在标记点）</h4><Demo defaultValue={[37]} marks={marks} step={null} /></section>
    </div>
  )
}
