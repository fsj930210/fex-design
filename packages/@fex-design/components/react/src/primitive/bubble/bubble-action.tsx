import { bubbleActionClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { Toggle, type ToggleProps } from '../toggle/toggle'

export type ActionRenderProps = {
  props: HTMLAttributes<HTMLElement>
  state: { pressed: boolean; disabled: boolean }
}

export interface BubbleActionProps extends ToggleProps {
  render?: (options: ActionRenderProps) => ReactNode
}

export function BubbleAction({
  render,
  className,
  pressed,
  defaultPressed,
  disabled = false,
  ...props
}: BubbleActionProps) {
  if (render)
    return render({
      props: {
        'data-slot': 'bubble-action',
        'data-state': pressed ? 'on' : 'off',
        className: cn(bubbleActionClassName(), className),
      },
      state: { pressed: pressed ?? defaultPressed ?? false, disabled },
    })
  return (
    <Toggle
      {...props}
      pressed={pressed}
      defaultPressed={defaultPressed}
      disabled={disabled}
      data-slot="bubble-action"
      variant="default"
      size="sm"
      className={cn(bubbleActionClassName(), className)}
    />
  )
}
