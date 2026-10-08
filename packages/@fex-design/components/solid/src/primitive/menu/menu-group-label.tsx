import type { JSX, ParentProps } from 'solid-js'

export function MenuGroupLabel(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} data-slot="menu-group-label">
      {props.children}
    </div>
  )
}
