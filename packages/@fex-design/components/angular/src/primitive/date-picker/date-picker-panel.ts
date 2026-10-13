import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  getCalendarValueDate,
  type CalendarDate,
  type CalendarCell as Cell,
  type CalendarValue,
} from '@fex-design/core/calendar'
import { getGranularityByPicker } from '@fex-design/core/date-picker/panel'
import { createRangePreviewValue } from '@fex-design/core/date-picker/range'
import { normalizeDatePickerValue } from '@fex-design/core/date-picker/value'
import {
  datePickerCellClassName,
  datePickerGridClassName,
  datePickerHeaderSideClassName,
  datePickerPanelClassName,
  datePickerWeekHeaderClassName,
} from '@fex-design/components-styles/date-picker'
import {
  CalendarCell,
  CalendarGrid,
  CalendarRoot,
  CalendarWeekHeader,
} from '../calendar'
import {
  DatePickerHeader,
  DatePickerHeaderButton,
  DatePickerHeaderLabel,
  DatePickerHeaderTitle,
} from './date-picker-header'
import { DatePickerState } from './use-date-picker'
import { RangePickerState } from './use-range-picker'



@Component({
  selector: 'div[datePickerPanel]',
  standalone: true,
  imports: [
    CalendarRoot,
    CalendarWeekHeader,
    CalendarGrid,
    CalendarCell,
    DatePickerHeader,
    DatePickerHeaderButton,
    DatePickerHeaderLabel,
    DatePickerHeaderTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker-panel.html',
})
export class DatePickerPanel {
  protected readonly panelClassName = datePickerPanelClassName
  protected readonly headerSideClassName = datePickerHeaderSideClassName
  protected readonly weekHeaderClassName = datePickerWeekHeaderClassName
  protected readonly gridClassName = datePickerGridClassName
  protected readonly cellClassName = datePickerCellClassName
  protected readonly getGranularityByPicker = getGranularityByPicker

  constructor(readonly state: DatePickerState) {}

  selectValue(value: CalendarValue) {
    const context = this.state.context()
    this.state.select(normalizeDatePickerValue(getCalendarValueDate(value), context.picker, context.weekStartsOn) as never)
  }

  primaryPreviousAction() {
    return this.state.context().panel === 'date' ? 'previous-year' : 'previous-panel'
  }

  primaryNextAction() {
    return this.state.context().panel === 'date' ? 'next-year' : 'next-panel'
  }
}

@Component({
  selector: 'div[rangePickerPanel]',
  standalone: true,
  imports: [
    CalendarRoot,
    CalendarWeekHeader,
    CalendarGrid,
    CalendarCell,
    DatePickerHeader,
    DatePickerHeaderButton,
    DatePickerHeaderLabel,
    DatePickerHeaderTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './range-picker-panel.html',
})
export class RangePickerPanel {
  @Input() panelViewDate?: CalendarDate
  protected readonly panelClassName = datePickerPanelClassName
  protected readonly headerSideClassName = datePickerHeaderSideClassName
  protected readonly weekHeaderClassName = datePickerWeekHeaderClassName
  protected readonly gridClassName = datePickerGridClassName
  protected readonly cellClassName = datePickerCellClassName
  protected readonly getGranularityByPicker = getGranularityByPicker

  constructor(readonly state: RangePickerState) {}

  viewDate() {
    return this.panelViewDate ?? this.state.context().viewDate
  }

  displayRange() {
    const context = this.state.context()
    return createRangePreviewValue(
      context.rangeValue,
      context.hoverValue as CalendarValue | null,
      context.activePart,
    )
  }

  selectValue(value: CalendarValue) {
    const context = this.state.context()
    this.state.select(normalizeDatePickerValue(getCalendarValueDate(value), context.picker, context.weekStartsOn) as never)
  }

  hoverCell(cell: Cell) {
    if (!cell.state.disabled) this.state.setHoverValue(cell.value)
  }

  disabledDate(date: CalendarDate) {
    const context = this.state.context()
    return context.disabledDate?.(date, context.activePart) ?? false
  }

  primaryPreviousAction() {
    return this.state.context().panel === 'date' ? 'previous-year' : 'previous-panel'
  }

  primaryNextAction() {
    return this.state.context().panel === 'date' ? 'next-year' : 'next-panel'
  }
}
