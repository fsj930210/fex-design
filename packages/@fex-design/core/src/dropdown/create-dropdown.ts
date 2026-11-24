import { createMenuController } from '../menu/create-menu-controller'
import { createMenuDom } from '../menu/create-menu-dom'
import { createPopover, type PopoverController } from '../popover/create-popover'
import type { PopoverOptions } from '../popover/types'
import type { MenuOptions } from '../menu/types'
import type { DropdownOptions } from './types'

/** Coordinates the two existing controllers without duplicating either controller's state. */
export function createDropdown(initial: DropdownOptions = {}, parent?: PopoverController) {
  let options = initial
  let pendingFocus: { position: 'first' | 'last'; event: KeyboardEvent } | undefined
  let pendingContentFocus: { content: HTMLElement; position: 'first' | 'last' } | undefined
  let customReference: HTMLElement | null = null
  let customContent: HTMLElement | null = null
  const contentBindings = new Set<() => void>()
  const overlay = createPopover(popoverOptions(), parent)
  const menu = createMenuController(menuOptions())
  const dom = createMenuDom(menu)
  let wasOpen = overlay.getSnapshot().open
  const unsubscribe = overlay.subscribe(() => {
    const open = overlay.getSnapshot().open
    const previouslyOpen = wasOpen
    wasOpen = open
    if (previouslyOpen !== open) {
      // Controlled submenu values may remain set after a close request is declined.
      // Keep their floating hosts closed while the root is closed without changing that value.
      menu.setOptions(menuOptions())
      dom.refresh()
    }
    if (previouslyOpen && !open) {
      pendingContentFocus = undefined
      if (!overlay.getSnapshot().open) menu.closeAll({ value: undefined, reason: 'outside' })
    }
  })

  function menuOptions(): MenuOptions {
    return {
      ...options.menuProps,
      disabled:
        !overlay.getSnapshot().open ||
        Boolean(options.menuProps?.disabled || options.popoverProps?.disabled),
      layout: 'vertical',
      inlineAccordion: false,
      onActivated(info) {
        options.menuProps?.onActivated?.(info)
        if (options.closeOnSelect !== false)
          overlay.close({ reason: 'manual', source: 'menu-item', event: info.event })
      },
    }
  }

  function popoverOptions(): PopoverOptions {
    return {
      ...options.popoverProps,
      trigger: options.popoverProps?.trigger?.filter(
        (trigger: string) => trigger !== 'context-menu',
      ),
      isFocusWithin(element, content) {
        return Boolean(
          options.popoverProps?.isFocusWithin?.(element, content) ||
          [...dom.contents].some((entry) => entry.element.contains(element)),
        )
      },
      onOpenAutoFocus(event) {
        options.popoverProps?.onOpenAutoFocus?.(event)
        if (event.defaultPrevented || !overlay.getSnapshot().open) return
        event.preventDefault()
        const position =
          pendingFocus && pendingFocus.event === event.originalEvent
            ? pendingFocus.position
            : 'first'
        pendingFocus = undefined
        if (event.reason === 'trigger-hover' || event.reason === 'trigger-focus') return
        if (![...dom.contents].some((entry) => entry.element === event.content)) {
          pendingContentFocus = { content: event.content, position }
          return
        }
        if (!dom.focusItem(position)) event.content.focus({ preventScroll: true })
      },
    }
  }

  function triggerKeyDown(event: KeyboardEvent) {
    if (event.defaultPrevented || options.popoverProps?.disabled) return
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const position = event.key === 'ArrowUp' ? 'last' : 'first'
    if (overlay.getSnapshot().open) {
      if (!dom.focusItem(position))
        [...dom.contents].find((entry) => !entry.branch)?.element.focus({ preventScroll: true })
      return
    }
    pendingFocus = { position, event }
    if (overlay.getSnapshot().trigger.includes('click')) {
      // Keep the click source in sync so clicking the trigger after an arrow-key open closes it.
      overlay.close({ reason: 'manual', source: 'dropdown-keyboard' })
      overlay.trigger.click({ event, target: event.target, currentTarget: event.currentTarget })
    } else {
      overlay.open({ reason: 'manual', source: 'dropdown-keyboard', event })
    }
  }

  function bindContent(element: HTMLElement) {
    // Custom content may be a plain div; the empty-menu fallback needs a focusable host.
    const addedTabIndex = !element.hasAttribute('tabindex')
    if (addedTabIndex) element.tabIndex = -1
    const unbind = dom.bindContent(element, undefined, () => ({ slot: 'dropdown-content' }))
    if (pendingContentFocus?.content === element) {
      const request = pendingContentFocus
      // Menu hosts register during the same framework commit as their content host.
      queueMicrotask(() => {
        if (pendingContentFocus !== request || !overlay.getSnapshot().open || !element.isConnected)
          return
        pendingContentFocus = undefined
        if (!dom.focusItem(request.position)) element.focus({ preventScroll: true })
      })
    }
    let document: Document | undefined
    let tabbing = false
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.defaultPrevented || !overlay.getSnapshot().open) return
      tabbing = [...dom.contents].some((entry) => entry.element.contains(event.target as Node))
    }
    const focusin = (event: FocusEvent) => {
      if (!tabbing) return
      tabbing = false
      if (![...dom.contents].some((entry) => entry.element.contains(event.target as Node)))
        overlay.close({ reason: 'manual', source: 'tab', event })
    }
    const focusout = (event: FocusEvent) => {
      if (!tabbing) return
      queueMicrotask(() => {
        if (!tabbing) return
        tabbing = false
        const active = element.ownerDocument.activeElement
        if (!active || ![...dom.contents].some((entry) => entry.element.contains(active)))
          overlay.close({ reason: 'manual', source: 'tab', event })
      })
    }
    const pointerover = (event: PointerEvent) => {
      if (
        event.defaultPrevented ||
        event.pointerType === 'touch' ||
        !(event.target instanceof Node)
      )
        return
      const submenu = [...dom.contents].find(
        (entry) => entry.branch && entry.element.contains(event.target as Node),
      )
      if (
        !submenu ||
        (event.relatedTarget instanceof Node && submenu.element.contains(event.relatedTarget))
      )
        return
      // Menu submenus may be portalled outside the Popover host; treat them as part of its hover area.
      overlay.content.pointerEnter({ event, target: event.target, currentTarget: submenu.element })
    }
    const pointerout = (event: PointerEvent) => {
      if (
        event.defaultPrevented ||
        event.pointerType === 'touch' ||
        !(event.target instanceof Node)
      )
        return
      const fromSubmenu = [...dom.contents].some(
        (entry) => entry.branch && entry.element.contains(event.target as Node),
      )
      const intoMenu =
        event.relatedTarget instanceof Node &&
        [...dom.contents].some((entry) => entry.element.contains(event.relatedTarget as Node))
      if (fromSubmenu && !intoMenu)
        overlay.content.pointerLeave({
          event,
          target: event.target,
          currentTarget: event.currentTarget,
        })
    }
    let active = true
    const listen = () => {
      if (!active || !element.ownerDocument.defaultView) return
      document = element.ownerDocument
      document.addEventListener('keydown', keydown)
      document.addEventListener('focusin', focusin)
      document.addEventListener('focusout', focusout)
      document.addEventListener('pointerover', pointerover)
      document.addEventListener('pointerout', pointerout)
    }
    if (element.isConnected || element.ownerDocument.defaultView) listen()
    else queueMicrotask(listen)
    const cleanup = () => {
      if (!active) return
      active = false
      document?.removeEventListener('keydown', keydown)
      document?.removeEventListener('focusin', focusin)
      document?.removeEventListener('focusout', focusout)
      document?.removeEventListener('pointerover', pointerover)
      document?.removeEventListener('pointerout', pointerout)
      unbind()
      if (addedTabIndex && element.getAttribute('tabindex') === '-1')
        element.removeAttribute('tabindex')
      contentBindings.delete(cleanup)
    }
    contentBindings.add(cleanup)
    return cleanup
  }

  /** Connect a custom trigger without rendering the framework's Trigger component. */
  function bindTrigger(element: HTMLElement) {
    customReference = element
    overlay.setReferenceElement(element)
    return () => {
      if (customReference !== element) return
      customReference = null
      overlay.setReferenceElement(null)
    }
  }

  /** Connect one custom host to both floating positioning and root menu navigation. */
  function bindFloatingContent(element: HTMLElement) {
    customContent = element
    const unbind = bindContent(element)
    // Some framework refs run before insertion; Floating UI needs a connected host.
    if (element.isConnected) overlay.setFloatingElement(element)
    else
      queueMicrotask(() => {
        if (customContent === element && element.isConnected) overlay.setFloatingElement(element)
      })
    return () => {
      unbind()
      if (customContent !== element) return
      customContent = null
      overlay.setFloatingElement(null)
    }
  }

  return {
    overlay,
    menu,
    dom,
    bindTrigger,
    bindContent,
    bindFloatingContent,
    triggerKeyDown,
    setOptions(next: DropdownOptions) {
      options = next
      menu.setOptions(menuOptions())
      dom.refresh()
      overlay.setOptions(popoverOptions())
    },
    destroy() {
      pendingFocus = undefined
      pendingContentFocus = undefined
      customReference = null
      customContent = null
      unsubscribe()
      contentBindings.forEach((cleanup) => cleanup())
      dom.destroy()
      overlay.destroy()
    },
  }
}
