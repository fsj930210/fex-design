import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'

export interface MenuItemSlot {
  props: JSX.HTMLAttributes<HTMLElement>
  state: { disabled: boolean; selected: boolean; submenu: boolean }
}

export type MenuItemProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'children'> & {
  children?: JSX.Element | ((slot: MenuItemSlot) => JSX.Element)
  disabled?: boolean
  selected?: boolean
  submenu?: boolean
  value?: string | number
}

export function MenuItem(props: MenuItemProps) {
  const [local, rest] = splitProps(props, ['children', 'disabled', 'selected', 'submenu', 'value'])
  const itemProps = () =>
    ({
      ...rest,
      role: rest.role ?? 'menuitem',
      tabIndex: local.disabled ? -1 : (rest.tabIndex ?? -1),
      'aria-disabled': local.disabled || undefined,
      'aria-haspopup': local.submenu ? 'menu' : undefined,
      'data-slot': 'menu-item',
      'data-menu-value': local.value === undefined ? undefined : String(local.value),
      'data-selected': local.selected ? 'true' : undefined,
    }) satisfies JSX.HTMLAttributes<HTMLElement>
  const state = () => ({
    disabled: Boolean(local.disabled),
    selected: Boolean(local.selected),
    submenu: Boolean(local.submenu),
  })

  if (typeof local.children === 'function') {
    return local.children({ props: itemProps(), state: state() })
  }

  return (
    <button {...itemProps()} type="button" disabled={local.disabled}>
      {local.children}
    </button>
  )
}
