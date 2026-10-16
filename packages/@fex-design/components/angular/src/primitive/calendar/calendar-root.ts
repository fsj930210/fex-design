import { ChangeDetectionStrategy, Component, ElementRef, Injector, inject, input, output, runInInjectionContext } from '@angular/core'
import type { CalendarCell, CalendarDate, CalendarGranularity, CalendarLocale, CalendarPanel, CalendarRange, CalendarSelectInfo, CalendarValue, CalendarWeekday } from '@fex-design/core/calendar'
import { calendarRootClassName } from '@fex-design/components-styles/calendar'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { createCalendarState } from './calendar-state'
@Component({ selector: 'div[calendarRoot]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { 'data-slot': 'calendar-root', '[class]': 'hostClassName()', '[attr.data-panel]': 'state().panel', '[attr.data-granularity]': 'state().granularity', '(mouseleave)': 'leave($event)' }, template: '<ng-content />' })
export class CalendarRoot<TValue extends CalendarValue = CalendarValue> {
  readonly class = input<string | undefined>(undefined)
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly value = input<TValue | null | undefined>()
  readonly values = input<readonly TValue[] | undefined>()
  readonly range = input<CalendarRange<TValue> | undefined>()
  readonly defaultValue = input<TValue | null>(null)
  readonly viewDate = input<CalendarDate | undefined>()
  readonly defaultViewDate = input<CalendarDate | undefined>()
  readonly panel = input<CalendarPanel | undefined>()
  readonly defaultPanel = input<CalendarPanel | undefined>()
  readonly monthSelection = input<'browse' | 'drilldown'>()
  readonly granularity = input<CalendarGranularity>('date')
  readonly weekStartsOn = input<CalendarWeekday>(0)
  readonly locale = input<Partial<CalendarLocale> | undefined>()
  readonly showWeek = input<boolean | undefined>()
  readonly fullscreen = input<boolean | undefined>()
  readonly today = input<CalendarDate | undefined>()
  readonly min = input<CalendarDate | undefined>()
  readonly max = input<CalendarDate | undefined>()
  readonly disabledDate = input<((date: CalendarDate) => boolean) | undefined>()
  readonly change = output<TValue>()
  readonly select = output<{ value: TValue; info: CalendarSelectInfo }>()
  readonly cellSelect = output<CalendarCell>()
  readonly cellHover = output<CalendarCell>()
  readonly viewDateChange = output<CalendarDate>()
  readonly panelChange = output<CalendarPanel>()
  // Angular inputs are assigned after construction; create the core lazily on first use.
  private calendar: ReturnType<typeof createCalendarState<TValue>> | undefined
  private readonly injector = inject(Injector)
  private getCalendar() {
    return this.calendar ??= runInInjectionContext(this.injector, () => createCalendarState(() => ({ value: this.value(), values: this.values(), range: this.range(), defaultValue: this.defaultValue(), viewDate: this.viewDate(), defaultViewDate: this.defaultViewDate(), panel: this.panel(), defaultPanel: this.defaultPanel(), granularity: this.granularity(), monthSelection: this.monthSelection(), weekStartsOn: this.weekStartsOn(), locale: this.locale(), showWeek: this.showWeek(), fullscreen: this.fullscreen(), today: this.today(), min: this.min(), max: this.max(), disabledDate: this.disabledDate(), onChange: value => this.change.emit(value), onSelect: (value, info) => this.select.emit({ value, info }), onCellSelect: cell => this.cellSelect.emit(cell), onCellHover: cell => this.cellHover.emit(cell), onViewDateChange: date => this.viewDateChange.emit(date), onPanelChange: panel => this.panelChange.emit(panel) })))
  }
  get controller() { return this.getCalendar().controller }
  readonly state = () => this.getCalendar().state()
  readonly grid = () => this.getCalendar().grid()
  leave(event: MouseEvent) { if (!event.defaultPrevented) this.controller.clearHoveredRow() }
  protected readonly hostClassName = createHostClassName(() => calendarRootClassName, () => this.class())
}
