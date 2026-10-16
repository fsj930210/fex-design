import type { CalendarLocale } from '../calendar/types'
import type { InputSize, InputVariant } from '../input/types'

export type DatePickerSemanticPart = 'separator' | 'panelGroup' | 'tags' | 'tag' | 'tagRemove' | 'tagOverflow' | 'footer' | 'today' | 'cancel' | 'confirm'
export type DatePickerClassNames = Partial<Record<DatePickerSemanticPart, string | undefined>>
export type DatePickerStyles<TStyle> = Partial<Record<DatePickerSemanticPart, TStyle | undefined>>
export type DatePickerInputPart = 'root' | 'control' | 'prefix' | 'suffix' | 'clear'
export type DatePickerCalendarPart = 'header' | 'weekHeader' | 'grid' | 'row' | 'cell' | 'cellTrigger' | 'cellContent'
export interface DatePickerInputOptions<TStyle, TAdornment> {
  size?: InputSize | undefined
  variant?: InputVariant | undefined
  placeholder?: string | undefined
  prefix?: TAdornment | undefined
  suffix?: TAdornment | undefined
  classNames?: Partial<Record<DatePickerInputPart, string | undefined>> | undefined
  styles?: Partial<Record<DatePickerInputPart, TStyle | undefined>> | undefined
}
export interface DatePickerCalendarOptions<TStyle, TCellRender> {
  locale?: Partial<Omit<CalendarLocale, 'weekStartsOn' | 'firstWeekContainsDate'>> | undefined
  classNames?: Partial<Record<DatePickerCalendarPart, string | undefined>> | undefined
  styles?: Partial<Record<DatePickerCalendarPart, TStyle | undefined>> | undefined
  cellRender?: TCellRender | undefined
}
export interface DatePickerPopoverAppearance<TStyle> {
  classNames?: { root?: string | undefined } | undefined
  styles?: { root?: TStyle | undefined } | undefined
}
export interface DatePickerAppearance<TInput, TEndpoint, TCalendar, TPopover, TStyle> {
  inputProps?: TInput | undefined
  startInputProps?: TEndpoint | undefined
  endInputProps?: TEndpoint | undefined
  calendarProps?: TCalendar | undefined
  popoverProps?: TPopover | undefined
  classNames?: DatePickerClassNames | undefined
  styles?: DatePickerStyles<TStyle> | undefined
}
