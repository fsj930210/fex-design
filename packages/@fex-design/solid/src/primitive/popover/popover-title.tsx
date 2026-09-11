import { splitProps, type JSX } from 'solid-js'
import { cn } from '@fex/utils'
import { popoverTitleClassName } from '@fex-design/styles/popover'

export type PopoverTitleProps = JSX.HTMLAttributes<HTMLDivElement>

export function PopoverTitle(props: PopoverTitleProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return <div {...rest} data-slot="popover-title" class={cn(popoverTitleClassName, local.class)}>{local.children}</div>
}
