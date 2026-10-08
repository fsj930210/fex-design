import type { ComponentProps } from 'react'

export interface MenuDividerProps extends ComponentProps<'div'> {}

export function MenuDivider(props: MenuDividerProps) {
  return <div {...props} role="separator" data-slot="menu-divider" />
}
