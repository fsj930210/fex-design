import type { DisclosureReason } from '../disclosure/create-disclosure'

let nextContentId = 0
const focusable = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Shared DOM accessibility; framework adapters only register their real nodes. */
export function createPopoverAccessibility(isOpen: () => boolean) {
  let content: HTMLElement | null = null
  let reference: HTMLElement | null = null
  let observer: MutationObserver | undefined
  let restoringFocus = false
  let wasOpen = false
  let labelledBy: string | null = null
  let describedBy: string | null = null

  function updateRelation(attribute: string, selector: string, previous: string | null) {
    if (!content) return null
    const current = content.getAttribute(attribute)
    // Explicit user ARIA always wins over the generated relation.
    if (current && current !== previous) return previous
    const part = content.querySelector<HTMLElement>(selector)
    if (!part) {
      if (previous && current === previous) content.removeAttribute(attribute)
      return null
    }
    if (!part.id) part.id = `${content.id}-${attribute === 'aria-labelledby' ? 'title' : 'description'}`
    if (current !== part.id) content.setAttribute(attribute, part.id)
    return part.id
  }

  function syncRelations() {
    if (!content) return
    if (!content.id) content.id = `popover-content-${++nextContentId}`
    if (reference) reference.setAttribute('aria-controls', content.id)
    labelledBy = updateRelation('aria-labelledby', '[data-slot="popover-title"]', labelledBy)
    describedBy = updateRelation('aria-describedby', '[data-slot="popover-description"]', describedBy)
  }

  function focusContent(reason: DisclosureReason) {
    if (reason === 'trigger-hover' || reason === 'trigger-focus') return
    const target = content
    // Refs may run before Portal insertion or before closed styles are removed.
    queueMicrotask(() => {
      if (!target || content !== target || !isOpen() || !target.isConnected) return
      if (target.getAttribute('role') !== 'dialog') return
      if (target.contains(target.ownerDocument.activeElement)) return
      const first = Array.from(target.querySelectorAll<HTMLElement>(focusable))
        .find((element) => !element.closest('[hidden], [inert]') && element.getClientRects().length > 0)
      ;(first ?? target).focus({ preventScroll: true })
    })
  }

  return {
    get restoringFocus() { return restoringFocus },
    setReference(element: HTMLElement | null) {
      reference = element
      syncRelations()
    },
    setContent(element: HTMLElement | null, reason: DisclosureReason) {
      observer?.disconnect()
      observer = undefined
      content = element
      labelledBy = null
      describedBy = null
      if (!content) {
        reference?.removeAttribute('aria-controls')
        return
      }
      syncRelations()
      const Observer = content.ownerDocument.defaultView?.MutationObserver
      if (Observer) {
        observer = new Observer(syncRelations)
        observer.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ['id'] })
      }
      if (isOpen()) focusContent(reason)
    },
    sync(reason: DisclosureReason, source?: string) {
      const open = isOpen()
      if (open && !wasOpen) focusContent(reason)
      if (!open && wasOpen && content?.contains(content.ownerDocument.activeElement)
        && reason !== 'outside-pointer' && source !== 'ancestor-close') {
        restoringFocus = true
        try { reference?.focus({ preventScroll: true }) } finally { restoringFocus = false }
      }
      wasOpen = open
    },
    destroy() { observer?.disconnect(); content = null; reference = null },
  }
}
