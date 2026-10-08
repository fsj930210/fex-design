import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarThumbClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function ScrollbarThumb(
  props: JSX.HTMLAttributes<HTMLDivElement> & { axis: ScrollbarAxis },
) {
  const [local, rest] = splitProps(props, ['class', 'axis'])
  return (
    <div
      {...rest}
      data-slot="scrollbar-thumb"
      class={cn(scrollbarThumbClassName({ axis: local.axis }), local.class)}
    />
  )
}
