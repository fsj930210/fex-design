import type { ComponentProps } from 'react'
import { menuGroupLabelClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
export type MenuGroupLabelProps = ComponentProps<'div'>
export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return (
    <div
      {...props}
      data-slot="menu-group-label"
      className={cn(menuGroupLabelClassName, className)}
    />
  )
}
