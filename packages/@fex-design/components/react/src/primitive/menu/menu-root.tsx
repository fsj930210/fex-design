import type { ComponentProps } from 'react'

export interface MenuRootProps extends ComponentProps<'div'> {}

export function MenuRoot(props: MenuRootProps) {
  return <div {...props} role={props.role ?? 'menu'} data-slot="menu" />
}
