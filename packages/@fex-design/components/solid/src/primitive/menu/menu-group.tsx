import type { JSX, ParentProps } from 'solid-js'

export function MenuGroup(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} role="group" data-slot="menu-group">
      {props.children}
    </div>
  )
}
