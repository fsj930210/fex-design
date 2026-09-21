import { Slider } from '@fex-design/react/ui/slider'
import { useState } from 'react'

export default function Example() {
  return (
    <Slider
      defaultValue={45}
      className="[--slider-track-height:10px] [--slider-track-background:#fed7aa] [--slider-range-background:#2563eb] [--slider-thumb-size:24px] [--slider-thumb-background:white] [--slider-thumb-border-color:#1d4ed8]"
    />
  )
}
