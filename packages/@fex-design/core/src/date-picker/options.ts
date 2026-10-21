import { pickPickerProps } from './safe-props'
import type { CalendarDate, CalendarValue, CalendarWeekday } from '../calendar/types'
import type { DatePickerPicker, DatePickerShowTime, DatePickerDisabledTime } from './types'
import { isCalendarDateTime, getCalendarValueKey } from '../calendar/value'
import type { PopoverOptions } from '../popover/types'

export const datePickerPopoverKeys = [
  'placement',
  'side',
  'align',
  'sideOffset',
  'alignOffset',
  'strategy',
  'avoidCollisions',
  'collisionBoundary',
  'collisionPadding',
  'matchReferenceWidth',
  'hideWhenDetached',
  'zIndex',
  'getPopupContainer',
  'closeDelay',
  'dismiss',
  'lazyMount',
  'destroyOnHidden',
] as const satisfies readonly (keyof PopoverOptions)[]
export type DatePickerPopoverOptions = Pick<PopoverOptions, (typeof datePickerPopoverKeys)[number]>

export function getDatePickerPopoverOptions(
  options: DatePickerPopoverOptions = {},
): PopoverOptions {
  return {
    ...pickPickerProps(options, datePickerPopoverKeys),
    ...(options.dismiss
      ? {
          dismiss: pickPickerProps(options.dismiss, [
            'escapeKey',
            'outsidePointer',
            'overlayPointer',
          ]),
        }
      : {}),
    placement: options.placement ?? 'bottom',
    sideOffset: options.sideOffset ?? 6,
    trigger: ['focus'],
  }
}

export interface PickerOptions {
  showTime?: boolean | DatePickerShowTime | undefined
  disabledTime?: DatePickerDisabledTime | undefined
  picker?: DatePickerPicker | undefined
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  needConfirm?: boolean | undefined
  disabled?: boolean | undefined
  clearable?: boolean | undefined
  format?: string | undefined
  weekStartsOn?: CalendarWeekday | undefined
  minDate?: CalendarDate | undefined
  maxDate?: CalendarDate | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
}

export interface PickerValueOptions<TValue> extends PickerOptions {
  value?: TValue | undefined
  defaultValue?: TValue | undefined
  onChange?: ((value: TValue) => void) | undefined
}

/** Preserve absence at the adapter boundary, including framework optional inputs. */
export function definedPickerOptions<TOptions extends object>(source: TOptions): TOptions {
  const result = { ...source }
  for (const key in result) {
    if (result[key] === undefined) delete result[key]
  }
  return result
}

export function equalPickerValue(
  left: CalendarValue | null | undefined,
  right: CalendarValue | null | undefined,
) {
  if (left === right) return true
  if (!left || !right) return false
  // Selection identity is independent of display format and object identity.
  return (
    (isCalendarDateTime(left) ? left.toString() : getCalendarValueKey(left)) ===
    (isCalendarDateTime(right) ? right.toString() : getCalendarValueKey(right))
  )
}
