import type { MessageGroupSpacing } from '@fex-design/core/message/types'
import { messageGroupClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export interface MessageGroupProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  spacing?: MessageGroupSpacing
}

export function MessageGroup(props: MessageGroupProps) {
  const [local, rest] = splitProps(props, ['spacing', 'class'])
  return (
    <div
      {...rest}
      data-slot="message-group"
      data-spacing={local.spacing ?? 'default'}
      class={cn(messageGroupClassName({ spacing: local.spacing ?? 'default' }), local.class)}
    />
  )
}
