import {
  type BubbleAttachmentSide,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleReactionsClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import { use, type HTMLAttributes } from 'react'
import { BubbleContext } from './bubble-context'

export interface BubbleReactionsProps extends HTMLAttributes<HTMLDivElement> {
  side?: BubbleAttachmentSide
  align?: ConversationSide
}

export function BubbleReactions({
  side = 'bottom',
  align,
  className,
  ...props
}: BubbleReactionsProps) {
  const context = use(BubbleContext)
  const resolvedAlign = align ?? context?.side ?? 'start'
  return (
    <div
      {...props}
      data-slot="bubble-reactions"
      data-side={side}
      data-align={resolvedAlign}
      className={cn(bubbleReactionsClassName({ side }), className)}
    />
  )
}
