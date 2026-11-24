import { createStore } from '../store/create-store'
import {
  createFloatingOverlay,
  type FloatingOverlay,
  type FloatingOverlayOptions,
} from '../overlay/create-floating-overlay'
import type { PopoverOptions, PopoverSnapshot } from './types'
import type { DisclosureReason } from '../disclosure/create-disclosure'
import { createPopoverAccessibility } from './accessibility'

const triggers: NonNullable<PopoverOptions['trigger']> = ['click']
const allowedTriggers: NonNullable<PopoverOptions['trigger']> = [
  'click',
  'hover',
  'focus',
  'context-menu',
]
const dismiss = { escapeKey: true, outsidePointer: true }
const children = new WeakMap<PopoverController, Set<PopoverController>>()

export interface PopoverController extends Omit<
  FloatingOverlay,
  'setOptions' | 'getSnapshot' | 'subscribe'
> {
  getSnapshot: () => PopoverSnapshot
  subscribe: (listener: () => void) => () => void
  setOptions: (options: PopoverOptions) => void
  readonly ancestors: readonly PopoverController[]
}

function resolveOptions(options: PopoverOptions): FloatingOverlayOptions {
  return {
    ...options,
    trigger: options.trigger ?? triggers,
    allowedTriggers,
    sideOffset: options.sideOffset ?? 6,
    arrow: options.arrow ?? false,
    arrowPadding: options.arrowPadding ?? 16,
    hoverOpenDelay: options.hoverOpenDelay ?? 0,
    hoverCloseDelay: options.hoverCloseDelay ?? 80,
    closeDelay: options.closeDelay ?? 140,
    lazyMount: options.lazyMount ?? true,
    destroyOnHidden: options.destroyOnHidden ?? false,
    avoidCollisions: options.avoidCollisions ?? true,
    dismiss: options.dismiss ?? dismiss,
  }
}

