import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  RangePickerRoot,
  RangePickerTrigger,
  RangePickerContent,
  RangePickerPanelGroup,
  DatePickerFooter,
} from '@fex-design/angular/primitive/date-picker'
import { createCalendarDate } from '@fex-design/core/calendar/temporal'

@Component({
  selector: 'date-picker-styles-example',
  standalone: true,
  imports: [
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    RangePickerRoot,
    RangePickerTrigger,
    RangePickerContent,
    RangePickerPanelGroup,
    DatePickerFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './styles.html',
})
export class DatePickerStylesExample {
  readonly date = createCalendarDate(2026, 10, 15)
  readonly range = { start: this.date, end: this.date.add({ days: 7 }) }
  readonly inputAppearance = {
    classNames: {
      root: 'rounded-xl border-2 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-violet-500/20',
      control: 'font-medium text-violet-950',
      suffix: 'text-violet-600',
      clear: 'text-violet-600 hover:text-violet-800',
    },
    styles: { root: { borderColor: '#8b5cf6', backgroundColor: '#f5f3ff' } },
  }
  readonly calendarAppearance = {
    classNames: {
      header: 'border-violet-200 bg-violet-100 text-violet-950',
      weekHeader: 'bg-violet-50 text-violet-600',
      grid: 'bg-violet-50',
      cellTrigger: 'font-medium',
    },
    style: {
      backgroundColor: '#f5f3ff',
      '--calendar-selected-background': '#7c3aed',
      '--calendar-selected-foreground': '#ffffff',
      '--calendar-hover-background': '#ede9fe',
      '--calendar-today-color': '#8b5cf6',
    },
  }
  readonly popupAppearance = {
    classNames: { root: 'rounded-2xl shadow-lg' },
    styles: { root: { borderColor: '#8b5cf6', borderWidth: '2px', backgroundColor: '#f5f3ff' } },
  }
  readonly partClasses = {
    footer: 'border-violet-200 bg-violet-100',
    separator: 'text-violet-600',
    today: 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-200',
  }
}
