import {
  createDialogController,
  type DialogOptions,
} from '@fex-design/core/dialog/create-dialog-controller'
import { createSignal, onCleanup, splitProps, type ParentProps } from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { DialogContext } from './dialog-context'

let nextDialogId = 1

export interface DialogRootProps extends ParentProps, DialogOptions {}

export function DialogRoot(props: DialogRootProps) {
  const [local] = splitProps(props, [
    'children',
    'open',
    'defaultOpen',
    'onOpenChange',
    'modal',
    'forceMount',
    'closeDelay',
    'closeOnEscape',
    'closeOnOverlayClick',
    'fullscreen',
    'onFullscreenChange',
  ])
  const [open, setOpen] = createSignal(local.open ?? local.defaultOpen ?? false)
  const [fullscreenActive, setFullscreenActive] = createSignal(false)
  const triggerElement = { current: null as HTMLButtonElement | null }
  const dialogId = nextDialogId++

  function makeOptions(openValue: boolean): DialogOptions {
    return {
      open: openValue,
      modal: local.modal ?? true,
      forceMount: local.forceMount,
      closeDelay: local.closeDelay ?? 200,
      closeOnEscape: local.closeOnEscape,
      closeOnOverlayClick: local.closeOnOverlayClick,
      fullscreen: local.fullscreen,
      onFullscreenChange: local.onFullscreenChange,
      onOpenChange(nextOpen, info) {
        if (!nextOpen) setFullscreenActive(false)
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
          dialog,
          modal: local.modal ?? true,
          fullscreen: () => local.fullscreen,
          fullscreenActive,
          setFullscreenActive,
          onFullscreenChange: local.onFullscreenChange,
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
