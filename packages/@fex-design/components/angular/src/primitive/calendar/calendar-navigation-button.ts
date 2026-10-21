import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import type { CalendarNavigationAction } from '@fex-design/core/calendar'
import { calendarNavigationButtonClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarRoot } from './calendar-root'
import { ChevronLeftIcon } from '../../icons/chevron-left'
import { ChevronRightIcon } from '../../icons/chevron-right'
@Component({
  selector: 'button[calendarNavigationButton]',
  standalone: true,
  imports: [ChevronLeftIcon, ChevronRightIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    'data-slot': 'calendar-navigation-button',
    '[attr.data-action]': 'action()',
    '[class]': 'hostClassName()',
    '(click)': 'activate($event)',
  },
  templateUrl: './calendar-navigation-button.html',
})
export class CalendarNavigationButton {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement
  readonly action = input.required<CalendarNavigationAction>()
  private readonly root = inject(CalendarRoot)
  activate(event: MouseEvent) {
    if (!event.defaultPrevented) this.root.controller.navigate(this.action())
  }
  protected readonly hostClassName = createHostClassName(
    () => calendarNavigationButtonClassName,
    () => this.class(),
  )
}
