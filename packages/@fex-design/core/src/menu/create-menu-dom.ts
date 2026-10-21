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
import { syncMenuContent } from './content'
import { resolveMenuPopupContainer } from './branch'

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
      items.forEach((item) => {
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
        } else if (state.value.includes(source.value))
          item.element.setAttribute('aria-current', 'true')
        else item.element.removeAttribute('aria-current')
      })
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
        syncMenuContent(binding, content)
        element.querySelectorAll<HTMLElement>('[data-slot="menu-group"]').forEach((group) => {
          const label = group.querySelector<HTMLElement>('[data-slot="menu-group-label"]')
          if (!label) return
          if (!label.id)
            label.id = `${element.id}-group-${[...element.querySelectorAll('[data-slot="menu-group-label"]')].indexOf(label)}`
          if (!group.hasAttribute('aria-label')) group.setAttribute('aria-labelledby', label.id)
        })
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
    listen(element.ownerDocument)
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
        (candidate) => candidate !== item && !candidate.source().disabled,
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
          const target =
            next?.element.isConnected && !next.element.closest('[hidden], [inert]')
              ? next
              : [...items.values()].find(
                  (candidate) =>
                    !candidate.source().disabled && !candidate.element.closest('[hidden], [inert]'),
                )
          keyboard.focus(target)
        })
    }
  }
  function bindContent(
    element: HTMLElement,
    branch?: MenuBranch,
    options: () => MenuContentOptions = () => ({}),
  ) {
    listen(element.ownerDocument)
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
    element.dataset.slot = branch ? 'submenu-content' : 'menu-content'
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
