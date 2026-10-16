import { getTimePickerDirection } from '@fex-design/core/time-picker/scroll'
import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import { cn } from '@fex-design/utils'
import { popoverContentClassName } from '@fex-design/components-styles/popover'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { PopoverContent } from '../popover'
@Component({ selector: 'div[timePickerContent]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[attr.dir]': 'direction()', '[style.width]': "'var(--floating-reference-width)'", '[style.max-width]': "'var(--floating-available-width)'", '[style.max-height]': "'var(--floating-available-height)'" }, template: '<ng-content />' })
export class TimePickerContent extends PopoverContent {
  private readonly nativeDirection = this.element.getAttribute('dir')
  protected readonly direction = computed(() => { this.popover.snapshot(); return this.nativeDirection ?? getTimePickerDirection(this.popover.referenceElement) })
  protected override readonly hostClassName = createHostClassName(() => cn(popoverContentClassName(), 'overflow-hidden p-0', this.className()))
}
