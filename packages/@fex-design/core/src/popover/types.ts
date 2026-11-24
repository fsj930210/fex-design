import type { DisclosureChangeInfo, DisclosureReason } from '../disclosure/create-disclosure'
import type {
  FloatingOverlayOptions,
  FloatingOverlaySnapshot,
} from '../overlay/create-floating-overlay'
import type { OverlayTrigger } from '../overlay/trigger/create-trigger'
import type { FloatingMountOptions } from '../overlay/presence/types'

export type PopoverTrigger = OverlayTrigger
export type PopoverChangeInfo = DisclosureChangeInfo
export interface PopoverOpenAutoFocusEvent {
  readonly content: HTMLElement
  readonly reason: DisclosureReason
  readonly originalEvent?: unknown
  readonly defaultPrevented: boolean
  preventDefault(): void
}
export interface PopoverCloseAutoFocusEvent {
  readonly reference: HTMLElement | null
  readonly reason: DisclosureReason
  readonly source?: string | undefined
  readonly originalEvent?: unknown
  readonly defaultPrevented: boolean
  preventDefault(): void
}
export type { FloatingAlign, FloatingPlacement, FloatingSide } from '../floating/placement'

/** Primitive 与 UI、五框架共用的 Popover 行为配置。 */
export interface PopoverOptions
  extends
    Omit<
      FloatingOverlayOptions,
      'forceMount' | 'allowedTriggers' | 'autoAdjustOverflow' | 'offset' | 'modal'
    >,
    FloatingMountOptions {
  /** Override the default dialog focus behavior after open and content mount. */
  onOpenAutoFocus?: ((event: PopoverOpenAutoFocusEvent) => void) | undefined
  /** Cancel or replace focus restoration when closing a focused floating layer. */
  onCloseAutoFocus?: ((event: PopoverCloseAutoFocusEvent) => void) | undefined
  /** Include portalled descendants in focus-trigger dismissal and focus restoration. */
  isFocusWithin?: ((element: Element, content: HTMLElement) => boolean) | undefined
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
