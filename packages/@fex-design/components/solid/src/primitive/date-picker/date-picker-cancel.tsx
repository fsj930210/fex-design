import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'

import { datePickerCancelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps } from 'solid-js'
import { Button, type ButtonProps } from '../button'

import { useFooterOwner } from './date-picker-footer-owner'

export function DatePickerCancel(props: ButtonProps) {
  const picker = useFooterOwner()
  const [local, rest] = splitProps(props, ['class', 'onClick', 'children'])
  return (
    <Button
      {...rest}
      type="button"
      data-slot="date-picker-cancel"
      class={cn(datePickerCancelClassName, local.class)}
      onClick={(event) => {
        callEventHandler(local.onClick, event)
        if (!isPickerActionBlocked(event)) picker.cancel()
      }}
    >
      {local.children === undefined ? '取消' : local.children}
    </Button>
  )
}

export type DatePickerCancelProps = ButtonProps
