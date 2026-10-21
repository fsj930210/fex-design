import { getDatePickerCellLabel } from '@fex-design/core/date-picker/panel'
import { calendarDefaultWeekLabels } from '@fex-design/core/calendar'
import { mergePickerStyle } from './style'
import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { cn } from '@fex-design/utils'
import type { CalendarCell as CoreCalendarCell } from '@fex-design/core/calendar'
import { getDatePickerPanelView } from '@fex-design/core/date-picker/view'
import { getDatePickerHeaderActions } from '@fex-design/core/date-picker/panel'
import {
  getDatePickerRowClassName,
  getDatePickerCellClassName,
  datePickerCellClassName,
  datePickerGridClassName,
  datePickerHeaderSideClassName,
  datePickerWeekHeaderClassName,
} from '@fex-design/components-styles/date-picker'
import {
  CalendarRoot,
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarWeekHeader,
} from '@fex-design/angular/primitive/calendar'
import { DatePickerHeader } from './date-picker-header'
import { DatePickerHeaderTitle } from './date-picker-header-title'
import { DatePickerHeaderButton } from './date-picker-header-button'
import { DatePickerHeaderLabel } from './date-picker-header-label'
import type { DatePickerCalendarProps } from './appearance.types'
import { getFooterOwner } from './date-picker-footer-owner'
@Component({
  selector: 'div[datePickerPanelContent]',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CalendarCell,
    CalendarCellTrigger,
    CalendarGrid,
    CalendarWeekHeader,
    DatePickerHeader,
    DatePickerHeaderTitle,
    DatePickerHeaderButton,
    DatePickerHeaderLabel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './date-picker-panel-content.html',
})
export class DatePickerPanelContent {
  protected readonly getDatePickerCellLabel = getDatePickerCellLabel
  readonly calendarProps = input<DatePickerCalendarProps>()
  protected readonly calendar = inject(CalendarRoot)
  protected readonly owner = getFooterOwner()
  protected readonly view = computed(() => getDatePickerPanelView(this.calendar.state().panel))
  protected readonly actions = computed(() =>
    getDatePickerHeaderActions(this.calendar.state().panel),
  )
  protected readonly headerSide = datePickerHeaderSideClassName
  protected readonly weekHeader = datePickerWeekHeaderClassName
  protected readonly gridClass = datePickerGridClassName
  protected readonly cellClass = datePickerCellClassName
  protected readonly cellLayout = getDatePickerCellClassName
  protected readonly cn = cn
  readonly rowProps = computed(() => ({
    class: cn(
      getDatePickerRowClassName(this.calendar.state().panel),
      this.calendarProps()?.classNames?.row,
    ),
    style: mergePickerStyle(this.calendarProps()?.styles?.row),
  }))
  readonly labels = computed(
    () => this.calendarProps()?.locale?.weekdays ?? calendarDefaultWeekLabels,
  )
  cellContext(cell: CoreCalendarCell) {
    const context = { state: this.calendar.state(), controller: this.calendar.controller, cell }
    return { ...context, $implicit: context }
  }
}
