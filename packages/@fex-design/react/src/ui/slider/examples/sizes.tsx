import { Slider } from '@fex-design/react/ui/slider'
import { useState } from 'react'

export default function Example() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Slider size="sm" defaultValue={25} />
      <Slider size="md" defaultValue={50} />
      <Slider size="lg" defaultValue={75} />
    </div>
  )
}
