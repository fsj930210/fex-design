import { timelineClassName } from '@fex-design/components-styles/timeline'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import type { TimelineAlign, TimelineOrientation } from './timeline-types'

export interface TimelineProps extends ParentProps<JSX.OlHTMLAttributes<HTMLOListElement>> {
  orientation?: TimelineOrientation
  align?: TimelineAlign
  reverse?: boolean
}

export function Timeline(props: TimelineProps) {
  const [local, rest] = splitProps(props, ['orientation', 'align', 'reverse', 'class', 'children'])
  const orientation = () => local.orientation ?? 'vertical'
  const align = () => local.align ?? 'end'

  return (
    <ol
      {...rest}
      data-slot="timeline"
      data-orientation={orientation()}
      data-align={align()}
      data-reverse={local.reverse || undefined}
      class={cn(
        timelineClassName({ orientation: orientation(), align: align(), reverse: local.reverse }),
        local.class,
      )}
    >
      {local.children}
    </ol>
  )
}

export { Timeline as TimelineRoot, type TimelineProps as TimelineRootProps }
