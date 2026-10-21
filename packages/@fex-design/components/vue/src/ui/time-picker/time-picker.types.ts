import type { StyleValue } from 'vue'
import type { TimePickerClassNames, TimePickerStyles } from '@fex-design/core/time-picker/types'
import type {
  TimePickerInputProps,
  TimePickerPanel,
  TimePickerContent,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
} from '../../primitive/time-picker'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import type {
  TimePickerControllerOptions,
  TimePickerPopoverOptions,
} from '@fex-design/core/time-picker/types'

export interface TimePickerProps extends Omit<TimePickerControllerOptions, 'onChange'> {
  hourColumnProps?:
    | Omit<InstanceType<typeof TimePickerHourColumn>['$props'], 'children'>
    | undefined
  minuteColumnProps?:
    | Omit<InstanceType<typeof TimePickerMinuteColumn>['$props'], 'children'>
    | undefined
  secondColumnProps?:
    | Omit<InstanceType<typeof TimePickerSecondColumn>['$props'], 'children'>
    | undefined
  periodColumnProps?:
    | Omit<InstanceType<typeof TimePickerPeriodColumn>['$props'], 'children'>
    | undefined
  panelProps?: Omit<InstanceType<typeof TimePickerPanel>['$props'], 'children'> | undefined
  contentProps?: Omit<InstanceType<typeof TimePickerContent>['$props'], 'children'> | undefined
  classNames?: TimePickerClassNames
  styles?: TimePickerStyles<StyleValue>
  popoverProps?: TimePickerPopoverOptions | undefined
  inputProps?: TimePickerInputProps | undefined
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  allowClear?: boolean | undefined
  placeholder?: string | undefined
  invalid?: boolean | undefined
  size?: InputSize | undefined
  variant?: InputVariant | undefined
  step?:
    | { hour?: number | undefined; minute?: number | undefined; second?: number | undefined }
    | undefined
}
