import { alert, confirm, destroyAll } from './static'
import type { JSX, ParentProps, ComponentProps } from 'solid-js'
import { Button } from '../button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogFullscreenToggle,
} from '../../primitive/dialog'

export interface DialogProps extends ParentProps {
  open?: boolean
  modal?: boolean
  defaultOpen?: boolean
  forceMount?: boolean
  closeDelay?: number
  closeOnEscape?: boolean
  title?: JSX.Element
  actions?: JSX.Element
  header?: JSX.Element
  footer?: JSX.Element
  closable?:
    | boolean
    | {
        icon?: JSX.Element
        disabled?: boolean
        onClose?: JSX.EventHandler<HTMLButtonElement, MouseEvent>
      }
  overlay?: boolean
  closeOnOverlayClick?: boolean
  fullscreen?: boolean | { mode?: 'viewport' | 'screen' }
  classNames?: Record<string, string>
  styles?: Record<string, JSX.CSSProperties>
  okBtnProps?: ComponentProps<typeof Button>
  cancelBtnProps?: ComponentProps<typeof Button>
  onOpenChange?: (open: boolean, info: unknown) => void
}

export function Dialog(props: DialogProps) {
  return (
    <DialogRoot
      modal={props.modal}
      forceMount={props.forceMount}
      closeDelay={props.closeDelay}
      closeOnEscape={props.closeOnEscape}
      open={props.open}
      defaultOpen={props.defaultOpen}
      fullscreen={props.fullscreen}
      closeOnOverlayClick={props.closeOnOverlayClick ?? true}
      onOpenChange={props.onOpenChange}
    >
      <DialogPortal>
        {props.overlay !== false && (
          <DialogOverlay class={props.classNames?.overlay} style={props.styles?.overlay} />
        )}
        <DialogContent class={props.classNames?.content} style={props.styles?.content}>
          <DialogHeader class={props.classNames?.header} style={props.styles?.header}>
            <DialogTitle class={props.classNames?.title} style={props.styles?.title}>
              {props.title}
            </DialogTitle>
            {props.header}
          </DialogHeader>
          <DialogActions>
            {props.actions}
            {props.fullscreen && <DialogFullscreenToggle />}
            {props.closable !== false &&
              !(typeof props.closable === 'object' && props.closable.icon === null) && (
                <DialogClose
                  icon={typeof props.closable === 'object' ? props.closable.icon : undefined}
                  disabled={
                    typeof props.closable === 'object' ? props.closable.disabled : undefined
                  }
                  onClick={typeof props.closable === 'object' ? props.closable.onClose : undefined}
                  class={props.classNames?.close}
                  style={props.styles?.close}
                />
              )}
          </DialogActions>
          <DialogBody class={props.classNames?.body} style={props.styles?.body}>
            {props.children}
          </DialogBody>
          {props.footer !== null && (
            <DialogFooter class={props.classNames?.footer} style={props.styles?.footer}>
              {props.footer ?? (
                <>
                  <DialogClose>
                    {(closeProps) => (
                      <Button
                        {...closeProps}
                        {...props.cancelBtnProps}
                        onClick={closeProps.onClick}
                      >
                        {props.cancelBtnProps?.children ?? '取消'}
                      </Button>
                    )}
                  </DialogClose>
                  <Button variant="solid" color="primary" {...props.okBtnProps}>
                    {props.okBtnProps?.children ?? '确定'}
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

export { DialogRoot, DialogTrigger } from '../../primitive/dialog'

Dialog.alert = alert
Dialog.confirm = confirm
Dialog.destroyAll = destroyAll
export { alert, confirm, destroyAll }
export type { DialogStaticOptions } from './static'
export type { DialogRequestHandle } from './static'
