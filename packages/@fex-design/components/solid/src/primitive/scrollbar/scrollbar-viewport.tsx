import { scrollbarViewportClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export type Overflow = 'auto' | 'hidden'

export interface ScrollbarViewportProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  overflowX?: Overflow
  overflowY?: Overflow
}

export function ScrollbarViewport(props: ScrollbarViewportProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'overflowX', 'overflowY'])
  return (
    <div
      {...rest}
      data-slot="scrollbar-viewport"
      class={cn(
        scrollbarViewportClassName({ overflowX: local.overflowX, overflowY: local.overflowY }),
        local.class,
      )}
    >
      {local.children}
    </div>
  )
}
