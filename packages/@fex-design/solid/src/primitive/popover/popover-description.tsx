import { splitProps, type JSX } from 'solid-js'
import { cn } from '@fex/utils'
import { popoverDescriptionClassName } from '@fex-design/styles/popover'

export type PopoverDescriptionProps = JSX.HTMLAttributes<HTMLDivElement>

export function PopoverDescription(props: PopoverDescriptionProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return <div {...rest} data-slot="popover-description" class={cn(popoverDescriptionClassName, local.class)}>{local.children}</div>
}
