import { use, type HTMLAttributes, type Ref, type ReactNode } from 'react'
import { ChevronRightIcon } from '@fex-design/react/icons/chevron'
import { useLatest } from '@fex-design/react/hooks/use-latest'
import { useCoreStoreSelector } from '@fex-design/react/hooks/use-core-store-selector'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { menuItemClassName, menuExpandIconClassName } from '@fex-design/components-styles/menu'
import { cn, shallowEqualObject } from '@fex-design/utils'
import { SubMenuContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
export interface SubMenuTriggerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?:
    | ReactNode
    | ((binding: {
        props: HTMLAttributes<HTMLElement> & {
          ref: (element: HTMLElement | null) => void | (() => void)
          disabled?: boolean | undefined
          type?: 'button'
          'data-slot'?: string
        }
        state: { open: boolean; disabled: boolean }
      }) => ReactNode)
  ref?: Ref<HTMLElement>
  disabled?: boolean | undefined
  indicator?: ReactNode
  textValue?: string | undefined
}
export function SubMenuTrigger({
  children,
  indicator,
  textValue,
  disabled = false,
  className,
  ref,
  ...rest
}: SubMenuTriggerProps) {
  const dom = useMenuContext(),
    branch = use(SubMenuContext)
  if (!branch) throw new Error('SubMenuTrigger requires SubMenu')
  const state = useCoreStoreSelector(
      dom.controller,
      (next) => ({
        layout: next.layout,
        disabled: next.disabled,
        open: next.openValues.includes(branch.value()),
      }),
      shallowEqualObject,
    ),
    source = useLatest({ value: branch.value(), disabled, textValue })
  const bind = useMenuHost((element) =>
    dom.bindItem(element, () => source.current, branch.parent, branch),
  )
  const composed = useComposedRef(bind, ref)
  const open = state.open && !state.disabled && !disabled
  const props: HTMLAttributes<HTMLElement> & {
    ref: (element: HTMLElement | null) => void | (() => void)
    disabled?: boolean | undefined
    type?: 'button'
    'data-slot'?: string
  } = {
    ...rest,
    ref: composed,
    type: 'button',
    role: 'menuitem',
    tabIndex: -1,
    disabled: state.disabled || disabled,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    className: cn(
      menuItemClassName({
        orientation: !branch.parent && state.layout === 'horizontal' ? 'horizontal' : 'vertical',
      }),
      className,
    ),
  }
  if (typeof children === 'function')
    return children({ props, state: { open, disabled: Boolean(props.disabled) } })
  return (
    <button {...props} ref={composed}>
      {children}
      <span className={menuExpandIconClassName}>{indicator ?? <ChevronRightIcon />}</span>
    </button>
  )
}
