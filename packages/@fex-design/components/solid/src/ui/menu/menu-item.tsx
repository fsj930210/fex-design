import { Show, splitProps, type JSX } from 'solid-js'
import {
  MenuItem as PrimitiveItem,
  type MenuItemProps as PrimitiveItemProps,
} from '@fex-design/solid/primitive/menu'
import {
  menuItemIconClassName,
  menuItemLabelClassName,
  menuItemSuffixClassName,
} from '@fex-design/components-styles/menu'
import type { MenuItemBinding } from './types'
export type MenuItemProps = Omit<PrimitiveItemProps, 'children'> & {
  children?: JSX.Element
  icon?: JSX.Element
  suffix?: JSX.Element
  href?: string | undefined
  target?: string | undefined
  rel?: string | undefined
  render?: ((binding: MenuItemBinding) => JSX.Element) | undefined
}
export function MenuItem(props: MenuItemProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'icon',
    'suffix',
    'href',
    'target',
    'rel',
    'render',
  ])
  return (
    <PrimitiveItem {...rest}>
      {(binding) => {
        const content = (
          <>
            <Show when={local.icon != null && local.icon !== false}>
              <span data-slot="menu-icon" class={menuItemIconClassName}>
                {local.icon}
              </span>
            </Show>
            <span data-slot="menu-item-content" class={menuItemLabelClassName}>
              {local.children}
            </span>
            <Show when={local.suffix != null && local.suffix !== false}>
              <span data-slot="menu-suffix" class={menuItemSuffixClassName}>
                {local.suffix}
              </span>
            </Show>
          </>
        )
        return (
          <Show
            when={local.render}
            fallback={
              <Show
                when={local.href !== undefined}
                fallback={<button {...binding.props}>{content}</button>}
              >
                <a {...binding.props} href={local.href} target={local.target} rel={local.rel}>
                  {content}
                </a>
              </Show>
            }
          >
            {(render) => render()({ ...binding, content })}
          </Show>
        )
      }}
    </PrimitiveItem>
  )
}
