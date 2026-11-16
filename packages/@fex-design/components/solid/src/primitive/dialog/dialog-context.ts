import { createContext, useContext, type Accessor } from 'solid-js'
import type { createDialogController } from '@fex-design/core/dialog/create-dialog-controller'
import type { DialogFullscreen } from '@fex-design/core/dialog/types'
export interface DialogContextValue {
  contentId: string
  dialog: ReturnType<typeof createDialogController>
  modal: boolean
  fullscreen: DialogFullscreen | undefined
  fullscreenActive: Accessor<boolean>
  setFullscreenActive: (value: boolean) => void
  onFullscreenChange?: (fullscreen: boolean) => void
  snapshot: Accessor<ReturnType<ReturnType<typeof createDialogController>['getSnapshot']>>
  titleId: string
  triggerElement: { current: HTMLButtonElement | null }
}
export const DialogContext = createContext<DialogContextValue>()
export function useDialog(component: string) {
  const context = useContext(DialogContext)
  if (!context) throw new Error(`${component} must be used inside Dialog`)
  return context
}

