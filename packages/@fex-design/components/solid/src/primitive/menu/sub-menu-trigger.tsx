import { mergeProps, splitProps, useContext, type JSX } from 'solid-js'
import { ChevronRightIcon } from '@fex-design/solid/icons/chevron'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { menuItemClassName, menuExpandIconClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
import { SubMenuContext, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
export type SubMenuTriggerProps = Omit<
  JSX.HTMLAttributes<HTMLElement> & { disabled?: boolean | undefined; type?: 'button' },
  'children' | 'value'
> & {
  textValue?: string | undefined
  indicator?: JSX.Element
  children?:
    | JSX.Element
    | ((binding: {
        props: Omit<JSX.HTMLAttributes<HTMLElement>, 'ref'> & {
          ref: (element: HTMLElement) => void
          disabled?: boolean | undefined
          type?: 'button'
        }
        state: { readonly open: boolean; readonly disabled: boolean }
      }) => JSX.Element)
}
export function SubMenuTrigger(props: SubMenuTriggerProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'indicator',
    'textValue',
    'disabled',
    'class',
    'ref',
  ])
  const dom = useMenuContext(),
    branch = useContext(SubMenuContext)
  if (!branch) throw new Error('SubMenuTrigger requires SubMenu')
  const snapshot = createCoreStoreSignal(dom.controller)
  const source = () => ({
    value: branch.value(),
    disabled: local.disabled,
    textValue: local.textValue,
  })
  const host = useMenuHost(
    (element) => dom.bindItem(element, source, branch.parent, branch),
    source,
  )
  const state = {
    get disabled() {
      return snapshot().disabled || Boolean(local.disabled)
    },
    get open() {
      return (
        !snapshot().disabled && !local.disabled && snapshot().openValues.includes(branch.value())
      )
    },
  }
  const binding = mergeProps(rest, {
    type: 'button' as const,
    role: 'menuitem',
    tabIndex: -1,
    'data-slot': 'submenu-trigger',
    'aria-haspopup': 'menu' as const,
    get disabled() {
      return state.disabled
    },
    get 'aria-expanded'() {
      return state.open
    },
    get class() {
      return cn(
        menuItemClassName({
          orientation:
            !branch.parent && snapshot().layout === 'horizontal' ? 'horizontal' : 'vertical',
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
  return (
    <button {...binding}>
      {local.children}
      <span class={menuExpandIconClassName}>{local.indicator ?? <ChevronRightIcon />}</span>
    </button>
  )
}
