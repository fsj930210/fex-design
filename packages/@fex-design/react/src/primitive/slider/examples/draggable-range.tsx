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
  return <Demo defaultValue={[20, 50]} draggableRange />
}
