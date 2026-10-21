import { use, type HTMLAttributes, type Ref, type ReactNode } from 'react'
import { useCoreStoreSelector } from '@fex-design/react/hooks/use-core-store-selector'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { useLatest } from '@fex-design/react/hooks/use-latest'
import { menuItemClassName } from '@fex-design/components-styles/menu'
import { cn, shallowEqualObject } from '@fex-design/utils'
import { MenuLevelContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
export interface MenuItemRenderProps {
  props: HTMLAttributes<HTMLElement> & {
    ref: (element: HTMLElement | null) => void | (() => void)
    disabled?: boolean | undefined
    type?: 'button'
    'data-slot'?: string
  }
  state: { disabled: boolean; selected: boolean }
}
export interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  value: string
  ref?: Ref<HTMLElement>
  disabled?: boolean | undefined
  textValue?: string | undefined
  children?: ReactNode | ((binding: MenuItemRenderProps) => ReactNode)
}
export function MenuItem({
  value,
  textValue,
  disabled = false,
  children,
  className,
  ref,
  ...rest
}: MenuItemProps) {
  const dom = useMenuContext(),
    parent = use(MenuLevelContext)
  const state = useCoreStoreSelector(
    dom.controller,
    (next) => ({
      layout: next.layout,
      disabled: next.disabled,
      selected: next.value.includes(value),
    }),
    shallowEqualObject,
  )
  const source = useLatest({ value, disabled, textValue })
  const bind = useMenuHost((element) => dom.bindItem(element, () => source.current, parent))
  const composed = useComposedRef(bind, ref)
  const selected = state.selected
  const props: MenuItemRenderProps['props'] = {
    ...rest,
    ref: composed,
    type: 'button',
    role: 'menuitem',
    disabled: state.disabled || disabled,
    tabIndex: -1,
    'data-slot': 'menu-item',
    className: cn(
      menuItemClassName({
        orientation: !parent && state.layout === 'horizontal' ? 'horizontal' : 'vertical',
      }),
      className,
    ),
  }
  if (typeof children === 'function')
    return children({ props, state: { disabled: Boolean(props.disabled), selected } })
  return (
    <button {...props} ref={composed}>
      {children}
    </button>
  )
}
