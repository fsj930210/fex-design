import type { TimePickerProps } from './time-picker.types'
import type { TimeRangePickerFooter } from '../../primitive/time-picker'
import type { StyleValue } from 'vue'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import type { TimeRangePickerOptions } from '@fex-design/core/time-picker/range-types'
import type { TimePickerPopoverOptions } from '@fex-design/core/time-picker/types'
import type { TimePickerInputProps } from '../../primitive/time-picker'
export interface TimeRangePickerProps
  extends
    Omit<TimeRangePickerOptions, 'onChange' | 'onOpenChange'>,
    Pick<
      TimePickerProps,
      | 'contentProps'
      | 'panelProps'
      | 'hourColumnProps'
      | 'minuteColumnProps'
      | 'secondColumnProps'
      | 'periodColumnProps'
    > {
  footerProps?: InstanceType<typeof TimeRangePickerFooter>['$props'] | undefined
  class?: string
  style?: StyleValue
  dir?: 'ltr' | 'rtl' | 'auto'
  size?: InputSize
  variant?: InputVariant
  startInputProps?: TimePickerInputProps
  endInputProps?: TimePickerInputProps
  placeholder?: readonly [string, string]
  allowClear?: boolean
  popoverProps?: TimePickerPopoverOptions
  step?: { hour?: number; minute?: number; second?: number }
}
