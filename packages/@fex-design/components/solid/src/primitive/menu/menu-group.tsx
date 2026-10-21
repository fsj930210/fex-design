import { splitProps, type JSX } from 'solid-js'
import { menuGroupClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
export type MenuGroupProps = JSX.HTMLAttributes<HTMLDivElement>
export function MenuGroup(props: MenuGroupProps) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <div
      {...rest}
      role="group"
      data-slot="menu-group"
      class={cn(menuGroupClassName, local.class)}
    />
  )
}
