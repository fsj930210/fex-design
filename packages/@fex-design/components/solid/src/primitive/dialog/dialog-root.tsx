import {
  createDialogController,
  type DialogOptions,
} from "@fex-design/core/dialog/create-dialog-controller"
import { createSignal, onCleanup, splitProps, type ParentProps } from "solid-js"
import { createCoreStoreSignal } from "@fex-design/solid/primitives/create-core-store-signal"
import { DialogContext } from "./dialog-context"

let nextDialogId = 1

export interface DialogProps extends ParentProps, DialogOptions {}
export type DialogRootProps = DialogProps

export function Dialog(props: DialogProps) {
  const [local] = splitProps(props, [
    "children",
    "open",
    "defaultOpen",
    "onOpenChange",
    "modal",
    "forceMount",
    "closeDelay",
    "dismiss",
    "closeOnOverlayPointer",
  ])
  const [open, setOpen] = createSignal(local.open ?? local.defaultOpen ?? false)
  const triggerElement = { current: null as HTMLButtonElement | null }
  const dialogId = nextDialogId++

  function makeOptions(openValue: boolean): DialogOptions {
    return {
      open: openValue,
      modal: local.modal ?? true,
      forceMount: local.forceMount,
      closeDelay: local.closeDelay ?? 140,
      dismiss: local.dismiss,
      closeOnOverlayPointer: local.closeOnOverlayPointer,
      onOpenChange(nextOpen, info) {
        if (local.open === undefined) {
          setOpen(nextOpen)
          dialog.setOptions(makeOptions(nextOpen))
        }
        local.onOpenChange?.(nextOpen, info)
      },
    }
  }

  function syncOptions() {
    dialog.setOptions(makeOptions(local.open ?? open()))
    return null
  }

  const dialog = createDialogController(makeOptions(open()))
  const snapshot = createCoreStoreSignal(dialog)

  onCleanup(() => dialog.destroy())

  return (
    <>
      {syncOptions()}
      <DialogContext.Provider
        value={{
          contentId: `dialog-content-${dialogId}`,
          descriptionId: `dialog-description-${dialogId}`,
          dialog,
          snapshot,
          titleId: `dialog-title-${dialogId}`,
          triggerElement,
        }}
      >
        {local.children}
      </DialogContext.Provider>
    </>
  )
}

export { Dialog as DialogRoot }
