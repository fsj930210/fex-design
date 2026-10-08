import {
  type BubbleAttachmentSide,
  type BubbleVisibility,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleActionsClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import { use, type HTMLAttributes } from 'react'
import { BubbleContext } from './bubble-context'

export interface BubbleActionsProps extends HTMLAttributes<HTMLDivElement> {
  side?: BubbleAttachmentSide
  align?: ConversationSide
  visibility?: BubbleVisibility
}

export function BubbleActions({
  side = 'bottom',
  align,
  visibility = 'always',
  className,
  ...props
}: BubbleActionsProps) {
  const context = use(BubbleContext)
  const resolvedAlign = align ?? context?.side ?? 'start'
  return (
    <div
      {...props}
      data-slot="bubble-actions"
      data-side={side}
      data-align={resolvedAlign}
      data-visibility={visibility}
      className={cn(bubbleActionsClassName({ side }), className)}
    />
  )
}
