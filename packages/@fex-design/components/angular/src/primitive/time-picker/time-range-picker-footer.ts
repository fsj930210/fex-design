import type { ButtonColor, ButtonVariant } from '@fex-design/core/button/types'
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { Button } from '../button'
import { TimeRangePickerRoot } from './time-range-picker-root'
export interface TimeRangePickerButtonCustomization {
  class?: string | undefined
  style?: string | undefined
  color?: ButtonColor | undefined
  variant?: ButtonVariant | undefined
}
@Component({
  selector: 'div[timeRangePickerFooter]',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (root.needConfirm()) {
    <div
      data-slot="time-range-picker-footer"
      class="flex justify-end gap-2 border-t border-border p-2"
    >
      <button
        button
        type="button"
        [class]="cancelButtonProps()?.class"
        [style]="cancelButtonProps()?.style"
        [color]="cancelButtonProps()?.color"
        [variant]="cancelButtonProps()?.variant ?? 'text'"
        (click)="root.range.controller.cancel()"
      >
        取消
      </button>
      <button
        button
        type="button"
        [class]="confirmButtonProps()?.class"
        [style]="confirmButtonProps()?.style"
        [color]="confirmButtonProps()?.color ?? 'primary'"
        [variant]="confirmButtonProps()?.variant ?? 'solid'"
        [disabled]="!canConfirm()"
        (click)="root.range.controller.confirm()"
      >
        确定
      </button>
    </div>
  }`,
})
export class TimeRangePickerFooter {
  readonly cancelButtonProps = input<TimeRangePickerButtonCustomization>()
  readonly confirmButtonProps = input<TimeRangePickerButtonCustomization>()
  readonly root = inject(TimeRangePickerRoot)
  readonly canConfirm = computed(() => {
    this.root.rangeSnapshot()
    return this.root.range.controller.canConfirm()
  })
}
