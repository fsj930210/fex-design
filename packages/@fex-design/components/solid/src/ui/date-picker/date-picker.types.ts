import type { CalendarValue } from '@fex-design/core/calendar'
import type { JSX } from 'solid-js'
import type { PickerAppearance } from '../../primitive/date-picker/appearance.types'
import type { UseDatePickerOptions, DatePickerRootProps, DatePickerTriggerProps, DatePickerContextValue, DatePickerFooterProps } from '@fex-design/solid/primitive/date-picker'
export type DatePickerProps<TValue extends CalendarValue = CalendarValue> = UseDatePickerOptions<TValue> & Omit<PickerAppearance, 'startInputProps' | 'endInputProps'> & Pick<DatePickerTriggerProps, 'placeholder' | 'prefix' | 'suffix' | 'size' | 'variant' | 'class' | 'style' | 'ref'> & {
  triggerRender?: DatePickerTriggerProps['children'] | undefined
  panelRender?: ((panel: JSX.Element, state: DatePickerContextValue) => JSX.Element) | undefined
  containerRender?: DatePickerRootProps<TValue>['containerRender'] | undefined
  footer?: DatePickerFooterProps['children'] | undefined
}
