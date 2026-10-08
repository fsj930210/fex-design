import {
  bubbleReactionClassName,
  bubbleReactionCountClassName,
} from '@fex-design/components-styles/bubble'
import { cn } from '@fex-design/utils'
import { splitProps } from 'solid-js'
import { Toggle } from '../toggle/toggle'
import type { BubbleActionProps } from './bubble-action'

export interface BubbleReactionProps extends BubbleActionProps {
  count?: number
}

export function BubbleReaction(props: BubbleReactionProps) {
  const [local, rest] = splitProps(props, [
    'render',
    'class',
    'pressed',
    'defaultPressed',
    'disabled',
    'children',
    'count',
  ])
  const state = () => ({
    pressed: local.pressed ?? local.defaultPressed ?? false,
    disabled: Boolean(local.disabled),
  })
  if (local.render)
    return local.render({
      props: {
        'data-slot': 'bubble-reaction',
        'data-state': state().pressed ? 'on' : 'off',
        class: cn(bubbleReactionClassName(), local.class),
      },
      state: state(),
    })
  return (
    <Toggle
      {...rest}
      pressed={local.pressed}
      defaultPressed={local.defaultPressed}
      disabled={local.disabled}
      variant="outline"
      size="sm"
      data-slot="bubble-reaction"
      class={cn(bubbleReactionClassName(), local.class)}
    >
      {local.children}
      {local.count !== undefined && (
        <span data-slot="bubble-reaction-count" class={bubbleReactionCountClassName}>
          {local.count}
        </span>
      )}
    </Toggle>
  )
}
