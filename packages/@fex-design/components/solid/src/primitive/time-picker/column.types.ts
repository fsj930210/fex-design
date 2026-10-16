import type { TimePeriod } from '@fex-design/core/time-picker/types'
import type { JSX } from 'solid-js'

export interface TimePickerNumericColumnProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  itemRender?: import('./time-picker-column').TimePickerColumnProps<number>['itemRender'] | undefined
  step?: number | undefined
  disabled?: boolean | undefined
  isItemDisabled?: ((value: number) => boolean) | undefined
}


export interface TimePickerPeriodColumnProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  disabled?: boolean | undefined
  itemRender?: import('./time-picker-column').TimePickerColumnProps<TimePeriod>['itemRender'] | undefined
  labels?: { am: string; pm: string } | undefined
  isItemDisabled?: ((value: TimePeriod) => boolean) | undefined
}

