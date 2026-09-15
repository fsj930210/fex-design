import { Slider } from '@fex-design/react/ui/slider'
import { useState } from 'react'

export default function Example() {
  const [value, setValue] = useState(42)
  const [ended, setEnded] = useState(42)
  return (
    <div className="grid w-full max-w-xl gap-4">
      <Slider
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
      <Slider defaultValue={60} keyboard={false} />
    </div>
  )
}
