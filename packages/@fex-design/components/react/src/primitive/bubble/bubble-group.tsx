import {
  resolveConversationSide,
  type BubbleGroupSpacing,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleGroupClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import { use, type ComponentProps } from 'react'
import { MessageSideContext } from './bubble-context'

export interface BubbleGroupProps extends ComponentProps<'div'> {
  side?: ConversationSide
  spacing?: BubbleGroupSpacing
}

export function BubbleGroup({ side, spacing = 'default', className, ...props }: BubbleGroupProps) {
  const messageSide = use(MessageSideContext)
  const resolvedSide = resolveConversationSide(side, messageSide ?? undefined)
  return (
    <div
      {...props}
      data-slot="bubble-group"
      data-side={resolvedSide}
      data-spacing={spacing}
      className={cn(bubbleGroupClassName({ spacing }), className)}
    />
  )
}
