import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarBarClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { useScrollbarContext } from './scrollbar-context'
import { ScrollbarTrack } from './scrollbar-track'
import { ScrollbarThumb } from './scrollbar-thumb'

export interface ScrollbarBarProps extends HTMLAttributes<HTMLDivElement> {
  axis: ScrollbarAxis
  children?: ReactNode
}

export function ScrollbarBar({ axis, className, children, ...props }: ScrollbarBarProps) {
  useScrollbarContext()
  return (
    <div
      {...props}
      data-slot="scrollbar-bar"
      data-axis={axis}
      data-visible="false"
      className={cn(scrollbarBarClassName({ axis }), className)}
    >
      {children ?? (
        <ScrollbarTrack axis={axis}>
          <ScrollbarThumb axis={axis} />
        </ScrollbarTrack>
      )}
    </div>
  )
}
