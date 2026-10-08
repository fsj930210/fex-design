import {
  type BubbleAttachmentSide,
  type BubbleVisibility,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleActionsClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { BubbleContext } from './bubble-context'

export interface BubbleActionsProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  side?: BubbleAttachmentSide
  align?: ConversationSide
  visibility?: BubbleVisibility
}

export function BubbleActions(props: BubbleActionsProps) {
  const [local, rest] = splitProps(props, ['side', 'align', 'visibility', 'class'])
  const c = useContext(BubbleContext)
  return (
    <div
      {...rest}
      data-slot="bubble-actions"
      data-side={local.side ?? 'bottom'}
      data-align={local.align ?? c?.side() ?? 'start'}
      data-visibility={local.visibility ?? 'always'}
      class={cn(bubbleActionsClassName({ side: local.side ?? 'bottom' }), local.class)}
    />
  )
}
