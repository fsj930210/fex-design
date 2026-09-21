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
    <div className="grid w-full max-w-xl gap-6">
      <section dir="ltr">
        <p>中文 LTR</p>
        <Demo defaultValue={[30]} />
      </section>
      <section dir="rtl">
        <p>العربية RTL</p>
        <Demo defaultValue={[30]} />
      </section>
      <section>
        <p>Reverse</p>
        <Demo defaultValue={[30]} reverse />
      </section>
      <div className="flex h-48 gap-12">
        <section className="grid gap-2">
          <p>垂直</p>
          <Demo orientation="vertical" defaultValue={[35]} />
        </section>
        <section className="grid gap-2">
          <p>垂直 Reverse</p>
          <Demo orientation="vertical" reverse defaultValue={[35]} />
        </section>
      </div>
    </div>
  )
}
