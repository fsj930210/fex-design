import type { JSX, ParentProps } from 'solid-js'
import { Button } from '../../primitive/button'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '../../primitive/dialog'

export interface DialogProps extends ParentProps {
  open?: boolean
  defaultOpen?: boolean
  title?: JSX.Element
  header?: JSX.Element
  footer?: JSX.Element
  closable?: boolean
  closeOnOverlayClick?: boolean
  fullscreen?: boolean | { mode?: 'viewport' | 'screen' }
  classNames?: Record<string, string>
  styles?: Record<string, JSX.CSSProperties>
  okText?: JSX.Element
  cancelText?: JSX.Element
  onOpenChange?: (open: boolean, info: unknown) => void
}

export function Dialog(props: DialogProps) {
  return (
    <DialogRoot open={props.open} defaultOpen={props.defaultOpen} fullscreen={props.fullscreen} closeOnOverlayClick={props.closeOnOverlayClick ?? false} onOpenChange={props.onOpenChange}>
      <DialogPortal>
        <DialogOverlay class={props.classNames?.overlay} style={props.styles?.overlay} />
        <DialogContent class={props.classNames?.content} style={props.styles?.content}>
          <DialogHeader class={props.classNames?.header} style={props.styles?.header}>
            <DialogTitle class={props.classNames?.title} style={props.styles?.title}>{props.title}</DialogTitle>
            {props.header}
            {props.fullscreen && <DialogFullscreenToggle />}
            {props.closable !== false && <DialogClose class={props.classNames?.close} style={props.styles?.close} />}
          </DialogHeader>
          <DialogBody class={props.classNames?.body} style={props.styles?.body}>{props.children}</DialogBody>
          {props.footer !== null && <DialogFooter class={props.classNames?.footer} style={props.styles?.footer}>{props.footer ?? <><DialogClose>{props.cancelText ?? '取消'}</DialogClose><Button variant="solid" color="primary">{props.okText ?? '确定'}</Button></>}</DialogFooter>}
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}

export { DialogRoot, DialogTrigger } from '../../primitive/dialog'
