import type { NativeAttributes } from '@fex-design/angular/directives/native-attributes'
import type { SelectRoot, SelectTrigger, SelectContent } from '../select'
import type { RadioGroup, RadioButton } from '../radio'

type NativeStyle = Pick<NativeAttributes, 'class' | 'style'>
export type CalendarHeaderSelectOptions = NativeStyle &
  Partial<
    Pick<
      SelectRoot,
      | 'showSearch'
      | 'filterOption'
      | 'open'
      | 'defaultOpen'
      | 'loading'
      | 'disabled'
      | 'popoverProps'
      | 'virtual'
      | 'maxCount'
    >
  >
export type CalendarHeaderTriggerOptions = NativeStyle & {
  inputProps?: ReturnType<SelectTrigger['inputProps']> | undefined
  valueProps?: ReturnType<SelectTrigger['valueProps']> | undefined
  placeholder?: string | undefined
  maxTagCount?: number | undefined
}
export type CalendarHeaderContentOptions = NativeStyle & {
  portalProps?: ReturnType<SelectContent['portalProps']>
  popoverContentProps?: ReturnType<SelectContent['popoverContentProps']>
  listProps?: ReturnType<SelectContent['listProps']>
  popupRender?: SelectContent['popupRender'] | undefined
}
export interface CalendarHeaderChildProps extends NativeStyle {
  yearSelectRootProps?: CalendarHeaderSelectOptions | undefined
  monthSelectRootProps?: CalendarHeaderSelectOptions | undefined
  yearSelectTriggerProps?: CalendarHeaderTriggerOptions | undefined
  monthSelectTriggerProps?: CalendarHeaderTriggerOptions | undefined
  yearSelectContentProps?: CalendarHeaderContentOptions | undefined
  monthSelectContentProps?: CalendarHeaderContentOptions | undefined
  previousButtonProps?: (NativeStyle & { disabled?: boolean | undefined }) | undefined
  nextButtonProps?: (NativeStyle & { disabled?: boolean | undefined }) | undefined
  todayButtonProps?: (NativeStyle & { disabled?: boolean | undefined }) | undefined
  modeGroupProps?:
    | (NativeStyle & {
        orientation?: ReturnType<RadioGroup['orientation']>
        disabled?: boolean | undefined
      })
    | undefined
  dateModeButtonProps?:
    | (NativeStyle & { size?: ReturnType<RadioButton['size']>; disabled?: boolean | undefined })
    | undefined
  monthModeButtonProps?:
    | (NativeStyle & { size?: ReturnType<RadioButton['size']>; disabled?: boolean | undefined })
    | undefined
}
