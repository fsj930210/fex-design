import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarTrackClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'

export interface ScrollbarTrackProps extends HTMLAttributes<HTMLDivElement> {
  axis: ScrollbarAxis
}

export function ScrollbarTrack({ axis, className, ...props }: ScrollbarTrackProps) {
  return (
    <div
      {...props}
      data-slot="scrollbar-track"
      data-axis={axis}
      className={cn(scrollbarTrackClassName, className)}
    />
  )
}
