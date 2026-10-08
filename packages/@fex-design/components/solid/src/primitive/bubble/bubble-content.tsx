import {
  type BubbleSize,
  type BubbleVariant,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleContentClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { BubbleContext } from './bubble-context'

export type ContentRender = (options: {
  props: JSX.HTMLAttributes<HTMLDivElement>
  state: { side: ConversationSide; size: BubbleSize; variant: BubbleVariant }
}) => JSX.Element

export interface BubbleContentProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  render?: ContentRender
}

export function BubbleContent(props: BubbleContentProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'render'])
  const c = useContext(BubbleContext)
  const state = () =>
    ({
      side: c?.side() ?? 'start',
      size: c?.size() ?? 'md',
      variant: c?.variant() ?? 'soft',
    }) as const
  const binding = () => ({
    ...rest,
    'data-slot': 'bubble-content',
    'data-side': state().side,
    class: cn(
      bubbleContentClassName({ size: state().size, variant: state().variant }),
      local.class,
    ),
  })
  return local.render ? (
    local.render({ props: binding(), state: state() })
  ) : (
    <div {...binding()}>{local.children}</div>
  )
}
