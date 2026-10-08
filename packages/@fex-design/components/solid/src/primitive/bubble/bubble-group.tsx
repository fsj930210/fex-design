import {
  resolveConversationSide,
  type BubbleGroupSpacing,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleGroupClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { MessageSideContext } from './bubble-context'

export interface BubbleGroupProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  side?: ConversationSide
  spacing?: BubbleGroupSpacing
}

export function BubbleGroup(props: BubbleGroupProps) {
  const [local, rest] = splitProps(props, ['side', 'spacing', 'class'])
  const inherited = useContext(MessageSideContext)
  const side = () => resolveConversationSide(local.side, inherited?.())
  return (
    <div
      {...rest}
      data-slot="bubble-group"
      data-side={side()}
      data-spacing={local.spacing ?? 'default'}
      class={cn(bubbleGroupClassName({ spacing: local.spacing ?? 'default' }), local.class)}
    />
  )
}
