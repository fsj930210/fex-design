import type { DisclosureChangeInfo } from '../disclosure/create-disclosure'
import type { Overlay, OverlayOptions, OverlaySnapshot } from '../overlay/types'

export type DialogChangeInfo = DisclosureChangeInfo

export type DialogFullscreen =
  | boolean
  | {
      mode?: 'viewport' | 'screen'
      width?: number | string
      height?: number | string
    }

export interface DialogOptions extends Omit<
  OverlayOptions,
  'trigger' | 'allowedTriggers' | 'hoverOpenDelay' | 'hoverCloseDelay' | 'dismiss'
> {
  fullscreen?: DialogFullscreen | undefined
  onFullscreenChange?: ((fullscreen: boolean) => void) | undefined
  closeOnEscape?: boolean | undefined
  closeOnOverlayClick?: boolean | undefined
}

export type DialogSnapshot = OverlaySnapshot

export interface DialogController extends Overlay {
  setOptions: (options: DialogOptions) => void
}
