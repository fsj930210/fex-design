import type { CalendarValue } from '@fex-design/core/calendar'
import type { ReactNode } from 'react'
import type { PickerAppearance } from '../../primitive/date-picker/appearance.types'
import type {
  UseDatePickerOptions,
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerContextValue,
  DatePickerFooterProps,
} from '@fex-design/react/primitive/date-picker'
export type DatePickerProps<TValue extends CalendarValue = CalendarValue> =
  UseDatePickerOptions<TValue> &
    Omit<PickerAppearance, 'startInputProps' | 'endInputProps'> &
    Pick<
      DatePickerTriggerProps,
      'placeholder' | 'prefix' | 'suffix' | 'size' | 'variant' | 'className' | 'style' | 'ref'
    > & {
      'aria-invalid'?: 'false' | 'true' | 'grammar' | 'spelling' | undefined
      'data-warning'?: string | undefined
      triggerRender?: DatePickerTriggerProps['children'] | undefined
      panelRender?: ((panel: ReactNode, state: DatePickerContextValue) => ReactNode) | undefined
      containerRender?: DatePickerRootProps<TValue>['containerRender'] | undefined
      footer?: DatePickerFooterProps['children'] | undefined
    }
