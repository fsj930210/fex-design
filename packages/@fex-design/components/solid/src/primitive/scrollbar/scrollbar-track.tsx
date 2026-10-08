import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarTrackClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function ScrollbarTrack(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>> & { axis: ScrollbarAxis },
) {
  const [local, rest] = splitProps(props, ['class', 'children', 'axis'])
  return (
    <div {...rest} data-slot="scrollbar-track" class={cn(scrollbarTrackClassName, local.class)}>
      {local.children}
    </div>
  )
}
