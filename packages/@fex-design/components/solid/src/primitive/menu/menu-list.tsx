import {
  handleMenuListFocus,
  handleMenuListKeyDown,
  syncMenuListTabStops,
  type MenuOrientation,
} from '@fex-design/core/menu/navigation'
import type { JSX, ParentProps } from 'solid-js'
import { splitProps } from 'solid-js'

export type MenuListProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>> & {
  orientation?: MenuOrientation
  parentValue?: string | number
}

export function MenuList(props: MenuListProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'orientation',
    'parentValue',
    'onFocus',
    'onKeyDown',
    'ref',
  ])
  let element: HTMLDivElement | undefined
  const orientation = () => local.orientation ?? 'vertical'

  return (
    <div
      {...rest}
      ref={(value) => {
        element = value
        if (typeof local.ref === 'function') local.ref(value)
        queueMicrotask(() => syncMenuListTabStops(value))
      }}
      role={rest.role ?? 'group'}
      aria-orientation={orientation()}
      data-orientation={orientation()}
      data-parent-value={local.parentValue}
      data-slot="menu-list"
      onFocus={(event) => {
        if (typeof local.onFocus === 'function') local.onFocus(event)
        if (!event.defaultPrevented) handleMenuListFocus(event)
      }}
      onKeyDown={(event) => {
        if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
        if (!event.defaultPrevented && element) {
          handleMenuListKeyDown(event, element, orientation())
        }
      }}
    >
      {local.children}
    </div>
  )
}
