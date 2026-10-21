import { mergeProps, splitProps, useContext, type JSX } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { menuItemClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
import { MenuLevelContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
export interface MenuItemSlot {
  props: Omit<JSX.HTMLAttributes<HTMLElement>, 'ref'> & {
    ref: (element: HTMLElement) => void
    disabled?: boolean | undefined
    type?: 'button'
  }
  state: { readonly disabled: boolean; readonly selected: boolean }
}
export type MenuItemProps = Omit<
  JSX.HTMLAttributes<HTMLElement> & { disabled?: boolean | undefined; type?: 'button' },
  'value' | 'children'
> & {
  value: string
  textValue?: string | undefined
  children?: JSX.Element | ((binding: MenuItemSlot) => JSX.Element)
}
export function MenuItem(props: MenuItemProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'value',
    'textValue',
    'disabled',
    'class',
    'ref',
  ])
  const dom = useMenuContext(),
    parent = useContext(MenuLevelContext),
    snapshot = createCoreStoreSignal(dom.controller)
  const source = () => ({
    value: local.value,
    disabled: local.disabled,
    textValue: local.textValue,
  })
  const host = useMenuHost((element) => dom.bindItem(element, source, parent), source)
  const state = {
    get disabled() {
      return snapshot().disabled || Boolean(local.disabled)
    },
    get selected() {
      return snapshot().value.includes(local.value)
    },
  }
  const binding = mergeProps(rest, {
    type: 'button' as const,
    role: 'menuitem',
    tabIndex: -1,
    'data-slot': 'menu-item',
    get disabled() {
      return state.disabled
    },
    get class() {
      return cn(
        menuItemClassName({
          orientation: !parent && snapshot().layout === 'horizontal' ? 'horizontal' : 'vertical',
        }),
        local.class,
      )
    },
    ref(element: HTMLElement) {
      host(element)
      if (typeof local.ref === 'function') local.ref(element)
    },
  })
  if (typeof local.children === 'function') return local.children({ props: binding, state })
  return <button {...binding}>{local.children}</button>
}
