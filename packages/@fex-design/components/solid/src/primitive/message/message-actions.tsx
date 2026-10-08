import type { MessageActionAlign } from '@fex-design/core/message/types'
import { messageActionsClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { splitProps, useContext, type JSX, type ParentProps } from 'solid-js'
import { MessageContext } from './message-context'

export interface MessageActionsProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  align?: MessageActionAlign
  visibility?: 'always' | 'interaction'
}

export function MessageActions(props: MessageActionsProps) {
  const [local, rest] = splitProps(props, ['align', 'visibility', 'class'])
  const c = useContext(MessageContext)
  const align = () =>
    local.align === 'inherit' || local.align === undefined ? (c?.side() ?? 'start') : local.align
  return (
    <div
      {...rest}
      data-slot="message-actions"
      data-align={align()}
      data-visibility={local.visibility ?? 'always'}
      class={cn(messageActionsClassName, local.class)}
    />
  )
}
