import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/react/primitive/slider'
import { useState } from 'react'

function Demo({ value, defaultValue, marks = [], disabled = false, trackClass, ...props }: any) {
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
      <SliderTrack className={trackClass}>
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
  const [value, setValue] = useState([40])
  const left = Array.isArray(value) ? value[0]! : value
  return (
    <div className="grid w-full max-w-xl gap-3">
      <div className="flex justify-between">
        <span>模型准确率 {left}%</span>
        <span>响应速度 {100 - left}%</span>
      </div>
      <Demo
        value={value}
        onChange={(next: any) => setValue(next)}
        trackClass="bg-orange-500 [&_[data-slot=slider-range]]:bg-blue-500"
      />
    </div>
  )
}
