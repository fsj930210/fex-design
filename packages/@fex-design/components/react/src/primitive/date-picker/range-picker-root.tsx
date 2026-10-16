import { PickerAppearanceContext } from './appearance-context'
import type { PickerAppearance } from './appearance.types'
import { use } from 'react'
import { PopoverContext } from '../popover/popover-context'
import { PickerOwnerContext } from './owner-context'
import { PickerContainerContext } from './container-context'
import { definedPickerOptions, getDatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
import type { CalendarValue } from '@fex-design/core/calendar'
import type { ReactNode } from 'react'
import { PopoverRoot, type PopoverRootProps } from '@fex-design/react/primitive/popover'
import { RangePickerContext } from './context'
import { useRangePicker, type UseRangePickerOptions } from './use-range-picker'

export interface RangePickerRootProps<TValue extends CalendarValue = CalendarValue>
  extends
    Omit<PopoverRootProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'children' | 'trigger'>,
    UseRangePickerOptions<TValue>, PickerAppearance {
  popoverProps?: PickerAppearance['popoverProps'] | undefined
  children?: ReactNode | undefined
  containerRender?: ((children: ReactNode, state: ReturnType<typeof useRangePicker<TValue>>) => ReactNode) | undefined
}

export function RangePickerRoot<TValue extends CalendarValue = CalendarValue>({
  children,
  containerRender,
  placement,
  sideOffset,
  popoverProps,
  inputProps, startInputProps, endInputProps, calendarProps, classNames, styles,
  picker,
  value,
  defaultValue,
  open,
  defaultOpen,
  needConfirm,
  disabled,
  clearable,
  allowEmpty,
  order,
  format,
  weekStartsOn,
  minDate,
  maxDate,
  disabledDate,
  onChange,
  onOpenChange,
  ...props
}: RangePickerRootProps<TValue>) {
  const parentPopover = use(PopoverContext)
  const rangePicker = useRangePicker<TValue>(definedPickerOptions({
    picker, value, defaultValue, open, defaultOpen, needConfirm, disabled, clearable, allowEmpty, order, format, weekStartsOn, minDate, maxDate, disabledDate, onChange, onOpenChange,
  }))

  const content = containerRender ? containerRender(children, rangePicker) : (
    <PopoverRoot {...getDatePickerPopoverOptions({ ...props, ...definedPickerOptions({ placement, sideOffset }), ...popoverProps })} open={rangePicker.open} onOpenChange={rangePicker.setOpen}>
      {children}
    </PopoverRoot>
  )
  return <PickerAppearanceContext value={{ inputProps, startInputProps, endInputProps, calendarProps, popoverProps, classNames, styles }}><PickerContainerContext value={{ parentPopover }}><PickerOwnerContext value={rangePicker}><RangePickerContext value={rangePicker as never}>{content}</RangePickerContext></PickerOwnerContext></PickerContainerContext></PickerAppearanceContext>
}
