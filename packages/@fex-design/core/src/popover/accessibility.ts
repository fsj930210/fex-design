import type { DisclosureReason } from '../disclosure/create-disclosure'
import type { PopoverCloseAutoFocusEvent, PopoverOpenAutoFocusEvent } from './types'

let nextContentId = 0
const focusable =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Shared DOM accessibility; framework adapters only register their real nodes. */
export function createPopoverAccessibility(
  isOpen: () => boolean,
  preserveTriggerFocus: () => boolean,
  onOpenAutoFocus: () => ((event: PopoverOpenAutoFocusEvent) => void) | undefined,
  onCloseAutoFocus: () => ((event: PopoverCloseAutoFocusEvent) => void) | undefined,
  isFocusWithin: () => ((element: Element, content: HTMLElement) => boolean) | undefined,
) {
  let content: HTMLElement | null = null
  let reference: HTMLElement | null = null
  let observer: MutationObserver | undefined
  let restoringFocus = false
  let wasOpen = false
  let labelledBy: string | null = null
  let describedBy: string | null = null
  let focusGeneration = 0
  let focusedContent: HTMLElement | null = null
  let focusReason: DisclosureReason = 'manual'
  let focusEvent: unknown

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
    if (!part.id)
      part.id = `${content.id}-${attribute === 'aria-labelledby' ? 'title' : 'description'}`
    if (current !== part.id) content.setAttribute(attribute, part.id)
    return part.id
  }

  function syncRelations() {
    if (!content) return
    if (!content.id) content.id = `popover-content-${++nextContentId}`
    if (reference) reference.setAttribute('aria-controls', content.id)
    labelledBy = updateRelation('aria-labelledby', '[data-slot="popover-title"]', labelledBy)
    describedBy = updateRelation(
      'aria-describedby',
      '[data-slot="popover-description"]',
      describedBy,
    )
  }

  function focusContent(reason: DisclosureReason, originalEvent: unknown) {
    const target = content
    const generation = ++focusGeneration
    // Refs may run before Portal insertion or before closed styles are removed.
    queueMicrotask(() => {
      if (
        !target ||
        content !== target ||
        !isOpen() ||
        !target.isConnected ||
        target.closest('[hidden], [inert]') ||
        generation !== focusGeneration ||
        focusedContent === target
      )
        return
      focusedContent = target
      let prevented = false
      const event: PopoverOpenAutoFocusEvent = {
        content: target,
        reason,
        originalEvent,
        get defaultPrevented() {
          return prevented
        },
        preventDefault() {
          prevented = true
        },
      }
      onOpenAutoFocus()?.(event)
      if (
        event.defaultPrevented ||
        !isOpen() ||
        content !== target ||
        reason === 'trigger-hover' ||
        reason === 'trigger-focus'
      )
        return
      // Controlled input popovers can open through prop synchronization instead of a focus event.
      if (preserveTriggerFocus()) return
      if (target.getAttribute('role') !== 'dialog') return
      if (target.contains(target.ownerDocument.activeElement)) return
      const first = Array.from(target.querySelectorAll<HTMLElement>(focusable)).find(
        (element) => !element.closest('[hidden], [inert]') && element.getClientRects().length > 0,
      )
      ;(first ?? target).focus({ preventScroll: true })
    })
  }

  return {
    get restoringFocus() {
      return restoringFocus
    },
    setReference(element: HTMLElement | null) {
      reference = element
      syncRelations()
    },
    setContent(element: HTMLElement | null, reason: DisclosureReason, originalEvent: unknown) {
      focusReason = reason
      focusEvent = originalEvent
      observer?.disconnect()
      observer = undefined
      content = element
      if (!element) {
        focusGeneration++
        focusedContent = null
      }
      labelledBy = null
      describedBy = null
      if (!content) {
        reference?.removeAttribute('aria-controls')
        return
      }
      syncRelations()
      const Observer = content.ownerDocument.defaultView?.MutationObserver
      if (Observer) {
        observer = new Observer(() => {
          syncRelations()
          if (isOpen() && focusedContent !== content) focusContent(focusReason, focusEvent)
        })
        observer.observe(content, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['id', 'hidden', 'inert'],
        })
      }
      if (isOpen()) focusContent(reason, originalEvent)
    },
    sync(reason: DisclosureReason, source?: string, originalEvent?: unknown) {
      focusReason = reason
      focusEvent = originalEvent
      const open = isOpen()
      const previouslyOpen = wasOpen
      // Record the transition before callbacks; they may synchronously reopen the layer.
      wasOpen = open
      if (!open) {
        focusGeneration++
        focusedContent = null
      }
      if (open && !previouslyOpen) focusContent(reason, originalEvent)
      if (
        !open &&
        previouslyOpen &&
        content &&
        content.ownerDocument.activeElement &&
        (content.contains(content.ownerDocument.activeElement) ||
          isFocusWithin()?.(content.ownerDocument.activeElement, content)) &&
        reason !== 'outside-pointer' &&
        source !== 'ancestor-close'
      ) {
        let prevented = false
        const event: PopoverCloseAutoFocusEvent = {
          reference,
          reason,
          source,
          originalEvent,
          get defaultPrevented() {
            return prevented
          },
          preventDefault() {
            prevented = true
          },
        }
        onCloseAutoFocus()?.(event)
        if (!event.defaultPrevented && !isOpen()) {
          restoringFocus = true
          try {
            reference?.focus({ preventScroll: true })
          } finally {
            restoringFocus = false
          }
        }
      }
    },
    destroy() {
      focusGeneration++
      observer?.disconnect()
      content = null
      reference = null
    },
  }
}
