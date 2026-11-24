import type { DisclosureChangeInfo } from '../disclosure/create-disclosure'
import { createStore } from '../store/create-store'
import {
  createFloating,
  type FloatingOptions,
  type FloatingSnapshot,
} from '../floating/create-floating'
import { createOverlay } from './create-overlay'
import { createTrigger, type OverlayTrigger } from './trigger/create-trigger'
import type { Overlay, OverlayEventInfo, OverlayOptions, OverlaySnapshot } from './types'

export interface FloatingOverlayOptions extends OverlayOptions, FloatingOptions {
  trigger?: OverlayTrigger[] | undefined
  allowedTriggers?: OverlayTrigger[] | undefined
  hoverOpenDelay?: number | undefined
  hoverCloseDelay?: number | undefined
  disabled?: boolean | undefined
  getPopupContainer?: ((referenceElement: HTMLElement | null) => HTMLElement) | undefined
}

export interface FloatingOverlaySnapshot extends OverlaySnapshot, FloatingSnapshot {
  trigger: OverlayTrigger[]
}

export interface FloatingOverlay extends Omit<
  Overlay,
  'getSnapshot' | 'subscribe' | 'setOptions' | 'destroy'
> {
  getSnapshot: () => FloatingOverlaySnapshot
  subscribe: (listener: () => void) => () => void
  setOptions: (options: FloatingOverlayOptions) => void
  setReferenceElement: (element: HTMLElement | null) => void
  setFloatingElement: (element: HTMLElement | null) => void
  setArrowElement: (element: HTMLElement | null) => void
  setVirtualReference: ReturnType<typeof createFloating>['setVirtualReference']
  updatePosition: () => Promise<void>
  resolvePopupContainer: () => HTMLElement | null
  trigger: ReturnType<typeof createTrigger>['trigger']
  content: ReturnType<typeof createTrigger>['content']
  destroy: () => void
}

function toEventInfo(event: Event & Partial<PointerEvent>) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: event.clientX,
    clientY: event.clientY,
    button: event.button,
    pointerType: event.pointerType,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}

