import type { SnapshotStore } from '../store/create-store'
import type { TimePickerControllerOptions, TimePickerChangeDetails, TimeValue } from './types'

export type TimeRangePart = 'start' | 'end'
export type TimeRangeValue = readonly [TimeValue, TimeValue]
export type TimeRangeDraft = readonly [TimeValue | null, TimeValue | null]
export interface TimeRangeChangeDetails {
  reason: TimePickerChangeDetails['reason'] | 'confirm'
  activePart: TimeRangePart
}
export interface TimeRangePickerOptions extends Omit<
  TimePickerControllerOptions,
  'value' | 'defaultValue' | 'onChange'
> {
  value?: TimeRangeValue | null | undefined
  defaultValue?: TimeRangeValue | null | undefined
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  /** Confirm each endpoint before committing the range by default. */
  needConfirm?: boolean | undefined
  onChange?: ((value: TimeRangeValue | null, details: TimeRangeChangeDetails) => void) | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
}
export interface TimeRangePickerSnapshot {
  value: TimeRangeValue | null
  draft: TimeRangeDraft
  activePart: TimeRangePart
  completedParts: readonly TimeRangePart[]
  focusRequest: { part: TimeRangePart } | null
  open: boolean
}
export interface TimeRangePickerController extends SnapshotStore<TimeRangePickerSnapshot> {
  setOptions(options: TimeRangePickerOptions): void
  setOpen(open: boolean): void
  activate(part: TimeRangePart): void
  select(value: TimeValue | null, reason: TimePickerChangeDetails['reason']): void
  canConfirm(): boolean
  confirm(): void
  cancel(): void
  clear(): void
}
