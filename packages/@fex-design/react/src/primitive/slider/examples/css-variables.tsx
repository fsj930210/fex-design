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
  return (
    <Demo
      defaultValue={[45]}
      className="[--slider-track-height:10px] [--slider-track-background:#fed7aa] [--slider-range-background:#2563eb] [--slider-thumb-size:24px] [--slider-thumb-background:white] [--slider-thumb-border-color:#1d4ed8]"
    />
  )
}
