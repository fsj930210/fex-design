import { useId, useRef, useState, type ReactNode } from 'react'
import {
  createDialogController,
  type DialogOptions,
} from '@fex-design/core/dialog/create-dialog-controller'
import { shallowEqualObject } from '@fex-design/utils'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import useUnmount from '@fex-design/react/hooks/use-unmount'
import { DialogContext } from './dialog-context'

export interface DialogRootProps extends DialogOptions {
  children?: ReactNode
}

export function DialogRoot({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  modal = true,
  closeDelay = 200,
  ...options
}: DialogRootProps) {
  const isControlled = openProp !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false)
  const [fullscreenActive, setFullscreenActive] = useState(false)
  const open = isControlled ? openProp : uncontrolledOpen
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const handleOpenChange = useMemoizedFn<NonNullable<DialogOptions['onOpenChange']>>(
    (nextOpen, info) => {
      if (!nextOpen) setFullscreenActive(false)
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen, info)
    },
  )
  const dialogOptions: DialogOptions = {
    ...options,
    open,
    onOpenChange: handleOpenChange,
    modal,
    closeDelay,
  }
  const dialogRef = useRef<ReturnType<typeof createDialogController> | null>(null)
  if (!dialogRef.current) {
    dialogRef.current = createDialogController(dialogOptions)
  }
  const latestOptionsRef = useRef(dialogOptions)
  const dialog = dialogRef.current

  useIsomorphicLayoutEffect(() => {
    if (!shallowEqualObject(latestOptionsRef.current, dialogOptions)) {
      latestOptionsRef.current = dialogOptions
      dialog.setOptions(dialogOptions)
    }
  })

  useUnmount(() => {
    dialogRef.current?.destroy()
    dialogRef.current = null
  })

  return (
    <DialogContext
      value={{
        contentId: useId(),
        dialog,
        modal,
        fullscreen: dialogOptions.fullscreen,
        fullscreenActive,
        setFullscreenActive,
        onFullscreenChange: dialogOptions.onFullscreenChange,
        titleId: useId(),
        triggerRef,
      }}
    >
      {children}
    </DialogContext>
  )
}
