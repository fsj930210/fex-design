import { mergeStyle } from '@fex-design/angular/signals/merge-style'
import type { CalendarHeaderChildProps } from '../../primitive/calendar'
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  inject,
  input,
} from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import {
  getCalendarUIView,
  resolveCalendarSemanticValue,
  type CalendarUIOptions,
  type CalendarSemanticPart,
  type CalendarRenderContext,
  type CalendarCellRenderContext,
} from '@fex-design/core/calendar'
import {
  calendarUIClasses,
  calendarUIFullCellClassName,
  calendarUIMiniCellClassName,
  calendarUIFullTriggerClassName,
  calendarUIMiniTriggerClassName,
  calendarUIWeekRowClassName,
  calendarUIDateRowClassName,
  calendarUIMonthRowClassName,
} from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import {
  CalendarRoot,
  CalendarHeader,
  CalendarWeekHeader,
  CalendarRow,
  CalendarCell,
  CalendarCellTrigger,
  CalendarFooter,
} from '@fex-design/angular/primitive/calendar'
import type { CalendarClassNames, CalendarStyles } from './types'
@Component({
  selector: 'div[calendarContent]',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CalendarHeader,
    CalendarWeekHeader,
    CalendarRow,
    CalendarCell,
    CalendarCellTrigger,
    CalendarFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './calendar-content.html',
})
export class CalendarContent {
  readonly mergeStyle = mergeStyle
  readonly options = input.required<CalendarUIOptions>()
  readonly headerProps = input<CalendarHeaderChildProps>()
  readonly headerRender = input<false | undefined>()
  readonly classNames = input<CalendarClassNames>({})
  readonly styles = input<CalendarStyles>({})
  readonly headerTemplate = input<TemplateRef<CalendarRenderContext> | undefined>()
  readonly cellTemplate = input<TemplateRef<CalendarCellRenderContext> | undefined>()
  readonly fullCellTemplate = input<TemplateRef<CalendarCellRenderContext> | undefined>()
  readonly footerTemplate = input<TemplateRef<CalendarRenderContext> | undefined>()
  readonly calendar = inject(CalendarRoot)
  readonly context = computed(() => ({
    state: this.calendar.state(),
    controller: this.calendar.controller,
  }))
  readonly view = computed(() => getCalendarUIView(this.context(), this.options()))
  readonly columns = computed(() =>
    this.view().showWeek
      ? calendarUIWeekRowClassName
      : this.context().state.panel === 'date'
        ? calendarUIDateRowClassName
        : calendarUIMonthRowClassName,
  )
  readonly appearance = computed(() => ({
    classNames: resolveCalendarSemanticValue(this.classNames(), this.context()),
    styles: resolveCalendarSemanticValue(this.styles(), this.context()),
  }))
  readonly classes = calendarUIClasses
  readonly fullCellClass = calendarUIFullCellClassName
  readonly miniCellClass = calendarUIMiniCellClassName
  readonly fullTriggerClass = calendarUIFullTriggerClassName
  readonly miniTriggerClass = calendarUIMiniTriggerClassName
  readonly cn = cn
  cls(part: CalendarSemanticPart) {
    return cn(calendarUIClasses[part], this.appearance().classNames?.[part])
  }
}
