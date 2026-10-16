import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarBarClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode, RefAttributes } from 'react'

export interface ScrollbarBarProps extends HTMLAttributes<HTMLDivElement>, RefAttributes<HTMLDivElement> {
  axis: ScrollbarAxis
  children?: ReactNode
}

export function ScrollbarBar({ axis, className, children, ...props }: ScrollbarBarProps) {
  return (
    <div
      {...props}
      data-slot="scrollbar-bar"
      data-axis={axis}
      data-visible="false"
      className={cn(scrollbarBarClassName({ axis }), className)}
    >
      {children}
    </div>
  )
}
