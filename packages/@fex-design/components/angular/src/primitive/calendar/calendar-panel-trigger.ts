import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import type { CalendarPanel } from '@fex-design/core/calendar'
import { calendarPanelTriggerClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarRoot } from './calendar-root'
@Component({ selector: 'button[calendarPanelTrigger]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { type: 'button', 'data-slot': 'calendar-panel-trigger', '[attr.data-panel]': 'panel()', '[class]': 'hostClassName()', '(click)': 'activate($event)' }, template: '<ng-content />' })
export class CalendarPanelTrigger {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement
  readonly panel = input.required<CalendarPanel>()
  private readonly root = inject(CalendarRoot)
  activate(event: MouseEvent) { if (!event.defaultPrevented) this.root.controller.setPanel(this.panel()) }
  protected readonly hostClassName = createHostClassName(() => calendarPanelTriggerClassName, () => this.class())
}
