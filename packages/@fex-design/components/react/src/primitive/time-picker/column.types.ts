import type { TimePeriod } from '@fex-design/core/time-picker/types'
import type { ComponentProps } from 'react'
import type { TimePickerColumn } from './time-picker-column'

type BaseColumnProps = Omit<
  ComponentProps<typeof TimePickerColumn<number>>,
  'options' | 'selectedValue' | 'onSelect'
>

export interface TimePickerNumericColumnProps extends BaseColumnProps {
  columnProps?: Omit<BaseColumnProps, 'children'> | undefined
  step?: number | undefined
  isItemDisabled?: ((value: number) => boolean) | undefined
}

export interface TimePickerPeriodColumnProps extends Omit<
  ComponentProps<typeof TimePickerColumn<TimePeriod>>,
  'options' | 'selectedValue' | 'onSelect'
> {
  columnProps?:
    | Omit<
        ComponentProps<typeof TimePickerColumn<TimePeriod>>,
        'children' | 'options' | 'selectedValue' | 'onSelect'
      >
    | undefined
  labels?: { am: string; pm: string } | undefined
  isItemDisabled?: ((value: TimePeriod) => boolean) | undefined
}
