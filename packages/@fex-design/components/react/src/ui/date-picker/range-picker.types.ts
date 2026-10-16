import type { CalendarValue } from '@fex-design/core/calendar'
import type { ReactNode } from 'react'
import type { PickerAppearance } from '../../primitive/date-picker/appearance.types'
import type { UseRangePickerOptions, RangePickerRootProps, RangePickerTriggerProps, RangePickerContextValue, DatePickerFooterProps } from '@fex-design/react/primitive/date-picker'
export type RangePickerProps<TValue extends CalendarValue = CalendarValue> = UseRangePickerOptions<TValue> & PickerAppearance & Pick<RangePickerTriggerProps, 'startPlaceholder' | 'endPlaceholder' | 'separator' | 'suffix' | 'size' | 'variant' | 'className' | 'style' | 'ref'> & {
  triggerRender?: RangePickerTriggerProps['children'] | undefined
  panelRender?: ((panel: ReactNode, state: RangePickerContextValue) => ReactNode) | undefined
  containerRender?: RangePickerRootProps<TValue>['containerRender'] | undefined
  footer?: DatePickerFooterProps['children'] | undefined
}
