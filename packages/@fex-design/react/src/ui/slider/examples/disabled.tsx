import { Slider } from '@fex-design/react/ui/slider'
import { Checkbox } from '@fex-design/react/ui/checkbox'
import { useState } from 'react'

export default function Example() {
  const [disabledThumbs, setDisabledThumbs] = useState([true, true, true])
  const toggle = (index: number) =>
    setDisabledThumbs((current) => current.map((value, item) => item === index ? !value : value))
  return (
    <div className="grid w-full max-w-2xl gap-10">
      <section className="grid gap-4"><h4>整体禁用</h4><Slider defaultValue={40} disabled /></section>
      <section className="grid gap-4"><h4>禁用指定 Thumb</h4><div className="flex flex-wrap gap-4">{disabledThumbs.map((checked, index) => <Checkbox key={index} checked={checked} onChange={() => toggle(index)}>Thumb {index + 1}</Checkbox>)}</div><Slider defaultValue={[20, 50, 80]} disabled={disabledThumbs} /></section>
    </div>
  )
}
