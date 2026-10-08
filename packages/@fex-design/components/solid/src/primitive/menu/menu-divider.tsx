import type { JSX } from 'solid-js'

export function MenuDivider(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} role="separator" data-slot="menu-divider" />
}
