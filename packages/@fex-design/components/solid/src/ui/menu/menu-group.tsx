import { Show, splitProps, type JSX } from 'solid-js'
import { MenuGroup as PrimitiveGroup, MenuGroupLabel } from '@fex-design/solid/primitive/menu'
export type MenuGroupProps = JSX.HTMLAttributes<HTMLDivElement> & { label?: JSX.Element }
export function MenuGroup(props: MenuGroupProps) {
  const [local, rest] = splitProps(props, ['label', 'children'])
  return (
    <PrimitiveGroup {...rest}>
      <Show when={local.label != null}>
        <MenuGroupLabel>{local.label}</MenuGroupLabel>
      </Show>
      {local.children}
    </PrimitiveGroup>
  )
}
