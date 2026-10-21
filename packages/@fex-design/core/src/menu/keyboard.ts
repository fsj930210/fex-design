import type { MenuDomBinding, MenuDomItem } from './dom-types'

export function createMenuKeyboard(binding: MenuDomBinding) {
  let active: HTMLElement | undefined
  let pending: { value: string; last: boolean } | undefined
  let search = ''
  let searchedAt = 0
  const snapshot = binding.controller.getSnapshot
  function available(item: MenuDomItem) {
    return (
      !snapshot().disabled &&
      !item.source().disabled &&
      item.element.isConnected &&
      !item.element.closest('[hidden], [inert]') &&
      item.element.getClientRects().length > 0
    )
  }
  function ordered() {
    return [...binding.items.values()]
      .filter(available)
      .sort((a, b) => (a.element.compareDocumentPosition(b.element) & 2 ? 1 : -1))
  }
  function focus(item: MenuDomItem | undefined) {
    if (!item) return
    active = item.element
    sync()
    item.element.focus({ preventScroll: true })
    item.element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
  }
  function sync() {
    const items = ordered()
    const previous = active
    if (!items.some((item) => item.element === active)) {
      const nearest = previous?.isConnected
        ? (items.find((item) => Boolean(previous.compareDocumentPosition(item.element) & 4)) ??
          items.at(-1))
        : items[0]
      active = nearest?.element
      if (previous && previous === previous.ownerDocument.activeElement)
        active?.focus({ preventScroll: true })
    }
    binding.items.forEach((item) => {
      item.element.tabIndex = item.element === active && available(item) ? 0 : -1
    })
    if (pending && snapshot().openValues.includes(pending.value)) {
      const candidates = items.filter((item) => item.parent?.value() === pending?.value)
      const target = pending.last ? candidates.at(-1) : candidates[0]
      if (target) {
        pending = undefined
        focus(target)
      }
    }
  }
  function open(item: MenuDomItem, last = false) {
    if (!item.branch) return false
    pending = { value: item.branch.value(), last }
    binding.controller.setOpen(item.branch.value(), true, {
      value: item.branch.value(),
      reason: 'keyboard',
    })
    queueMicrotask(sync)
    return true
  }
  function close(item: MenuDomItem, event: KeyboardEvent) {
    const branch =
      item.branch && snapshot().openValues.includes(item.branch.value()) ? item.branch : item.parent
    if (!branch) return false
    const parent = [...binding.items.values()].find((candidate) => candidate.branch === branch)
    focus(parent)
    binding.controller.setOpen(branch.value(), false, {
      value: branch.value(),
      reason: 'keyboard',
      event,
    })
    return true
  }
  function keydown(event: KeyboardEvent, item: MenuDomItem) {
    if (event.defaultPrevented || !available(item)) return
    const state = snapshot(),
      horizontal = state.layout === 'horizontal' && !item.parent
    const items =
      state.layout === 'inline'
        ? ordered()
        : ordered().filter((candidate) => candidate.parent === item.parent)
    const index = items.indexOf(item)
    const forward = state.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
    const backward = state.dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    let handled = true
    if (event.key === 'Home') focus(items[0])
    else if (event.key === 'End') focus(items.at(-1))
    else if (event.key === (horizontal ? forward : 'ArrowDown'))
      focus(items[(index + 1) % items.length])
    else if (event.key === (horizontal ? backward : 'ArrowUp'))
      focus(items[(index - 1 + items.length) % items.length])
    else if (horizontal && (event.key === 'ArrowDown' || event.key === 'ArrowUp'))
      handled = open(item, event.key === 'ArrowUp')
    else if (!horizontal && event.key === forward) handled = open(item)
    else if (event.key === 'Escape' || (!horizontal && event.key === backward))
      handled = close(item, event)
    else if (event.key === 'Tab') {
      pending = undefined
      // Let the browser choose the next tab stop before hiding a focused popup.
      if (state.layout !== 'inline')
        setTimeout(
          () => binding.controller.closeAll({ value: undefined, reason: 'keyboard', event }),
          0,
        )
      handled = false
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (item.branch) {
        if (state.layout === 'inline' && state.openValues.includes(item.branch.value()))
          close(item, event)
        else open(item)
      } else {
        // Native activation preserves caller click handlers and link navigation.
        // The key default is cancelled below to avoid a second browser click.
        item.element.click()
      }
    } else if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey &&
      !event.isComposing
    ) {
      const now = Date.now()
      search =
        now - searchedAt < 700
          ? search + event.key.toLocaleLowerCase()
          : event.key.toLocaleLowerCase()
      searchedAt = now
      const query = [...search].every((char) => char === search[0]) ? search[0]! : search
      const rotated = [...items.slice(index + 1), ...items.slice(0, index + 1)]
      const match = rotated.find((candidate) =>
        (candidate.source().textValue ?? candidate.element.textContent ?? '')
          .trim()
          .toLocaleLowerCase()
          .startsWith(query),
      )
      if (match) focus(match)
      else handled = false
    } else handled = false
    if (handled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
  return {
    sync,
    focus,
    keydown,
    onFocus(item: MenuDomItem) {
      active = item.element
      sync()
    },
    clear() {
      pending = undefined
    },
  }
}
