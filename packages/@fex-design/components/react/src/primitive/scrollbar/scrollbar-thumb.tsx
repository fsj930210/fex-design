import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarThumbClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, RefAttributes } from 'react'

export interface ScrollbarThumbProps extends HTMLAttributes<HTMLDivElement>, RefAttributes<HTMLDivElement> {
  axis: ScrollbarAxis
}

export function ScrollbarThumb({ axis, className, ...props }: ScrollbarThumbProps) {
  return (
    <div
      {...props}
      data-slot="scrollbar-thumb"
      data-axis={axis}
      className={cn(scrollbarThumbClassName({ axis }), className)}
    />
  )
}
