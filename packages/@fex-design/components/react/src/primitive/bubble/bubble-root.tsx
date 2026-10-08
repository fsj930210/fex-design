import {
  resolveConversationSide,
  type BubbleSize,
  type BubbleVariant,
  type ConversationSide,
} from '@fex-design/core/bubble/types'
import { bubbleClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import { use, type ComponentProps } from 'react'
import { BubbleContext, MessageSideContext } from './bubble-context'

export interface BubbleProps extends ComponentProps<'div'> {
  side?: ConversationSide
  variant?: BubbleVariant
  size?: BubbleSize
}

export function Bubble({
  side,
  variant = 'soft',
  size = 'md',
  className,
  children,
  ...props
}: BubbleProps) {
  const messageSide = use(MessageSideContext)
  const resolvedSide = resolveConversationSide(side, messageSide ?? undefined)
  return (
    <BubbleContext value={{ side: resolvedSide, size, variant }}>
      <div
        {...props}
        data-slot="bubble"
        data-side={resolvedSide}
        data-variant={variant}
        data-size={size}
        className={cn(bubbleClassName({ size }), className)}
      >
        {children}
      </div>
    </BubbleContext>
  )
}

export { Bubble as BubbleRoot, type BubbleProps as BubbleRootProps }
