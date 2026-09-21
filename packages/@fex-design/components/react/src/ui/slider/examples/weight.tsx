import { Slider } from '@fex-design/react/ui/slider'
import { useState } from 'react'

export default function Example() {
  const [value, setValue] = useState(40)
  const left = Array.isArray(value) ? value[0]! : value
  return (
    <div className="grid w-full max-w-xl gap-3">
      <div className="flex justify-between">
        <span>模型准确率 {left}%</span>
        <span>响应速度 {100 - left}%</span>
      </div>
      <Slider
        value={value}
        onChange={(next: any) => setValue(next)}
        classNames={{ track: 'bg-orange-500', range: 'bg-blue-500' }}
      />
    </div>
  )
}
