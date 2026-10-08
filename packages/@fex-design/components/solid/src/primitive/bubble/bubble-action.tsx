import { bubbleActionClassName } from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
} from 'solid-js'
import { Toggle, type ToggleProps } from '../toggle/toggle'

export type ActionRender = (options: {
  props: JSX.HTMLAttributes<HTMLElement>
  state: { pressed: boolean; disabled: boolean }
}) => JSX.Element

export interface BubbleActionProps extends ToggleProps {
  render?: ActionRender
}

export function BubbleAction(props: BubbleActionProps) {
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
        'data-slot': 'bubble-action',
        'data-state': state().pressed ? 'on' : 'off',
        class: cn(bubbleActionClassName(), local.class),
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
      data-slot="bubble-action"
      class={cn(bubbleActionClassName(), local.class)}
    >
      {local.children}
    </Toggle>
  )
}
