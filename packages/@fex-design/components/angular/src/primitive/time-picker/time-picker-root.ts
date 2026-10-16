import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, output, type OnChanges, type OnInit } from '@angular/core'
import type { DisabledTime, TimePickerChangeDetails, TimeValue, TimePickerPopoverOptions } from '@fex-design/core/time-picker/types'
import type { PopoverOptions } from '@fex-design/core/popover/types'
import { Popover } from '../popover'
import { TimePickerState } from './use-time-picker'

@Component({
  selector: 'div[timePickerRoot]', exportAs: 'timePickerRoot', standalone: true,
  hostDirectives: [Popover], providers: [TimePickerState],
  host: { '[class]': 'hostClassName()' },
  changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content />',
})
export class TimePickerRoot implements OnChanges, OnInit {
  protected readonly hostClassName = createHostClassName('block w-full min-w-0')
  readonly value = input<TimeValue | null>()
  readonly defaultValue = input<TimeValue | null>()
  readonly popoverProps = input<TimePickerPopoverOptions>()
  readonly format = input<string>()
  readonly open = input<boolean>()
  readonly defaultOpen = input(false, { transform: booleanAttribute })
  readonly placement = input<PopoverOptions['placement']>()
  readonly use12Hours = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly readOnly = input(false, { transform: booleanAttribute })
  readonly disabledTime = input<DisabledTime>()
  readonly change = output<{ value: TimeValue | null; details: TimePickerChangeDetails }>()
  readonly openChange = output<boolean>()
  readonly state = inject(TimePickerState)
  readonly popover = inject(Popover)
  readonly snapshot = this.state.snapshot
  readonly currentValue = computed(() => this.snapshot().value)
  readonly resolvedFormat = computed(() => this.format() ?? (this.use12Hours() ? 'hh:mm:ss A' : 'HH:mm:ss'))
  get controller() { return this.state.controller }
  ngOnChanges() { this.syncOptions() }
  ngOnInit() {
    this.syncOptions()
    this.popover.connectOptions(() => ({ ...this.popoverProps(), trigger: ['focus', 'click'], disabled: this.disabled(), open: this.open(), defaultOpen: this.defaultOpen(), placement: this.placement() ?? this.popoverProps()?.placement, side: this.popoverProps()?.side, align: this.popoverProps()?.align }))
    this.popover.openChange.subscribe(value => this.openChange.emit(value))
  }
  private syncOptions() {
    this.state.setOptions({ value: this.value(), defaultValue: this.defaultValue(), format: this.format(), use12Hours: this.use12Hours(), disabled: this.disabled(), readOnly: this.readOnly(), disabledTime: this.disabledTime(), onChange: (value, details) => this.change.emit({ value, details }) })
  }
}
