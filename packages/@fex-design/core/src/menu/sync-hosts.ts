import type { MenuController, MenuNode, MenuSnapshot } from './types'
import type { MenuBranch, MenuDomBinding, MenuDomContent, MenuDomItem } from './dom-types'
import { syncMenuContent } from './content'

/** Synchronize one registered menu host from the authoritative controller state. */
export function syncMenuItem(controller: MenuController, item: MenuDomItem, state: MenuSnapshot) {
  const source = item.source()
  const node: MenuNode = {
    value: item.branch?.value() ?? source.value,
    parent: item.parent?.value(),
    branch: Boolean(item.branch),
    disabled: Boolean(source.disabled),
  }
  if (
    node.value !== item.node.value ||
    node.parent !== item.node.parent ||
    node.disabled !== item.node.disabled
  ) {
    item.unregister()
    item.node = node
    item.unregister = controller.registerNode(node)
  }
  const disabled = state.disabled || source.disabled
  item.element.dataset.slot = item.branch ? 'submenu-trigger' : 'menu-item'
  item.element.dataset.menuValue = node.value
  item.element.dataset.disabled = String(Boolean(disabled))
  item.element.dataset.orientation =
    !item.parent && state.layout === 'horizontal' ? 'horizontal' : 'vertical'
  item.element.dataset.selected = String(!item.branch && state.value.includes(source.value))
  item.element.setAttribute('role', 'menuitem')
  item.element.setAttribute('aria-disabled', String(Boolean(disabled)))
  if (item.element instanceof HTMLButtonElement) item.element.disabled = Boolean(disabled)
  if (item.branch) {
    item.element.setAttribute('aria-haspopup', 'menu')
    item.element.setAttribute(
      'aria-expanded',
      String(!disabled && state.openValues.includes(node.value)),
    )
    item.element.dataset.expanded = item.element.getAttribute('aria-expanded')!
  } else if (state.value.includes(source.value)) item.element.setAttribute('aria-current', 'true')
  else item.element.removeAttribute('aria-current')
}

function syncMenuGroups(element: HTMLElement) {
  element.querySelectorAll<HTMLElement>('[data-slot="menu-group"]').forEach((group) => {
    const label = group.querySelector<HTMLElement>('[data-slot="menu-group-label"]')
    if (!label) return
    if (!label.id)
      label.id = `${element.id}-group-${[...element.querySelectorAll('[data-slot="menu-group-label"]')].indexOf(label)}`
    if (!group.hasAttribute('aria-label')) group.setAttribute('aria-labelledby', label.id)
  })
}

export function syncMenuContentAndGroups(binding: MenuDomBinding, content: MenuDomContent) {
  syncMenuContent(binding, content)
  syncMenuGroups(content.element)
}

export function canFocusMenuItem(item: MenuDomItem | undefined, parent: MenuBranch | undefined) {
  return Boolean(
    item &&
    item.parent === parent &&
    !item.source().disabled &&
    item.element.isConnected &&
    !item.element.closest('[hidden], [inert]') &&
    item.element.getClientRects().length > 0,
  )
}

/** Keep focus inside the current menu level when its last focused item disappears. */
export function focusMenuItemOrContent(
  item: MenuDomItem | undefined,
  contents: Set<MenuDomContent>,
  parent: MenuBranch | undefined,
  focusItem: (item: MenuDomItem | undefined) => void,
) {
  if (item) {
    focusItem(item)
    return
  }
  const host = [...contents].find(
    (content) =>
      content.branch === parent &&
      content.element.isConnected &&
      !content.element.closest('[hidden], [inert]'),
  )?.element
  if (!host) return
  if (!host.hasAttribute('tabindex')) host.tabIndex = -1
  host.focus({ preventScroll: true })
}
