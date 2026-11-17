import {
  dialogCloseClassName,
  dialogIconCloseClassName,
} from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useDialog } from './dialog-context'
import { Button } from '../button'
import { XIcon } from '../../icons/x'

export type DialogCloseRenderProps = {
  class: string
  onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
  type: 'button'
  'data-slot': 'dialog-close'
}

export interface DialogCloseProps {
  disabled?: boolean
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>
  icon?: JSX.Element
  children?: JSX.Element | ((props: DialogCloseRenderProps) => JSX.Element)
  class?: string
}

export function DialogClose(props: DialogCloseProps) {
  const [local, rest] = splitProps(props, ['children', 'class', 'icon', 'onClick'])
  const { dialog } = useDialog('DialogClose')
  const closeProps = {
    ...rest,
    type: 'button' as const,
    'data-slot': 'dialog-close' as const,
    class: cn(
      local.children || local.icon ? dialogCloseClassName : dialogIconCloseClassName,
      local.class,
    ),
    onClick: (event: MouseEvent) => {
      local.onClick?.(event as Parameters<NonNullable<typeof local.onClick>>[0])
      if (!event.defaultPrevented) dialog.close({ reason: 'manual', source: 'close-button', event })
    },
  }

  return typeof local.children === 'function' ? (
    local.children(closeProps)
  ) : (
    <Button {...closeProps}>{local.children ?? local.icon ?? <XIcon aria-hidden="true" />}</Button>
  )
}
