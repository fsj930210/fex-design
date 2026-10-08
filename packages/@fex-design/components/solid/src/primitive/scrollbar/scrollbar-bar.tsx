import type { ScrollbarAxis } from '@fex-design/core/scrollbar/types'
import { scrollbarBarClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { ScrollbarTrack } from './scrollbar-track'
import { ScrollbarThumb } from './scrollbar-thumb'

export interface ScrollbarBarProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  axis: ScrollbarAxis
}

export function ScrollbarBar(props: ScrollbarBarProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'axis'])
  return (
    <div
      {...rest}
      data-slot="scrollbar-bar"
      data-axis={local.axis}
      data-visible="false"
      class={cn(scrollbarBarClassName({ axis: local.axis }), local.class)}
    >
      {local.children ?? (
        <ScrollbarTrack axis={local.axis}>
          <ScrollbarThumb axis={local.axis} />
        </ScrollbarTrack>
      )}
    </div>
  )
}
