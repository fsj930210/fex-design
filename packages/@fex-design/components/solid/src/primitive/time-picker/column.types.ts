import type { TimePeriod } from '@fex-design/core/time-picker/types'
import type { TimePickerColumnProps } from './time-picker-column'

type NumericColumnProps = Omit<
  TimePickerColumnProps<number>,
  'options' | 'selectedValue' | 'onSelect'
>
type PeriodColumnProps = Omit<
  TimePickerColumnProps<TimePeriod>,
  'options' | 'selectedValue' | 'onSelect'
>

export interface TimePickerNumericColumnProps extends NumericColumnProps {
  columnProps?: Omit<NumericColumnProps, 'children'> | undefined
  step?: number | undefined
  isItemDisabled?: ((value: number) => boolean) | undefined
}

export interface TimePickerPeriodColumnProps extends PeriodColumnProps {
  columnProps?: Omit<PeriodColumnProps, 'children'> | undefined
  labels?: { am: string; pm: string } | undefined
  isItemDisabled?: ((value: TimePeriod) => boolean) | undefined
}
