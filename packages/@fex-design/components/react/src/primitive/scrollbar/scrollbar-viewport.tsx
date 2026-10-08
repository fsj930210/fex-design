import { scrollbarViewportClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, Ref } from 'react'
import { useScrollbarContext, type Overflow } from './scrollbar-context'

export interface ScrollbarViewportProps extends HTMLAttributes<HTMLDivElement> {
  overflow?: { x?: Overflow; y?: Overflow }
  ref?: Ref<HTMLDivElement>
}

export function ScrollbarViewport({ overflow, className, ref, ...props }: ScrollbarViewportProps) {
  const context = useScrollbarContext()
  const resolvedOverflow = overflow ?? context.overflow
  return (
    <div
      {...props}
      ref={ref}
      data-slot="scrollbar-viewport"
      className={cn(
        scrollbarViewportClassName({
          overflowX: resolvedOverflow?.x,
          overflowY: resolvedOverflow?.y,
        }),
        className,
      )}
    />
  )
}
