import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { cn } from '@fex-design/utils'

import { datePickerCancelClassName } from '@fex-design/components-styles/date-picker'
import { type ComponentProps } from 'react'

import { Button } from '@fex-design/react/primitive/button'
import { useFooterOwner } from './date-picker-footer-owner'

export interface DatePickerCancelProps extends ComponentProps<'button'> {}

export function DatePickerCancel({
  className,
  children = '取消',
  onClick,
  ...props
}: DatePickerCancelProps) {
  const context = useFooterOwner()
  return (
    <Button
      {...props}
      type="button"
      data-slot="date-picker-cancel"
      className={cn(datePickerCancelClassName, className)}
      onClick={(event) => {
        onClick?.(event)
        if (!isPickerActionBlocked(event)) context.cancel()
      }}
    >
      {children}
    </Button>
  )
}
