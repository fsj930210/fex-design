import { splitProps, type JSX } from 'solid-js'
import { cn } from '@fex/utils'
import { popoverHeaderClassName } from '@fex-design/styles/popover'

export type PopoverHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function PopoverHeader(props: PopoverHeaderProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return <div {...rest} data-slot="popover-header" class={cn(popoverHeaderClassName, local.class)}>{local.children}</div>
}
