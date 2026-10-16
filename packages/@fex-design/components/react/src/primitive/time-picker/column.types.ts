import type { TimePeriod } from '@fex-design/core/time-picker/types'
import type { ComponentProps } from 'react'
import type { TimePickerColumn } from './time-picker-column'

type BaseColumnProps = Omit<
  ComponentProps<typeof TimePickerColumn<number>>,
  'options' | 'selectedValue' | 'onSelect'
>

export interface TimePickerNumericColumnProps extends BaseColumnProps {
  step?: number | undefined
  isItemDisabled?: ((value: number) => boolean) | undefined
}


export interface TimePickerPeriodColumnProps extends Omit<
  ComponentProps<typeof TimePickerColumn<TimePeriod>>,
  'options' | 'selectedValue' | 'onSelect'
> {
  labels?: { am: string; pm: string } | undefined
  isItemDisabled?: ((value: TimePeriod) => boolean) | undefined
}

