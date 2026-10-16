import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { cn } from '@fex-design/utils'

import { datePickerConfirmClassName } from '@fex-design/components-styles/date-picker'
import { type ComponentProps } from 'react'

import { Button } from '@fex-design/react/primitive/button'
import { useFooterOwner } from './date-picker-footer-owner'

export interface DatePickerConfirmProps extends ComponentProps<'button'> {}

export function DatePickerConfirm({
  className,
  children = '确定',
  onClick,
  ...props
}: DatePickerConfirmProps) {
  const context = useFooterOwner()
  return (
    <Button
      {...props}
      type="button"
      variant="solid"
      color="primary"
      disabled={!context.canConfirm || props.disabled}
      data-slot="date-picker-confirm"
      className={cn(datePickerConfirmClassName, className)}
      onClick={(event) => {
        onClick?.(event)
        if (!isPickerActionBlocked(event)) context.confirm()
      }}
    >
      {children}
    </Button>
  )
}
