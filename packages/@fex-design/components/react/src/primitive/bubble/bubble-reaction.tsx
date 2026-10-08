import {
  bubbleReactionClassName,
  bubbleReactionCountClassName,
} from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import { Toggle } from '../toggle/toggle'
import type { BubbleActionProps } from './bubble-action'

export interface BubbleReactionProps extends BubbleActionProps {
  count?: number
}

export function BubbleReaction({
  count,
  render,
  className,
  children,
  pressed,
  defaultPressed,
  disabled = false,
  ...props
}: BubbleReactionProps) {
  if (render)
    return render({
      props: {
        'data-slot': 'bubble-reaction',
        'data-state': pressed ? 'on' : 'off',
        className: cn(bubbleReactionClassName(), className),
      },
      state: { pressed: pressed ?? defaultPressed ?? false, disabled },
    })
  return (
    <Toggle
      {...props}
      pressed={pressed}
      defaultPressed={defaultPressed}
      disabled={disabled}
      data-slot="bubble-reaction"
      variant="outline"
      size="sm"
      className={cn(bubbleReactionClassName(), className)}
    >
      {children}
      {count !== undefined && (
        <span data-slot="bubble-reaction-count" className={bubbleReactionCountClassName}>
          {count}
        </span>
      )}
    </Toggle>
  )
}
