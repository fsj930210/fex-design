import { dialogCloseClassName, dialogIconCloseClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import type { ComponentProps, MouseEvent, ReactNode, Ref } from 'react'
import { useDialog } from './use-dialog'
import { Button } from '../button'
import { XIcon } from '../../icons/x'

export type DialogCloseRenderProps = Omit<ComponentProps<'button'>, 'children' | 'ref'> & {
  ref?: Ref<HTMLButtonElement>
}

export interface DialogCloseProps extends Omit<ComponentProps<'button'>, 'children'> {
  icon?: ReactNode
  children?: ((props: DialogCloseRenderProps) => ReactNode) | ReactNode
  ref?: Ref<HTMLButtonElement>
}

export function DialogClose({
  children,
  icon,
  className,
  onClick,
  type = 'button',
  ...props
}: DialogCloseProps) {
  const { dialog } = useDialog('DialogClose')
  const closeProps = {
    ...props,
    type,
    'data-slot': 'dialog-close',
    className: cn(!children && !icon ? dialogIconCloseClassName : dialogCloseClassName, className),
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (!event.defaultPrevented) {
        dialog.close({ reason: 'manual', source: 'close-button', event: event.nativeEvent })
      }
    },
  }

  return typeof children === 'function' ? (
    children(closeProps)
  ) : (
    <Button {...closeProps}>{children ?? icon ?? <XIcon aria-hidden="true" />}</Button>
  )
}

