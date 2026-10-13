import { ChangeDetectionStrategy, Component, ElementRef, Injector, TemplateRef, booleanAttribute, computed, contentChild, forwardRef, inject, input, output, runInInjectionContext } from '@angular/core'
import { getCalendarUIOptions, type CalendarDate, type CalendarCell, type CalendarRange, type CalendarLocale, type CalendarUIPanel, type CalendarUIOptions, type CalendarRenderContext, type CalendarCellRenderContext, type CalendarSelectInfo, type CalendarWeekday } from '@fex-design/core/calendar'
import { calendarRootClassName } from '@fex-design/components-styles/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { CalendarRoot } from '../../primitive/calendar'
import { createCalendarState } from '../../primitive/calendar/calendar-state'
import { CalendarContent } from './calendar-content'
import type { CalendarClassNames, CalendarStyles } from './types'
@Component({
  selector: 'div[calendar]', standalone: true, imports: [CalendarContent],
  providers: [{ provide: CalendarRoot, useExisting: forwardRef(() => Calendar) }],
  changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './calendar.html',
  host: { 'data-slot': 'calendar-root', '[class]': 'hostClassName()', '[attr.data-fullscreen]': 'fullscreen()', '[attr.data-panel]': 'state().panel', '[attr.data-granularity]': "'date'", '(mouseleave)': 'leave($event)' },
})
export class Calendar {
  readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  readonly class = input<string | undefined>()
  readonly value = input<CalendarDate | null | undefined>()
  readonly defaultValue = input<CalendarDate | null>(null)
  readonly values = input<readonly CalendarDate[] | undefined>()
  readonly range = input<CalendarRange<CalendarDate> | undefined>()
  readonly viewDate = input<CalendarDate | undefined>()
  readonly defaultViewDate = input<CalendarDate | undefined>()
  readonly panel = input<CalendarUIPanel | undefined>()
  readonly defaultPanel = input<CalendarUIPanel | undefined>()
  readonly min = input<CalendarDate | undefined>()
  readonly max = input<CalendarDate | undefined>()
  readonly today = input<CalendarDate | undefined>()
  readonly disabledDate = input<((date: CalendarDate) => boolean) | undefined>()
  readonly weekStartsOn = input<CalendarWeekday | undefined>()
  readonly locale = input<Partial<CalendarLocale> | undefined>()
  readonly fullscreen = input(true, { transform: booleanAttribute })
  readonly showWeek = input(false, { transform: booleanAttribute })
  readonly headerRender = input<false | undefined>()
  readonly classNames = input<CalendarClassNames>({})
  readonly styles = input<CalendarStyles>({})
  readonly change = output<CalendarDate>()
  readonly select = output<{ value: CalendarDate; info: CalendarSelectInfo }>()
  readonly panelChange = output<CalendarUIPanel>()
  readonly viewDateChange = output<CalendarDate>()
  readonly cellSelect = output<CalendarCell>()
  readonly cellHover = output<CalendarCell>()
  readonly headerTemplate = contentChild<TemplateRef<CalendarRenderContext>>('header')
  readonly cellTemplate = contentChild<TemplateRef<CalendarCellRenderContext>>('cell')
  readonly fullCellTemplate = contentChild<TemplateRef<CalendarCellRenderContext>>('fullCell')
  readonly footerTemplate = contentChild<TemplateRef<CalendarRenderContext>>('footer')
  readonly options = computed<CalendarUIOptions>(() => ({
    value: this.value(), defaultValue: this.defaultValue(), values: this.values(), range: this.range(),
    viewDate: this.viewDate(), defaultViewDate: this.defaultViewDate(), panel: this.panel(), defaultPanel: this.defaultPanel(),
    min: this.min(), max: this.max(), today: this.today(), disabledDate: this.disabledDate(), weekStartsOn: this.weekStartsOn(),
    locale: this.locale(), fullscreen: this.fullscreen(), showWeek: this.showWeek(),
    onChange: value => this.change.emit(value), onSelect: (value, info) => this.select.emit({ value, info }),
    onPanelChange: panel => this.panelChange.emit(panel), onViewDateChange: date => this.viewDateChange.emit(date),
    onCellSelect: cell => this.cellSelect.emit(cell), onCellHover: cell => this.cellHover.emit(cell),
  }))
  private calendar: ReturnType<typeof createCalendarState<CalendarDate>> | undefined
  private readonly injector = inject(Injector)
  // Angular assigns initial inputs after construction; initialize on first host/template read.
  private getCalendar() { return this.calendar ??= runInInjectionContext(this.injector, () => createCalendarState(() => getCalendarUIOptions(this.options()))) }
  get controller() { return this.getCalendar().controller }
  readonly state = () => this.getCalendar().state()
  readonly grid = () => this.getCalendar().grid()
  leave(event: MouseEvent) { if (!event.defaultPrevented) this.controller.clearHoveredRow() }
  protected readonly hostClassName = createHostClassName(() => cn(calendarRootClassName, calendarUIRootClassName), () => this.class())
}
