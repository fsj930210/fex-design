import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  forwardRef,
  inject,
  input,
  output,
  type OnChanges,
  type OnInit,
} from '@angular/core'
import type {
  TimeRangeValue,
  TimeRangeChangeDetails,
} from '@fex-design/core/time-picker/range-types'
import type { DisabledTime, TimePickerPopoverOptions } from '@fex-design/core/time-picker/types'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { Popover } from '../popover'
import { TimePickerRoot } from './time-picker-root'
import { TimePickerState } from './use-time-picker'
import { TimeRangePickerState } from './use-time-range-picker'

@Component({
  selector: 'div[timeRangePickerRoot]',
  exportAs: 'timeRangePickerRoot',
  standalone: true,
  hostDirectives: [Popover],
  providers: [
    TimePickerState,
    TimeRangePickerState,
    { provide: TimePickerRoot, useExisting: forwardRef(() => TimeRangePickerRoot) },
  ],
  host: { '[class]': 'hostClassName()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
})
export class TimeRangePickerRoot implements OnChanges, OnInit {
  protected readonly hostClassName = createHostClassName('block w-full min-w-0')
  readonly value = input<TimeRangeValue | null>()
  readonly defaultValue = input<TimeRangeValue | null>()
  readonly open = input<boolean>()
  readonly defaultOpen = input(false, { transform: booleanAttribute })
  readonly needConfirm = input(true, { transform: booleanAttribute })
  readonly format = input<string>()
  readonly use12Hours = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly readOnly = input(false, { transform: booleanAttribute })
  readonly disabledTime = input<DisabledTime>()
  readonly popoverProps = input<TimePickerPopoverOptions>()
  readonly change = output<{ value: TimeRangeValue | null; details: TimeRangeChangeDetails }>()
  readonly openChange = output<boolean>()
  readonly range = inject(TimeRangePickerState)
  readonly state = inject(TimePickerState)
  readonly rangeSnapshot = this.range.snapshot
  readonly snapshot = this.state.snapshot
  readonly currentValue = computed(() => this.snapshot().value)
  readonly resolvedFormat = computed(
    () => this.format() ?? (this.use12Hours() ? 'hh:mm:ss A' : 'HH:mm:ss'),
  )
  readonly popover = inject(Popover)
  private readonly destroyRef = inject(DestroyRef)
  get controller() {
    return this.state.controller
  }
  ngOnChanges() {
    this.syncOptions()
  }
  ngOnInit() {
    this.syncOptions()
    // One range session supplies the active endpoint to the existing column controller.
    this.destroyRef.onDestroy(this.range.controller.subscribe(() => this.syncTimeOptions()))
    this.popover.connectOptions(() => ({
      ...this.popoverProps(),
      trigger: ['focus', 'click'],
      disabled: this.disabled(),
      open: this.rangeSnapshot().open,
    }))
    const subscription = this.popover.openChange.subscribe((open) =>
      this.range.controller.setOpen(open),
    )
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
  private syncOptions() {
    this.range.setOptions({
      value: this.value(),
      defaultValue: this.defaultValue(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      needConfirm: this.needConfirm(),
      format: this.format(),
      use12Hours: this.use12Hours(),
      disabled: this.disabled(),
      readOnly: this.readOnly(),
      disabledTime: this.disabledTime(),
      onChange: (value, details) => this.change.emit({ value, details }),
      onOpenChange: (open) => this.openChange.emit(open),
    })
    this.syncTimeOptions()
  }
  private syncTimeOptions() {
    const range = this.range.controller.getSnapshot()
    this.state.setOptions({
      value: range.draft[range.activePart === 'start' ? 0 : 1],
      format: this.format(),
      use12Hours: this.use12Hours(),
      disabled: this.disabled(),
      readOnly: this.readOnly(),
      disabledTime: this.disabledTime(),
      onChange: (value, details) => this.range.controller.select(value, details.reason),
    })
  }
}
