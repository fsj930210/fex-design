import type { MenuController, MenuNode } from './types'
import type {
  MenuBranch,
  MenuContentOptions,
  MenuDomBinding,
  MenuDomContent,
  MenuDomItem,
  MenuItemSource,
} from './dom-types'
import { createMenuKeyboard } from './keyboard'
import {
  canFocusMenuItem,
  focusMenuItemOrContent,
  syncMenuItem,
  syncMenuContentAndGroups,
} from './sync-hosts'
import { resolveMenuPopupContainer } from './branch'
import { listenInOwnerDocument } from './listen-in-owner-document'

/** One DOM adapter per instance. Frameworks register hosts; no document-wide value lookup. */
export function createMenuDom(controller: MenuController): MenuDomBinding {
  const items = new Map<HTMLElement, MenuDomItem>()
  const contents = new Set<MenuDomContent>()
  const documents = new Map<Document, () => void>()
  let refreshing = false
  let queued = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const binding: MenuDomBinding = {
    controller,
    items,
    contents,
    refresh: schedule,
    focusItem: (position, parent) => keyboard.focusItem(position, parent),
    bindItem,
    bindContent,
    destroy,
  }
  const keyboard = createMenuKeyboard(binding)
  let unsubscribe: (() => void) | undefined = controller.subscribe(schedule)

  function itemAt(target: EventTarget | null) {
    if (!(target instanceof Node)) return undefined
    let node: Node | null = target
    while (node) {
      if (node instanceof HTMLElement && items.has(node)) return items.get(node)
      node = node.parentNode
    }
    return undefined
  }
  function contains(target: EventTarget | null) {
    return (
      target instanceof Node &&
      ([...contents].some((c) => c.element.contains(target)) || Boolean(itemAt(target)))
    )
  }
  function schedule() {
    if (queued) return
    queued = true
    queueMicrotask(() => {
      queued = false
      flush()
    })
  }
  function listen(document: Document) {
    unsubscribe ??= controller.subscribe(schedule)
    if (documents.has(document)) return
    const click = (event: MouseEvent) => {
      const item = itemAt(event.target)
      if (!item || event.defaultPrevented || event.button !== 0) return
      if (controller.getSnapshot().disabled || item.source().disabled) {
        event.preventDefault()
        return
      }
      if (item.branch) {
        const value = item.branch.value()
        controller.setOpen(value, !controller.getSnapshot().openValues.includes(value), {
          value,
          reason: 'click',
          event,
        })
      } else controller.activate(item.source().value, event)
    }
    const keydown = (event: KeyboardEvent) => {
      const item = itemAt(event.target)
      if (item) keyboard.keydown(event, item)
    }
    const focusin = (event: FocusEvent) => {
      const item = itemAt(event.target)
      if (item) keyboard.onFocus(item)
      else if (!contains(event.target) && controller.getSnapshot().layout !== 'inline') {
        keyboard.clear()
        controller.closeAll({ value: undefined, reason: 'outside', event })
      }
    }
    const outside = (event: PointerEvent) => {
      if (
        !event.defaultPrevented &&
        !contains(event.target) &&
        controller.getSnapshot().layout !== 'inline'
      ) {
        keyboard.clear()
        controller.closeAll({ value: undefined, reason: 'outside', event })
      }
    }
    const hover = (event: PointerEvent) => {
      const state = controller.getSnapshot()
      if (
        event.defaultPrevented ||
        event.pointerType === 'touch' ||
        state.layout === 'inline' ||
        state.submenuTrigger !== 'hover'
      )
        return
      const item = itemAt(event.target)
      const content = [...contents].find((c) =>
        c.element.contains(event.target instanceof Node ? event.target : null),
      )
      if (event.type === 'pointerover' && (item || content)) {
        clearTimeout(timer)
        if (
          item?.branch &&
          !item.element.contains(event.relatedTarget instanceof Node ? event.relatedTarget : null)
        ) {
          const value = item.branch.value()
          timer = setTimeout(
            () => controller.setOpen(value, true, { value, reason: 'hover', event }),
            state.openDelay,
          )
        } else if (item && !item.branch) {
          timer = setTimeout(() => {
            if (item.parent)
              controller.setOpen(item.parent.value(), true, {
                value: item.parent.value(),
                reason: 'hover',
                event,
              })
            else controller.closeAll({ value: undefined, reason: 'hover', event })
          }, state.openDelay)
        }
      } else if (
        event.type === 'pointerout' &&
        contains(event.target) &&
        !contains(event.relatedTarget)
      ) {
        clearTimeout(timer)
        timer = setTimeout(
          () => controller.closeAll({ value: undefined, reason: 'hover', event }),
          state.closeDelay,
        )
      }
    }
    document.addEventListener('click', click)
    document.addEventListener('keydown', keydown)
    document.addEventListener('focusin', focusin)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('pointerover', hover)
    document.addEventListener('pointerout', hover)
    documents.set(document, () => {
      document.removeEventListener('click', click)
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('focusin', focusin)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('pointerover', hover)
      document.removeEventListener('pointerout', hover)
    })
  }
  function flush() {
    if (refreshing) return
    refreshing = true
    try {
      const state = controller.getSnapshot()
      items.forEach((item) => syncMenuItem(controller, item, state))
      contents.forEach((content) => {
        const { element, branch } = content
        if (branch && state.layout !== 'inline' && !content.options().managedPortal) {
          const target =
            resolveMenuPopupContainer(binding, branch, content.options().container) ??
            element.ownerDocument.body
          if (element.parentNode !== target) {
            content.restore()
            const marker = element.ownerDocument.createComment('submenu')
            element.before(marker)
            content.restore = () => {
              if (marker.parentNode) marker.replaceWith(element)
              content.restore = () => {}
            }
            target.appendChild(element)
          }
        }
        syncMenuContentAndGroups(binding, content)
      })
      keyboard.sync()
    } finally {
      refreshing = false
    }
  }
  function bindItem(
    element: HTMLElement,
    source: () => MenuItemSource,
    parent?: MenuBranch,
    branch?: MenuBranch,
  ) {
    if (element instanceof HTMLButtonElement && !element.hasAttribute('type'))
      element.type = 'button'
    const initial = source()
    const node: MenuNode = {
      value: branch?.value() ?? initial.value,
      parent: parent?.value(),
      branch: Boolean(branch),
      disabled: Boolean(initial.disabled),
    }
    const item: MenuDomItem = {
      element,
      source,
      parent,
      branch,
      node,
      unregister: controller.registerNode(node),
    }
    items.set(element, item)
    listenInOwnerDocument(element, () => items.get(element) === item, listen)
    // Disabled custom anchors/buttons must suppress their native action and caller handlers too.
    const guard = (event: Event) => {
      if (controller.getSnapshot().disabled || source().disabled) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }
    element.addEventListener('click', guard, true)
    schedule()
    return () => {
      const hadFocus = element === element.ownerDocument.activeElement
      const siblings = [...items.values()].filter(
        (candidate) =>
          candidate !== item && candidate.parent === item.parent && !candidate.source().disabled,
      )
      const next =
        siblings.find((candidate) =>
          Boolean(element.compareDocumentPosition(candidate.element) & 4),
        ) ?? siblings.at(-1)
      item.unregister()
      items.delete(element)
      element.removeEventListener('click', guard, true)
      schedule()
      if (hadFocus)
        queueMicrotask(() => {
          const active = element.ownerDocument.activeElement
          if (
            controller.getSnapshot().disabled ||
            (active && active !== element && active !== element.ownerDocument.body)
          )
            return
          const target =
            next && items.has(next.element) && canFocusMenuItem(next, item.parent)
              ? next
              : [...items.values()].find((candidate) => canFocusMenuItem(candidate, item.parent))
          focusMenuItemOrContent(target, contents, item.parent, keyboard.focus)
        })
    }
  }
  function bindContent(
    element: HTMLElement,
    branch?: MenuBranch,
    options: () => MenuContentOptions = () => ({}),
  ) {
    const observer = new MutationObserver(schedule)
    // Observe consumer DOM changes, not attributes managed by this adapter.
    observer.observe(element, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['hidden'],
    })
    const content: MenuDomContent = {
      element,
      branch,
      options,
      overlay: undefined,
      restore() {},
      stop: () => observer.disconnect(),
    }
    contents.add(content)
    listenInOwnerDocument(element, () => contents.has(content), listen)
    element.dataset.slot = branch ? 'submenu-content' : (options().slot ?? 'menu-content')
    schedule()
    return () => {
      content.stop()
      content.stopOverlay?.()
      content.overlay?.destroy()
      content.restore()
      contents.delete(content)
      schedule()
    }
  }
  function destroy() {
    clearTimeout(timer)
    keyboard.clear()
    unsubscribe?.()
    unsubscribe = undefined
    contents.forEach((content) => {
      content.stop()
      content.stopOverlay?.()
      content.overlay?.destroy()
      content.restore()
    })
    items.forEach((item) => item.unregister())
    contents.clear()
    items.clear()
    documents.forEach((stop) => stop())
    documents.clear()
  }
  return binding
}
