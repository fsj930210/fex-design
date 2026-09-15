import { Slider } from '@fex-design/react/ui/slider'
import { useState } from 'react'

export default function Example() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Slider defaultValue={[20, 80]} step={5} minStepsBetweenThumbs={2} />
      <Slider defaultValue={[15, 40, 70]} />
    </div>
  )
}
