import { Show, splitProps, type JSX } from 'solid-js'
import {
  SubMenuTrigger as PrimitiveTrigger,
  type SubMenuTriggerProps as PrimitiveTriggerProps,
} from '@fex-design/solid/primitive/menu'
import { ChevronRightIcon } from '@fex-design/solid/icons/chevron'
import {
  menuItemIconClassName,
  menuItemLabelClassName,
  menuItemSuffixClassName,
  menuExpandIconClassName,
} from '@fex-design/components-styles/menu'
type TriggerBinding = Parameters<
  Extract<NonNullable<PrimitiveTriggerProps['children']>, Function>
>[0]
export type SubMenuTriggerProps = Omit<PrimitiveTriggerProps, 'children'> & {
  children?: JSX.Element
  icon?: JSX.Element
  suffix?: JSX.Element
  render?: ((binding: TriggerBinding & { content: JSX.Element }) => JSX.Element) | undefined
}
export function SubMenuTrigger(props: SubMenuTriggerProps) {
  const [local, rest] = splitProps(props, ['children', 'icon', 'suffix', 'render', 'indicator'])
  return (
    <PrimitiveTrigger {...rest}>
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
            <Show when={local.indicator !== false && local.indicator !== null}>
              <span data-slot="submenu-indicator" class={menuExpandIconClassName}>
                {local.indicator ?? <ChevronRightIcon />}
              </span>
            </Show>
          </>
        )
        return (
          <Show when={local.render} fallback={<button {...binding.props}>{content}</button>}>
            {(render) => render()({ ...binding, content })}
          </Show>
        )
      }}
    </PrimitiveTrigger>
  )
}
