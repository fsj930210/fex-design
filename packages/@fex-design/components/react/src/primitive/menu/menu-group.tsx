import type { ComponentProps } from 'react'
import { menuGroupClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
export type MenuGroupProps = ComponentProps<'div'>
export function MenuGroup({ className, ...props }: MenuGroupProps) {
  return (
    <div
      {...props}
      role="group"
      data-slot="menu-group"
      className={cn(menuGroupClassName, className)}
    />
  )
}
