import { PickerAppearanceContext } from './appearance-context'
import type { PickerAppearance } from './appearance.types'
import { use } from 'react'
import { PopoverContext } from '../popover/popover-context'
import { PickerOwnerContext } from './owner-context'
import { PickerContainerContext } from './container-context'
import { definedPickerOptions, getDatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
import type { CalendarValue } from '@fex-design/core/calendar'
import type { ReactNode } from 'react'
import { PopoverRoot, type PopoverRootProps } from '../popover'
import { DatePickerContext } from './context'
import { useDatePicker, type UseDatePickerOptions } from './use-date-picker'

export interface DatePickerRootProps<TValue extends CalendarValue = CalendarValue>
  extends
    Omit<PopoverRootProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'children' | 'trigger'>,
    UseDatePickerOptions<TValue>, Omit<PickerAppearance, 'startInputProps' | 'endInputProps'> {
  popoverProps?: PickerAppearance['popoverProps'] | undefined
  children?: ReactNode | undefined
  containerRender?: ((children: ReactNode, state: ReturnType<typeof useDatePicker<TValue>>) => ReactNode) | undefined
}

export function DatePickerRoot<TValue extends CalendarValue = CalendarValue>({
  children,
  containerRender,
  placement,
  sideOffset,
  popoverProps,
  inputProps, calendarProps, classNames, styles,
  picker,
  value,
  defaultValue,
  open,
  defaultOpen,
  multiple,
  maxCount,
  needConfirm,
  disabled,
  clearable,
  format,
  weekStartsOn,
  minDate,
  maxDate,
  disabledDate,
  onChange,
  onOpenChange,
  ...props
}: DatePickerRootProps<TValue>) {
  const parentPopover = use(PopoverContext)
  const datePicker = useDatePicker<TValue>(definedPickerOptions({
    picker, value, defaultValue, open, defaultOpen, multiple, maxCount, needConfirm, disabled, clearable, format, weekStartsOn, minDate, maxDate, disabledDate, onChange, onOpenChange,
  }))

  const content = containerRender ? containerRender(children, datePicker) : (
    <PopoverRoot {...getDatePickerPopoverOptions({ ...props, ...definedPickerOptions({ placement, sideOffset }), ...popoverProps })} open={datePicker.open} onOpenChange={datePicker.setOpen}>
      {children}
    </PopoverRoot>
  )
  return <PickerAppearanceContext value={{ inputProps, calendarProps, popoverProps, classNames, styles }}><PickerContainerContext value={{ parentPopover }}><PickerOwnerContext value={datePicker}><DatePickerContext value={datePicker as never}>{content}</DatePickerContext></PickerOwnerContext></PickerContainerContext></PickerAppearanceContext>
}
