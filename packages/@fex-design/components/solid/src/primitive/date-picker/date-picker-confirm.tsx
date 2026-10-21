import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'

import { datePickerConfirmClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps } from 'solid-js'
import { Button, type ButtonProps } from '../button'

import { useFooterOwner } from './date-picker-footer-owner'

export function DatePickerConfirm(props: ButtonProps) {
  const picker = useFooterOwner()
  const [local, rest] = splitProps(props, ['class', 'onClick', 'children'])
  return (
    <Button
      {...rest}
      type="button"
      variant={rest.variant ?? 'solid'}
      color={rest.color ?? 'primary'}
      disabled={!picker.canConfirm() || rest.disabled}
      data-slot="date-picker-confirm"
      class={cn(datePickerConfirmClassName, local.class)}
      onClick={(event) => {
        callEventHandler(local.onClick, event)
        if (!isPickerActionBlocked(event)) picker.confirm()
      }}
    >
      {local.children === undefined ? '确定' : local.children}
    </Button>
  )
}

export type DatePickerConfirmProps = ButtonProps
