import type { CSSProperties, ReactNode } from 'react'
import { Button } from '../../primitive/button'
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFullscreenToggle,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../../primitive/dialog'
import type { DialogRootProps } from '../../primitive/dialog'

export interface DialogClassNames {
  root?: string
  overlay?: string
  content?: string
  header?: string
  title?: string
  body?: string
  footer?: string
  close?: string
}

export interface DialogStyles {
  root?: CSSProperties
  overlay?: CSSProperties
  content?: CSSProperties
  header?: CSSProperties
  title?: CSSProperties
  body?: CSSProperties
  footer?: CSSProperties
  close?: CSSProperties
}

export interface DialogProps extends Omit<DialogRootProps, 'children'> {
  title?: ReactNode
  header?: ReactNode
  children?: ReactNode
  footer?: ReactNode | null
  closable?: boolean
  fullscreen?: DialogRootProps['fullscreen']
  classNames?: DialogClassNames
  styles?: DialogStyles
  okText?: ReactNode
  cancelText?: ReactNode
  onOk?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

export function Dialog({
  title,
  header,
  children,
  footer,
  closable = true,
  closeOnOverlayClick = false,
  fullscreen,
  classNames,
  styles,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  ...rootProps
}: DialogProps) {
  return (
    <DialogRoot {...rootProps} fullscreen={fullscreen} closeOnOverlayClick={closeOnOverlayClick}>
      <DialogPortal>
        <DialogOverlay className={classNames?.overlay} style={styles?.overlay} />
        <DialogContent className={classNames?.content} style={styles?.content}>
          <DialogHeader className={classNames?.header} style={styles?.header}>
            <DialogTitle className={classNames?.title} style={styles?.title}>{title}</DialogTitle>
            {header}
            {fullscreen && <DialogFullscreenToggle />}
            {closable && <DialogClose className={classNames?.close} style={styles?.close} />}
          </DialogHeader>
          <DialogBody className={classNames?.body} style={styles?.body}>{children}</DialogBody>
          {footer === null ? null : (
            <DialogFooter className={classNames?.footer} style={styles?.footer}>
              {footer ?? <><DialogClose onClick={onCancel}>{cancelText}</DialogClose><Button variant="solid" color="primary" onClick={onOk}>{okText}</Button></>}
            </DialogFooter>
          )}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}

export { DialogRoot, DialogTrigger }
