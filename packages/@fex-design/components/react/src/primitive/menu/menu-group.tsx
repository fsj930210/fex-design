import type { ComponentProps } from 'react'

export interface MenuGroupProps extends ComponentProps<'div'> {}

export function MenuGroup(props: MenuGroupProps) {
  return <div {...props} role="group" data-slot="menu-group" />
}
