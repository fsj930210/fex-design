import { scrollbarViewportClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, Ref } from 'react'
import { useScrollbarContext } from './scrollbar-context'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'

export interface ScrollbarViewportProps extends HTMLAttributes<HTMLDivElement> {
  overflow?: ScrollbarOverflow
  ref?: Ref<HTMLDivElement>
}

export function ScrollbarViewport({ overflow, className, ref, ...props }: ScrollbarViewportProps) {
  const context = useScrollbarContext()
  const resolvedOverflow = resolveScrollbarOverflow(overflow, context.overflow)
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
