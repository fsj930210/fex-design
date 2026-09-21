import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/react/primitive/slider'
import { useState } from 'react'

function Demo({ value, defaultValue, marks = [], disabled = false, ...props }: any) {
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
      <SliderTrack className={props.trackClass}>
        <SliderRange />
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
  const [value, setValue] = useState([42])
  const [ended, setEnded] = useState([42])
  return (
    <div className="grid w-full max-w-xl gap-4">
      <Demo
        value={value}
        min={0}
        max={100}
        step={1}
        onChange={(next: any) => setValue(next)}
        onEnd={(next: any) => setEnded(next)}
      />
      <p>
        当前值：{String(value)}；结束值：{String(ended)}
      </p>
      <Demo defaultValue={[60]} keyboard={false} />
    </div>
  )
}
