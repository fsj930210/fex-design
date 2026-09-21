import {
  SliderMark,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@fex-design/react/primitive/slider'
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/react/primitive/checkbox'
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
  const [disabledThumbs, setDisabledThumbs] = useState([true, true, true])
  const toggle = (index: number) =>
    setDisabledThumbs((current) => current.map((value, item) => (item === index ? !value : value)))
  return (
    <div className="grid w-full max-w-2xl gap-10">
      <section className="grid gap-4">
        <h4>整体禁用</h4>
        <Demo defaultValue={[40]} disabled />
      </section>
      <section className="grid gap-4">
        <h4>禁用指定 Thumb</h4>
        <div className="flex flex-wrap gap-4">
          {disabledThumbs.map((checked, index) => (
            <CheckboxRoot key={index}>
              <CheckboxControl checked={checked} onChange={() => toggle(index)} />
              <CheckboxIndicator />
              <CheckboxLabel>Thumb {index + 1}</CheckboxLabel>
            </CheckboxRoot>
          ))}
        </div>
        <Demo defaultValue={[20, 50, 80]} disabled={disabledThumbs} />
      </section>
    </div>
  )
}
