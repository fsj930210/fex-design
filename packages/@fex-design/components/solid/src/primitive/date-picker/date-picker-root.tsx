import { PickerAppearanceContext } from './appearance-context'
import type { PickerAppearance } from './appearance.types'
import { useContext } from 'solid-js'
import { PopoverContext } from '../popover/popover-context'
import { PickerOwnerContext } from './owner-context'
import { PickerContainerContext } from './container-context'
import { getDatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
import type { CalendarValue } from '@fex-design/core/calendar'
import { type JSX, splitProps, type ParentProps } from 'solid-js'
import { Popover, type PopoverProps } from '../popover'
import { DatePickerContext } from './context'
import { useDatePicker, type UseDatePickerOptions } from './use-date-picker'

export interface DatePickerRootProps<TValue extends CalendarValue = CalendarValue>
  extends
    ParentProps<
      Omit<PopoverProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'children' | 'trigger'>
    >,
    UseDatePickerOptions<TValue>,
    Omit<PickerAppearance, 'startInputProps' | 'endInputProps'> {
  popoverProps?: PickerAppearance['popoverProps'] | undefined
  containerRender?:
    | ((children: JSX.Element, state: ReturnType<typeof useDatePicker<TValue>>) => JSX.Element)
    | undefined
}

export function DatePickerRoot<TValue extends CalendarValue = CalendarValue>(
  props: DatePickerRootProps<TValue>,
): JSX.Element {
  const parentPopover = useContext(PopoverContext)
  const [local, rest] = splitProps(props, [
    'children',
    'containerRender',
    'popoverProps',
    'inputProps',
    'calendarProps',
    'classNames',
    'styles',
    'picker',
    'value',
    'defaultValue',
    'open',
    'defaultOpen',
    'multiple',
    'maxCount',
    'showTime',
    'disabledTime',
    'needConfirm',
    'disabled',
    'clearable',
    'format',
    'weekStartsOn',
    'minDate',
    'maxDate',
    'disabledDate',
    'onChange',
    'onOpenChange',
  ])
  const [, options] = splitProps(local, [
    'children',
    'containerRender',
    'popoverProps',
    'inputProps',
    'calendarProps',
    'classNames',
    'styles',
  ])
  const datePicker = useDatePicker<TValue>(options)
  return (
    <PickerAppearanceContext.Provider value={() => local}>
      <PickerContainerContext.Provider value={{ parentPopover }}>
        <PickerOwnerContext.Provider value={datePicker}>
          <DatePickerContext.Provider value={datePicker as never}>
            {local.containerRender ? (
              local.containerRender(local.children, datePicker)
            ) : (
              <Popover
                {...getDatePickerPopoverOptions({ ...rest, ...local.popoverProps })}
                open={datePicker.open()}
                onOpenChange={datePicker.setOpen}
              >
                {local.children}
              </Popover>
            )}
          </DatePickerContext.Provider>
        </PickerOwnerContext.Provider>
      </PickerContainerContext.Provider>
    </PickerAppearanceContext.Provider>
  )
}