/** Shared Popover behavior; adapters only connect framework lifecycle and DOM. */
export function createPopover(
  options: PopoverOptions = {},
  parent?: PopoverController | undefined,
): PopoverController {
  let reason: DisclosureReason = 'manual'
  let source: string | undefined
  let originalEvent: unknown
  let currentOptions = options
  let referenceElement: HTMLElement | null = null
  let contentElement: HTMLElement | null = null
  let stopFocusTracking: (() => void) | undefined
  let pendingChange:
    | { open: boolean; reason: DisclosureReason; source?: string | undefined; event?: unknown }
    | undefined
  function withChangeInfo(next: PopoverOptions) {
    return resolveOptions({
      ...next,
      onOpenChange(open, info) {
        reason = info.reason
        source = info.source
        originalEvent = info.event
        if (currentOptions.open !== undefined)
          pendingChange = { open, reason, source, event: originalEvent }
        next.onOpenChange?.(open, info)
      },
    })
  }
  const overlay = createFloatingOverlay(withChangeInfo(options))
  let previousBase = overlay.getSnapshot()
  const store = createStore<PopoverSnapshot>({
    ...previousBase,
    arrow: options.arrow ?? false,
    popupContainer: typeof document === 'undefined' ? null : overlay.resolvePopupContainer(),
  })
  function publishSnapshot() {
    const base = overlay.getSnapshot()
    const arrow = currentOptions.arrow ?? false
    const popupContainer = overlay.resolvePopupContainer()
    const previous = store.getSnapshot()
    if (
      base === previousBase &&
      previous.arrow === arrow &&
      previous.popupContainer === popupContainer
    )
      return
    previousBase = base
    store.setSnapshot({ ...base, arrow, popupContainer })
  }
  const accessibility = createPopoverAccessibility(
    () => overlay.getSnapshot().open,
    () => (currentOptions.trigger ?? triggers).includes('focus'),
    () => currentOptions.onOpenAutoFocus,
    () => currentOptions.onCloseAutoFocus,
    () => currentOptions.isFocusWithin,
  )
  const descendants = new Set<PopoverController>()
  let wasOpen = overlay.getSnapshot().open
  const unsubscribe = overlay.subscribe(() => {
    const open = overlay.getSnapshot().open
    const previouslyOpen = wasOpen
    wasOpen = open
    publishSnapshot()
    // Subscribers can synchronously change disclosure while the snapshot is published.
    if (overlay.getSnapshot().open !== open) return
    accessibility.sync(reason, source, originalEvent)
    if (previouslyOpen && !open && !overlay.getSnapshot().open) {
      descendants.forEach((child) => child.close({ reason: 'manual', source: 'ancestor-close' }))
    }
  })
  const controller: PopoverController = {
    ...overlay,
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    ancestors: parent ? [...parent.ancestors, parent] : [],
    setOptions(nextOptions: PopoverOptions) {
      if (nextOptions.open !== undefined && nextOptions.open !== overlay.getSnapshot().open) {
        // A matching controlled update retains its initiating event; unrelated external updates
        // must not inherit the reason from a previous hover, focus, or dismiss request.
        reason = pendingChange?.open === nextOptions.open ? pendingChange.reason : 'manual'
        source = pendingChange?.open === nextOptions.open ? pendingChange.source : undefined
        originalEvent = pendingChange?.open === nextOptions.open ? pendingChange.event : undefined
        pendingChange = undefined
      }
      // Unrelated option updates must not discard an outstanding controlled request.
      if (nextOptions.open === undefined) pendingChange = undefined
      currentOptions = nextOptions
      overlay.setOptions(withChangeInfo(nextOptions))
      publishSnapshot()
    },
    setReferenceElement(element) {
      referenceElement = element
      accessibility.setReference(element)
      overlay.setReferenceElement(element)
      publishSnapshot()
    },
    setFloatingElement(element) {
      stopFocusTracking?.()
      stopFocusTracking = undefined
      contentElement = element
      if (element) {
        const document = element.ownerDocument
        const focusout = (event: FocusEvent) => {
          const target = event.target
          const next = event.relatedTarget
          const within = (node: EventTarget | null) =>
            node instanceof Element &&
            (element.contains(node) || Boolean(currentOptions.isFocusWithin?.(node, element)))
          // A focus-triggered layer stays open while focus moves through its content,
          // including caller-provided portal descendants, and closes when focus leaves.
          if (
            within(target) &&
            !within(next) &&
            !(next instanceof Node && referenceElement?.contains(next))
          )
            overlay.trigger.blur({ event, target, currentTarget: element })
        }
        document.addEventListener('focusout', focusout)
        stopFocusTracking = () => document.removeEventListener('focusout', focusout)
      }
      accessibility.setContent(element, reason, originalEvent)
      overlay.setFloatingElement(element)
    },
    trigger: {
      ...overlay.trigger,
      focus(event) {
        if (!accessibility.restoringFocus) overlay.trigger.focus(event)
      },
      blur(event) {
        const next = (event.event as FocusEvent | undefined)?.relatedTarget
        if (
          contentElement &&
          next instanceof Element &&
          (contentElement.contains(next) || currentOptions.isFocusWithin?.(next, contentElement))
        )
          return
        overlay.trigger.blur(event)
      },
    },
    content: {
      pointerEnter(event) {
        parent?.content.pointerEnter(event)
        overlay.content.pointerEnter(event)
      },
      pointerLeave(event) {
        parent?.content.pointerLeave(event)
        overlay.content.pointerLeave(event)
      },
    },
    destroy() {
      if (parent) children.get(parent)?.delete(controller)
      unsubscribe()
      descendants.forEach((child) => child.close({ reason: 'manual', source: 'ancestor-close' }))
      descendants.clear()
      children.delete(controller)
      stopFocusTracking?.()
      accessibility.destroy()
      overlay.destroy()
    },
  }
  children.set(controller, descendants)
  if (parent) children.get(parent)?.add(controller)
  return controller
}
