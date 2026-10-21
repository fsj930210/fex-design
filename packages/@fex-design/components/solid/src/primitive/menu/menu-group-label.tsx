import { splitProps, type JSX } from 'solid-js'
import { menuGroupLabelClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
export type MenuGroupLabelProps = JSX.HTMLAttributes<HTMLDivElement>
export function MenuGroupLabel(props: MenuGroupLabelProps) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <div {...rest} data-slot="menu-group-label" class={cn(menuGroupLabelClassName, local.class)} />
  )
}
