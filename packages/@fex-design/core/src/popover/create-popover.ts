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
  'click', 'hover', 'focus', 'context-menu',
]
const dismiss = { escapeKey: true, outsidePointer: true }
const children = new WeakMap<PopoverController, Set<PopoverController>>()

export interface PopoverController extends Omit<FloatingOverlay, 'setOptions' | 'getSnapshot' | 'subscribe'> {
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
  function withChangeInfo(next: PopoverOptions) {
    return resolveOptions({ ...next, onOpenChange(open, info) {
      reason = info.reason
      source = info.source
      next.onOpenChange?.(open, info)
    } })
  }
  const overlay = createFloatingOverlay(withChangeInfo(options))
  let currentOptions = options
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
    if (base === previousBase && previous.arrow === arrow && previous.popupContainer === popupContainer) return
    previousBase = base
    store.setSnapshot({ ...base, arrow, popupContainer })
  }
  const accessibility = createPopoverAccessibility(() => overlay.getSnapshot().open)
  const descendants = new Set<PopoverController>()
  let wasOpen = overlay.getSnapshot().open
  const unsubscribe = overlay.subscribe(() => {
    publishSnapshot()
    accessibility.sync(reason, source)
    const open = overlay.getSnapshot().open
    const closed = wasOpen && !open
    wasOpen = open
    if (closed) {
      descendants.forEach((child) => child.close({ reason: 'manual', source: 'ancestor-close' }))
    }
  })
  const controller: PopoverController = {
    ...overlay,
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    ancestors: parent ? [...parent.ancestors, parent] : [],
    setOptions(nextOptions: PopoverOptions) {
      currentOptions = nextOptions
      overlay.setOptions(withChangeInfo(nextOptions))
      publishSnapshot()
    },
    setReferenceElement(element) {
      accessibility.setReference(element)
      overlay.setReferenceElement(element)
      publishSnapshot()
    },
    setFloatingElement(element) {
      accessibility.setContent(element, reason)
      overlay.setFloatingElement(element)
    },
    trigger: {
      ...overlay.trigger,
      focus(event) {
        if (!accessibility.restoringFocus) overlay.trigger.focus(event)
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
      accessibility.destroy()
      overlay.destroy()
    },
  }
  children.set(controller, descendants)
  if (parent) children.get(parent)?.add(controller)
  return controller
}
