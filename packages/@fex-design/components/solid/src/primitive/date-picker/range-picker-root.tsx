import { PickerAppearanceContext } from './appearance-context'
import type { PickerAppearance } from './appearance.types'
import { useContext } from 'solid-js'
import { PopoverContext } from '../popover/popover-context'
import { PickerOwnerContext } from './owner-context'
import { PickerContainerContext } from './container-context'
import { getDatePickerPopoverOptions } from '@fex-design/core/date-picker/options'
import type { CalendarValue } from '@fex-design/core/calendar'
import { splitProps, type JSX, type ParentProps } from 'solid-js'
import { Popover, type PopoverProps } from '../popover'
import { RangePickerContext } from './context'
import { useRangePicker, type UseRangePickerOptions } from './use-range-picker'

export interface RangePickerRootProps<TValue extends CalendarValue = CalendarValue>
  extends
    ParentProps<Omit<PopoverProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'children' | 'trigger'>>,
    UseRangePickerOptions<TValue>, PickerAppearance {
  popoverProps?: PickerAppearance['popoverProps'] | undefined
  containerRender?: ((children: JSX.Element, state: ReturnType<typeof useRangePicker<TValue>>) => JSX.Element) | undefined
}

export function RangePickerRoot<TValue extends CalendarValue = CalendarValue>(
  props: RangePickerRootProps<TValue>,
): JSX.Element {
  const parentPopover = useContext(PopoverContext)
  const [local, rest] = splitProps(props, [
    'children',
    'containerRender',
    'popoverProps', 'inputProps', 'startInputProps', 'endInputProps', 'calendarProps', 'classNames', 'styles',
    'picker',
    'value',
    'defaultValue',
    'open',
    'defaultOpen',
    'needConfirm',
    'disabled',
    'clearable',
    'allowEmpty',
    'order',
    'format',
    'weekStartsOn',
    'minDate',
    'maxDate',
    'disabledDate',
    'onChange',
    'onOpenChange',
  ])
  const [, options] = splitProps(local, ['children', 'containerRender', 'popoverProps', 'inputProps', 'startInputProps', 'endInputProps', 'calendarProps', 'classNames', 'styles'])
  const rangePicker = useRangePicker<TValue>(options)
  return (
    <PickerAppearanceContext.Provider value={() => local}><PickerContainerContext.Provider value={{ parentPopover }}><PickerOwnerContext.Provider value={rangePicker}><RangePickerContext.Provider value={rangePicker as never}>
      {local.containerRender ? local.containerRender(local.children, rangePicker) : (
        <Popover {...getDatePickerPopoverOptions({ ...rest, ...local.popoverProps })} open={rangePicker.open()} onOpenChange={rangePicker.setOpen}>
          {local.children}
        </Popover>
      )}
    </RangePickerContext.Provider></PickerOwnerContext.Provider></PickerContainerContext.Provider></PickerAppearanceContext.Provider>
  )
}
