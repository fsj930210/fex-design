import type { JSX, ParentProps } from 'solid-js'

export function MenuRoot(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...props} role={props.role ?? 'menu'} data-slot="menu">
      {props.children}
    </div>
  )
}
