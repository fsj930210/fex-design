import { createContext, use } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { DialogController } from '@fex-design/core/dialog/create-dialog-controller'
import type { RefObject } from 'react'

export interface DialogContextValue {
  contentId: string
  dialog: DialogController
  modal: boolean
  fullscreen: boolean | { mode?: 'viewport' | 'screen' } | undefined
  fullscreenActive: boolean
  setFullscreenActive: Dispatch<SetStateAction<boolean>>
  onFullscreenChange?: (fullscreen: boolean) => void
  titleId: string
  triggerRef: RefObject<HTMLButtonElement | null>
}

export const DialogContext = createContext<DialogContextValue | null>(null)

export function useDialogContext(component: string) {
  const context = use(DialogContext)
  if (!context) throw new Error(`${component} must be used inside DialogRoot`)
  return context
}

