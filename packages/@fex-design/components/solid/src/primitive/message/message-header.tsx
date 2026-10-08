import { messageHeaderClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function MessageHeader(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class'])
  return <div {...rest} data-slot="message-header" class={cn(messageHeaderClassName, local.class)} />
}
