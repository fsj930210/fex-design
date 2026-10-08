import type { ComponentProps } from 'react'

export interface MenuGroupLabelProps extends ComponentProps<'div'> {}

export function MenuGroupLabel(props: MenuGroupLabelProps) {
  return <div {...props} data-slot="menu-group-label" />
}
