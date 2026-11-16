import type { DialogController, DialogOptions, DialogSnapshot } from '@fex-design/core/dialog/types'
import { inject, type InjectionKey, type ShallowRef, type Ref } from 'vue'

export interface DialogContextValue {
  contentId: string
  dialog: DialogController
  modal: boolean
  fullscreen: DialogOptions['fullscreen']
  fullscreenActive: Ref<boolean>
  onFullscreenChange?: DialogOptions['onFullscreenChange']
  snapshot: ShallowRef<DialogSnapshot>
  titleId: string
  triggerElement: ShallowRef<HTMLButtonElement | null>
}

export const dialogKey: InjectionKey<DialogContextValue> = Symbol('Dialog')

export function useDialogContext(component: string) {
  const context = inject(dialogKey)
  if (!context) {
    throw new Error(`${component} must be used inside Dialog`)
  }
  return context
}

export type DialogRootProps = DialogOptions

