

import { datePickerPresetClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { splitProps } from 'solid-js'
import { Button, type ButtonProps } from '../button'

export function DatePickerPreset(props: ButtonProps) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <Button
      {...rest}
      type="button"
      data-slot="date-picker-preset"
      class={cn(datePickerPresetClassName, local.class)}
    />
  )
}

export type DatePickerPresetProps = ButtonProps
