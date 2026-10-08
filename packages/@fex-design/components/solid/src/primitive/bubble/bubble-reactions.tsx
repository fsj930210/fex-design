import {
  type BubbleAttachmentSide,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleReactionsClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { BubbleContext } from './bubble-context'

export interface BubbleReactionsProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  side?: BubbleAttachmentSide
  align?: ConversationSide
}

export function BubbleReactions(props: BubbleReactionsProps) {
  const [local, rest] = splitProps(props, ['side', 'align', 'class'])
  const c = useContext(BubbleContext)
  return (
    <div
      {...rest}
      data-slot="bubble-reactions"
      data-side={local.side ?? 'bottom'}
      data-align={local.align ?? c?.side() ?? 'start'}
      class={cn(bubbleReactionsClassName({ side: local.side ?? 'bottom' }), local.class)}
    />
  )
}
