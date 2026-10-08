import { messageActionClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { Toggle, type ToggleProps } from '../toggle/toggle'

export type MessageActionRenderProps = {
  props: HTMLAttributes<HTMLElement>
  state: { pressed: boolean; disabled: boolean }
}

export interface MessageActionProps extends ToggleProps {
  render?: (options: MessageActionRenderProps) => ReactNode
}

export function MessageAction({
  render,
  className,
  pressed,
  defaultPressed,
  disabled = false,
  ...props
}: MessageActionProps) {
  if (render)
    return render({
      props: {
        'data-slot': 'message-action',
        'data-state': pressed ? 'on' : 'off',
        className: cn(messageActionClassName(), className),
      },
      state: { pressed: pressed ?? defaultPressed ?? false, disabled },
    })
  return (
    <Toggle
      {...props}
      pressed={pressed}
      defaultPressed={defaultPressed}
      disabled={disabled}
      data-slot="message-action"
      variant="default"
      size="sm"
      className={cn(messageActionClassName(), className)}
    />
  )
}
