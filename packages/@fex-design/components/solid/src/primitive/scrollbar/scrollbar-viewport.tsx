import { scrollbarViewportClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { createMemo, splitProps, useContext, type JSX, type ParentProps } from 'solid-js'
import type { ScrollbarOverflow } from '@fex-design/core/scrollbar/types'
import { resolveScrollbarOverflow } from '@fex-design/core/scrollbar/create-scrollbar-controller'
import { ScrollbarContext } from './scrollbar-context'

export interface ScrollbarViewportProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  overflow?: ScrollbarOverflow
}

export function ScrollbarViewport(props: ScrollbarViewportProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'overflow'])
  const parent = useContext(ScrollbarContext)
  const overflow = createMemo(() => resolveScrollbarOverflow(local.overflow, parent()))
  return (
    <div
      {...rest}
      data-slot="scrollbar-viewport"
      class={cn(
        scrollbarViewportClassName({ overflowX: overflow().x, overflowY: overflow().y }),
        local.class,
      )}
    >
      {local.children}
    </div>
  )
}
