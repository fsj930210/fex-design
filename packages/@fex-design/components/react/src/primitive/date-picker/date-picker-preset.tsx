import { cn } from '@fex-design/utils'

import { datePickerPresetClassName } from '@fex-design/components-styles/date-picker'
import { type ComponentProps } from 'react'

import { Button } from '@fex-design/react/primitive/button'

export interface DatePickerPresetProps extends ComponentProps<'button'> {}

export function DatePickerPreset({
  className,
  children,
  onClick,
  ...props
}: DatePickerPresetProps) {
  return (
    <Button
      {...props}
      type="button"
      data-slot="date-picker-preset"
      className={cn(datePickerPresetClassName, className)}
      onClick={(event) => {
        onClick?.(event)
      }}
    >
      {children}
    </Button>
  )
}
