import { messageActionClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { Toggle, type ToggleProps } from '../toggle/toggle'

export type ActionRender = (options: {
  props: JSX.HTMLAttributes<HTMLElement>
  state: { pressed: boolean; disabled: boolean }
}) => JSX.Element

export interface MessageActionProps extends ToggleProps {
  render?: ActionRender
}

export function MessageAction(props: MessageActionProps) {
  const [local, rest] = splitProps(props, [
    'render',
    'class',
    'pressed',
    'defaultPressed',
    'disabled',
    'children',
  ])
  const state = () => ({
    pressed: local.pressed ?? local.defaultPressed ?? false,
    disabled: Boolean(local.disabled),
  })
  if (local.render)
    return local.render({
      props: {
        'data-slot': 'message-action',
        'data-state': state().pressed ? 'on' : 'off',
        class: cn(messageActionClassName(), local.class),
      },
      state: state(),
    })
  return (
    <Toggle
      {...rest}
      pressed={local.pressed}
      defaultPressed={local.defaultPressed}
      disabled={local.disabled}
      variant="default"
      size="sm"
      data-slot="message-action"
      class={cn(messageActionClassName(), local.class)}
    >
      {local.children}
    </Toggle>
  )
}
