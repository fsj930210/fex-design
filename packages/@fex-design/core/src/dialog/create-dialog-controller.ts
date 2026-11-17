import { createOverlay } from '../overlay/create-overlay'
import type { DialogController, DialogOptions } from './types'
export {
  createDialogRequest,
  destroyAllDialogRequests,
  type DialogRequestOptions,
  type DialogRequestHandle,
} from './create-dialog-request'

export type {
  DialogChangeInfo,
  DialogController,
  DialogFullscreen,
  DialogOptions,
  DialogSnapshot,
} from './types'

function toOverlayOptions(options: DialogOptions) {
  return {
    ...options,
    modal: options.modal ?? true,
    closeDelay: options.closeDelay ?? 200,
  }
}

export function createDialogController(options: DialogOptions = {}): DialogController {
  let currentOptions = options
  // Dialog reuses the shared overlay controller so open state, presence phase,
  // and top-layer dismissal stay identical across all framework adapters.
  const overlay = createOverlay(toOverlayOptions(options))

  return {
    ...overlay,
    close(info) {
      if (info?.reason === 'overlay-pointer' && currentOptions.closeOnOverlayClick === false) return
      if (info?.reason === 'escape-key' && currentOptions.closeOnEscape === false) return
      overlay.close(info)
    },
    setOptions(nextOptions) {
      currentOptions = nextOptions
      overlay.setOptions(toOverlayOptions(nextOptions))
    },
  }
}
