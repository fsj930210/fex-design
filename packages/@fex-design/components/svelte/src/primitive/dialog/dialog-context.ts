import type {
  DialogController,
  DialogFullscreen,
  DialogSnapshot,
} from '@fex-design/core/dialog/types'
import type { Readable } from 'svelte/store'

export const dialogContextKey = Symbol('Dialog')

export interface DialogContext {
  contentId: string
  dialog: DialogController
  modal: boolean
  fullscreen: { value: DialogFullscreen | undefined }
  fullscreenActive: { value: boolean }
  onFullscreenChange?: (fullscreen: boolean) => void
  snapshot: Readable<DialogSnapshot>
  titleId: string
  triggerElement: { current: HTMLButtonElement | null }
}
