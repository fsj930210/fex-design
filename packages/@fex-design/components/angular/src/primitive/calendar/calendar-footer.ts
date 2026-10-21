import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import { calendarFooterClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'div[calendarFooter]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'calendar-footer', '[class]': 'hostClassName()' },
  template: '<ng-content />',
})
export class CalendarFooter {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement

  protected readonly hostClassName = createHostClassName(
    () => calendarFooterClassName,
    () => this.class(),
  )
}
