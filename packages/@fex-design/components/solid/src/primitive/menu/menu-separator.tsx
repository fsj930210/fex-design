import { splitProps, type JSX } from 'solid-js'
import { menuSeparatorClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
export type MenuSeparatorProps = JSX.HTMLAttributes<HTMLDivElement>
export function MenuSeparator(props: MenuSeparatorProps) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <div
      {...rest}
      role="separator"
      data-slot="menu-separator"
      class={cn(menuSeparatorClassName, local.class)}
    />
  )
}
