import { bubbleContentClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import { use, type ComponentProps, type ReactNode } from 'react'
import { BubbleContext, type BubbleContextValue } from './bubble-context'

export type BubbleContentRenderProps = { props: ComponentProps<'div'>; state: BubbleContextValue }

export interface BubbleContentProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ReactNode
  render?: (options: BubbleContentRenderProps) => ReactNode
}

export function BubbleContent({ className, children, render, ...props }: BubbleContentProps) {
  const context = use(BubbleContext) ?? {
    side: 'start' as const,
    size: 'md' as const,
    variant: 'soft' as const,
  }
  const binding = {
    ...props,
    'data-slot': 'bubble-content',
    'data-side': context.side,
    className: cn(
      bubbleContentClassName({ size: context.size, variant: context.variant }),
      className,
    ),
  }
  return render ? render({ props: binding, state: context }) : <div {...binding}>{children}</div>
}
