import { Slider } from '@fex-design/react/ui/slider'
import { useState } from 'react'

export default function Example() {
  const [value, setValue] = useState([20, 50, 80])
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Slider
        value={value}
        editable
        minCount={2}
        maxCount={5}
        onChange={(next: any) => setValue(next)}
      />
      <p>当前节点：{value.join('、')}</p>
    </div>
  )
}
