import type { ComponentProps } from 'react'
import { menuSeparatorClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
export type MenuSeparatorProps = ComponentProps<'div'>
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <div
      {...props}
      role="separator"
      data-slot="menu-separator"
      className={cn(menuSeparatorClassName, className)}
    />
  )
}
