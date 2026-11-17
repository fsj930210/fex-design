import { alert, confirm, destroyAll } from './static'
import type { CSSProperties, ReactNode, MouseEvent, ComponentProps } from 'react'
import { Button } from '../button'
import { cn } from '@fex-design/utils'
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFullscreenToggle,
  DialogHeader,
  DialogActions,
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

export interface DialogClosableOptions {
  icon?: ReactNode
  disabled?: boolean
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

export interface DialogProps extends Omit<DialogRootProps, 'children'> {
  title?: ReactNode
  actions?: ReactNode
  header?: ReactNode
  children?: ReactNode
  footer?: ReactNode | null
  closable?: boolean | DialogClosableOptions
  overlay?: boolean
  fullscreen?: DialogRootProps['fullscreen']
  classNames?: DialogClassNames
  styles?: DialogStyles
  okBtnProps?: ComponentProps<typeof Button>
  cancelBtnProps?: ComponentProps<typeof Button>
  onOk?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

export function Dialog({
  title,
  header,
  actions,
  children,
  footer,
  closable = true,
  overlay = true,
  closeOnOverlayClick = true,
  fullscreen,
  classNames,
  styles,
  okBtnProps,
  cancelBtnProps,
  onOk,
  onCancel,
  ...rootProps
}: DialogProps) {
  return (
    <DialogRoot {...rootProps} fullscreen={fullscreen} closeOnOverlayClick={closeOnOverlayClick}>
      <DialogPortal>
        {overlay && <DialogOverlay className={classNames?.overlay} style={styles?.overlay} />}
        <DialogContent className={classNames?.content} style={styles?.content}>
          <DialogHeader className={classNames?.header} style={styles?.header}>
            <DialogTitle className={classNames?.title} style={styles?.title}>
              {title}
            </DialogTitle>
            {header}
          </DialogHeader>
          <DialogActions>
            {actions}
            {fullscreen && <DialogFullscreenToggle className="pointer-events-auto" />}
            {closable !== false && !(typeof closable === 'object' && closable.icon === null) && (
              <DialogClose
                icon={typeof closable === 'object' ? closable.icon : undefined}
                disabled={typeof closable === 'object' ? closable.disabled : undefined}
                onClick={typeof closable === 'object' ? closable.onClose : undefined}
                className={cn(classNames?.close, 'pointer-events-auto')}
                style={styles?.close}
              />
            )}
          </DialogActions>
          <DialogBody className={classNames?.body} style={styles?.body}>
            {children}
          </DialogBody>
          {footer === null ? null : (
            <DialogFooter className={classNames?.footer} style={styles?.footer}>
              {footer ?? (
                <>
                  <DialogClose>
                    {(closeProps) => (
                      <Button
                        {...closeProps}
                        {...cancelBtnProps}
                        onClick={(event) => {
                          cancelBtnProps?.onClick?.(event)
                          if (event.defaultPrevented) return
                          onCancel?.()
                          closeProps.onClick?.(event)
                        }}
                      >
                        {cancelBtnProps?.children ?? '取消'}
                      </Button>
                    )}
                  </DialogClose>
                  <Button variant="solid" color="primary" onClick={onOk} {...okBtnProps}>
                    {okBtnProps?.children ?? '确定'}
                  </Button>
                </>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}

export { DialogRoot, DialogTrigger }

Dialog.alert = alert
Dialog.confirm = confirm
Dialog.destroyAll = destroyAll
export { alert, confirm, destroyAll }
export type { DialogStaticOptions } from './static'
export type { DialogRequestHandle } from './static'
