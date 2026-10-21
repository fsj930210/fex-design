import type { CalendarValue } from '@fex-design/core/calendar'
import type { JSX } from 'solid-js'
import type { PickerAppearance } from '../../primitive/date-picker/appearance.types'
import type {
  UseRangePickerOptions,
  RangePickerRootProps,
  RangePickerTriggerProps,
  RangePickerContextValue,
  DatePickerFooterProps,
} from '@fex-design/solid/primitive/date-picker'
export type RangePickerProps<TValue extends CalendarValue = CalendarValue> =
  UseRangePickerOptions<TValue> &
    PickerAppearance &
    Pick<
      RangePickerTriggerProps,
      | 'startPlaceholder'
      | 'endPlaceholder'
      | 'separator'
      | 'suffix'
      | 'size'
      | 'variant'
      | 'class'
      | 'style'
      | 'ref'
    > & {
      triggerRender?: RangePickerTriggerProps['children'] | undefined
      panelRender?:
        | ((panel: JSX.Element, state: RangePickerContextValue) => JSX.Element)
        | undefined
      containerRender?: RangePickerRootProps<TValue>['containerRender'] | undefined
      footer?: DatePickerFooterProps['children'] | undefined
    }
