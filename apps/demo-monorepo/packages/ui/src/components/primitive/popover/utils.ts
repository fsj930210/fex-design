import { type DisclosureChangeInfo, type DisclosureReason } from '@demo/utils/shared/disclosure/create-disclosure'
import { createFloatingOverlay, type FloatingOverlay, type FloatingOverlayOptions, type FloatingOverlaySnapshot } from '@demo/utils/shared/overlay/create-floating-overlay'
import { type OverlayTrigger } from '@demo/utils/shared/overlay/trigger/create-trigger'
import { type FloatingMountOptions } from '@demo/utils/shared/overlay/presence/types'
import { createStore } from '@demo/utils/shared/store/create-store'

export type PopoverTrigger = OverlayTrigger
export type PopoverChangeInfo = DisclosureChangeInfo
export type { FloatingAlign, FloatingPlacement, FloatingSide } from '@demo/utils/shared/floating/placement'

/** Primitive 与 UI、五框架共用的 Popover 行为配置。 */
export interface PopoverOptions
  extends
    Omit<
      FloatingOverlayOptions,
      'forceMount' | 'allowedTriggers' | 'autoAdjustOverflow' | 'offset' | 'modal'
    >,
    FloatingMountOptions {
  /**
   * 触发方式，可以组合；context-menu 使用连字符。
   * @default ['click']
   */
  trigger?: PopoverTrigger[] | undefined
}

/** UI Popover 可定制的结构部位；样式值使用各框架原生类型。 */
export type PopoverSemanticPart = 'root' | 'title' | 'content' | 'arrow'
export type PopoverClassNames = Partial<Record<PopoverSemanticPart, string>>

/** Content slots can close either controlled or uncontrolled Popovers. */
export interface PopoverRenderState {
  readonly open: boolean
  close: () => void
}

/** Portal overrides the root container resolver; without either, use ownerDocument.body. */
export interface PopoverPortalOptions {
  container?: HTMLElement | null | undefined
}

/** Resolved shared configuration is observable without a framework-local state copy. */
export interface PopoverSnapshot extends FloatingOverlaySnapshot {
  arrow: boolean
  popupContainer: HTMLElement | null
}

/** UI adapters use one list when separating behavior from native content props. */
export const popoverOptionKeys = [
  'open',
  'defaultOpen',
  'onOpenChange',
  'trigger',
  'disabled',
  'placement',
  'side',
  'align',
  'sideOffset',
  'alignOffset',
  'strategy',
  'avoidCollisions',
  'collisionBoundary',
  'collisionPadding',
  'arrow',
  'arrowPadding',
  'matchReferenceWidth',
  'hideWhenDetached',
  'zIndex',
  'getPopupContainer',
  'hoverOpenDelay',
  'hoverCloseDelay',
  'closeDelay',
  'dismiss',
  'lazyMount',
  'destroyOnHidden',
] as const satisfies readonly (keyof PopoverOptions)[]

export function splitPopoverOptions<T extends PopoverOptions>(props: T) {
  const options: Record<string, unknown> = {}
  const remaining = { ...props }
  for (const key of popoverOptionKeys) {
    if (key in props) options[key] = props[key]
    delete remaining[key]
  }
  return [options as PopoverOptions, remaining as Omit<T, keyof PopoverOptions>] as const
}

let nextContentId = 0
const focusable =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

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

  function focusContent(reason: DisclosureReason) {
    if (reason === 'trigger-hover' || reason === 'trigger-focus') return
    const target = content
    // Refs may run before Portal insertion or before closed styles are removed.
    queueMicrotask(() => {
      if (!target || content !== target || !isOpen() || !target.isConnected) return
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
        observer.observe(content, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['id'],
        })
      }
      if (isOpen()) focusContent(reason)
    },
    sync(reason: DisclosureReason, source?: string) {
      const open = isOpen()
      if (open && !wasOpen) focusContent(reason)
      if (
        !open &&
        wasOpen &&
        content?.contains(content.ownerDocument.activeElement) &&
        reason !== 'outside-pointer' &&
        source !== 'ancestor-close'
      ) {
        restoringFocus = true
        try {
          reference?.focus({ preventScroll: true })
        } finally {
          restoringFocus = false
        }
      }
      wasOpen = open
    },
    destroy() {
      observer?.disconnect()
      content = null
      reference = null
    },
  }
}

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
  function withChangeInfo(next: PopoverOptions) {
    return resolveOptions({
      ...next,
      onOpenChange(open, info) {
        reason = info.reason
        source = info.source
        next.onOpenChange?.(open, info)
      },
    })
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
    if (
      base === previousBase &&
      previous.arrow === arrow &&
      previous.popupContainer === popupContainer
    )
      return
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