export function createFloatingOverlay(options: FloatingOverlayOptions = {}): FloatingOverlay {
  let currentOptions = options
  let referenceElement: HTMLElement | null = null
  let floatingElement: HTMLElement | null = null
  let arrowElement: HTMLElement | null = null
  let dismissDocument: Document | null = null
  // Combines overlay state, floating DOM positioning, and trigger event requests.
  // Keep the instance stable; framework adapters update options instead of recreating it.
  const overlay = createOverlay(withDismissCleanup(options))
  const floating = createFloating(options)

  const trigger = createTrigger({
    trigger: options.trigger,
    allowedTriggers: options.allowedTriggers,
    hoverOpenDelay: options.hoverOpenDelay,
    hoverCloseDelay: options.hoverCloseDelay,
    disabled: options.disabled,
    onOpenChangeRequest: (open, info) => {
      overlay[open ? 'open' : 'close'](info)
    },
  })

  function withDismissCleanup(nextOptions: FloatingOverlayOptions): FloatingOverlayOptions {
    return {
      ...nextOptions,
      onOpenChange(open, info) {
        // A lower layer may receive the same document event without owning dismissal.
        if (!open && (info.reason === 'escape-key' || info.reason === 'outside-pointer'))
          trigger.clear(info, false)
        nextOptions.onOpenChange?.(open, info)
      },
    }
  }

  function createSnapshot(): FloatingOverlaySnapshot {
    return {
      ...overlay.getSnapshot(),
      ...floating.getSnapshot(),
      trigger: trigger.getTriggers(),
    }
  }

  const store = createStore<FloatingOverlaySnapshot>(createSnapshot())

  function readSnapshot(): FloatingOverlaySnapshot {
    const overlaySnapshot = overlay.getSnapshot()
    const floatingSnapshot = floating.getSnapshot()
    const nextSnapshot = {
      ...overlaySnapshot,
      ...floatingSnapshot,
      trigger: trigger.getTriggers(),
    }
    const snapshot = store.getSnapshot()
    // Only publish semantic snapshot changes to avoid noisy adapter refreshes.
    if (
      snapshot.open === nextSnapshot.open &&
      snapshot.mounted === nextSnapshot.mounted &&
      snapshot.phase === nextSnapshot.phase &&
      snapshot.placement === nextSnapshot.placement &&
      snapshot.side === nextSnapshot.side &&
      snapshot.align === nextSnapshot.align &&
      snapshot.referenceHidden === nextSnapshot.referenceHidden &&
      snapshot.escaped === nextSnapshot.escaped &&
      snapshot.trigger === nextSnapshot.trigger
    ) {
      return snapshot
    }
    store.setSnapshot(nextSnapshot)
    return nextSnapshot
  }

  function isInsideDismissBoundary(target: EventTarget | null) {
    return (
      target instanceof Node &&
      (referenceElement?.contains(target) ||
        floatingElement?.contains(target) ||
        arrowElement?.contains(target))
    )
  }

  function handleDocumentPointerDown(event: PointerEvent) {
    if (isInsideDismissBoundary(event.target)) {
      return
    }
    overlay.dismiss.outsidePointer(toEventInfo(event))
  }

  function handleDocumentKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return
    }
    overlay.dismiss.escapeKey(toEventInfo(event))
  }

  function stopDocumentDismiss() {
    if (!dismissDocument) {
      return
    }
    dismissDocument.removeEventListener('pointerdown', handleDocumentPointerDown, true)
    dismissDocument.removeEventListener('keydown', handleDocumentKeyDown, true)
    dismissDocument = null
  }

  function syncDocumentDismiss(nextSnapshot = store.getSnapshot()) {
    const dismiss = currentOptions.dismiss
    const dismissDisabled = dismiss?.escapeKey === false && dismiss.outsidePointer === false
    if (dismissDisabled || !nextSnapshot.open || !nextSnapshot.mounted || !floatingElement) {
      stopDocumentDismiss()
      return
    }

    const ownerDocument = floatingElement.ownerDocument
    if (dismissDocument === ownerDocument) {
      return
    }

    stopDocumentDismiss()
    dismissDocument = ownerDocument
    if (dismiss?.outsidePointer !== false) {
      ownerDocument.addEventListener('pointerdown', handleDocumentPointerDown, true)
    }
    if (dismiss?.escapeKey !== false) {
      ownerDocument.addEventListener('keydown', handleDocumentKeyDown, true)
    }
  }

  function syncAutoUpdate(nextSnapshot = store.getSnapshot()) {
    // Floating UI 的 autoUpdate 需要真实 DOM 已经挂载，所以必须同时满足 open 和 mounted。
    if (nextSnapshot.open && nextSnapshot.mounted && floatingElement) {
      void floating.update()
      floating.startAutoUpdate()
      return
    }
    floating.stopAutoUpdate()
  }

  function emitFromOverlay() {
    const nextSnapshot = readSnapshot()
    syncAutoUpdate(nextSnapshot)
    syncDocumentDismiss(nextSnapshot)
  }

  function emitFromFloating() {
    readSnapshot()
  }

  const unsubscribeOverlay = overlay.subscribe(emitFromOverlay)
  const unsubscribeFloating = floating.subscribe(emitFromFloating)

  function makeTriggerOptions(nextOptions: FloatingOverlayOptions) {
    return {
      trigger: nextOptions.trigger,
      allowedTriggers: nextOptions.allowedTriggers,
      hoverOpenDelay: nextOptions.hoverOpenDelay,
      hoverCloseDelay: nextOptions.hoverCloseDelay,
      disabled: nextOptions.disabled,
      onOpenChangeRequest: (open: boolean, info: DisclosureChangeInfo) => {
        overlay[open ? 'open' : 'close'](info)
      },
    }
  }

  return {
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    setOptions: (nextOptions) => {
      const externallyClosing = overlay.getSnapshot().open && nextOptions.open === false
      // 受控调用方可以直接把 open 设为 false。此时没有经过 overlay.close，必须同步
      // 清理 click/focus 来源，否则下次第一次触发只会移除残留 source 而无法重新打开。
      if (externallyClosing) {
        trigger.clear({ reason: 'manual' }, false)
      }
      currentOptions = nextOptions
      overlay.setOptions(withDismissCleanup(nextOptions))
      floating.setOptions(nextOptions)
      trigger.setOptions(makeTriggerOptions(nextOptions))
      emitFromOverlay()
    },
    setLayerElement: overlay.setLayerElement,
    setOverlayElement: overlay.setOverlayElement,
    setReferenceElement: (element) => {
      referenceElement = element
      floating.setReferenceElement(element)
      syncAutoUpdate()
      syncDocumentDismiss()
    },
    setFloatingElement: (element) => {
      floatingElement = element
      // floatingElement 同时是 overlay layer 边界和 floating 定位元素。
      overlay.setLayerElement(element)
      floating.setFloatingElement(element)
      syncAutoUpdate()
      syncDocumentDismiss()
    },
    setArrowElement: (element) => {
      arrowElement = element
      floating.setArrowElement(element)
      syncDocumentDismiss()
    },
    setVirtualReference: (reference) => {
      floating.setVirtualReference(reference)
      syncAutoUpdate()
    },
    updatePosition: floating.update,
    resolvePopupContainer: () => {
      if (currentOptions.getPopupContainer) {
        return currentOptions.getPopupContainer(referenceElement)
      }
      return referenceElement?.ownerDocument.body ?? globalThis.document?.body ?? null
    },
    open: overlay.open,
    close: (info) => {
      trigger.clear(info, false)
      overlay.close(info)
    },
    toggle: (info) => {
      if (overlay.getSnapshot().open) {
        trigger.clear(info, false)
        overlay.close(info)
      } else {
        overlay.open(info)
      }
    },
    dismiss: {
      escapeKey: (event: OverlayEventInfo) => {
        if (!overlay.getSnapshot().open)
          trigger.clear({ reason: 'escape-key', event: event.event }, false)
        overlay.dismiss.escapeKey(event)
      },
      outsidePointer: (event) => {
        if (!overlay.getSnapshot().open)
          trigger.clear({ reason: 'outside-pointer', event: event.event }, false)
        overlay.dismiss.outsidePointer(event)
      },
      overlayPointer: overlay.dismiss.overlayPointer,
    },
    trigger: {
      ...trigger.trigger,
      click: (event) => {
        // A declined controlled open request must not consume the next click while still closed.
        if (!overlay.getSnapshot().open && trigger.hasOpenSource('click'))
          trigger.clearOpenSource('click')
        // An externally or programmatically opened overlay has no trigger source to toggle off.
        if (
          overlay.getSnapshot().open &&
          !trigger.hasOpenSources() &&
          !currentOptions.disabled &&
          trigger.getTriggers().includes('click')
        ) {
          overlay.close({ reason: 'trigger-click', event: event.event })
          return
        }
        trigger.trigger.click(event)
      },
    },
    content: trigger.content,
    destroy: () => {
      stopDocumentDismiss()
      unsubscribeOverlay()
      unsubscribeFloating()
      trigger.destroy()
      floating.destroy()
      overlay.destroy()
    },
  }
}
