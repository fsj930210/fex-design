import { createOverlay } from '../overlay/create-overlay'
import type { DialogController, DialogOptions } from './types'

export type { DialogChangeInfo, DialogController, DialogFullscreen, DialogOptions, DialogSnapshot } from './types'

function toOverlayOptions(options: DialogOptions) {
  return {
    ...options,
    modal: options.modal ?? true,
    dismiss: {
      escapeKey: options.closeOnEscape ?? true,
      outsidePointer: false,
      overlayPointer: options.closeOnOverlayClick ?? false,
    },
  }
}

export function createDialogController(options: DialogOptions = {}): DialogController {
  // Dialog reuses the shared overlay controller so open state, presence phase,
  // and top-layer dismissal stay identical across all framework adapters.
  const overlay = createOverlay(toOverlayOptions(options))

  return {
    ...overlay,
    setOptions(nextOptions) {
      overlay.setOptions(toOverlayOptions(nextOptions))
    },
  }
}
