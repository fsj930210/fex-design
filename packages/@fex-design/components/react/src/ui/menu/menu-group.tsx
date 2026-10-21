import type { ReactNode, ComponentProps } from 'react'
import { MenuGroup as PrimitiveGroup, MenuGroupLabel } from '@fex-design/react/primitive/menu'
export interface MenuGroupProps extends ComponentProps<'div'> {
  label?: ReactNode
}
export function MenuGroup({ label, children, ...props }: MenuGroupProps) {
  return (
    <PrimitiveGroup {...props}>
      {label != null && <MenuGroupLabel>{label}</MenuGroupLabel>}
      {children}
    </PrimitiveGroup>
  )
}
