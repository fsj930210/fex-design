import type {
  HTMLAttributes,
  ReactNode,
  Ref,
} from 'react'

export interface MenuItemRenderProps {
  props: HTMLAttributes<HTMLElement> & {
    'data-menu-value': string
    'data-selected'?: 'true'
  }
  ref: Ref<HTMLElement>
  state: {
    disabled: boolean
    selected: boolean
    submenu: boolean
  }
}

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode | ((slot: MenuItemRenderProps) => ReactNode)
  disabled?: boolean
  selected?: boolean
  submenu?: boolean
  value?: string | number
}

export function MenuItem({
  children,
  disabled = false,
  selected = false,
  submenu = false,
  value,
  ...props
}: MenuItemProps) {
  const itemProps: MenuItemRenderProps['props'] = {
    ...props,
    role: props.role ?? 'menuitem',
    tabIndex: disabled ? -1 : (props.tabIndex ?? -1),
    'aria-disabled': disabled || undefined,
    'aria-haspopup': submenu ? 'menu' : props['aria-haspopup'],
    'data-slot': 'menu-item',
    'data-menu-value': value === undefined ? '' : String(value),
    'data-selected': selected ? 'true' : undefined,
  }
  const state = { disabled, selected, submenu }

  if (typeof children === 'function') {
    return children({ props: itemProps, ref: undefined, state })
  }

  return (
    <button {...itemProps} type="button" disabled={disabled}>
      {children}
    </button>
  )
}
