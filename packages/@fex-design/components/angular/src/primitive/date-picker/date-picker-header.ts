import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core'
import {
  getDatePickerHeaderLabelParts,
  getNextPanelByHeaderLabel,
} from '@fex-design/core/date-picker/panel'
import type {
  DatePickerHeaderAction,
  DatePickerHeaderLabelPart,
} from '@fex-design/core/date-picker/types'
import {
  datePickerHeaderClassName,
  datePickerHeaderDoubleIconClassName,
  datePickerHeaderLabelClassName,
  datePickerHeaderNavigationClassName,
  datePickerHeaderTitleClassName,
} from '@fex-design/components-styles/date-picker'
import { ChevronLeftIcon, ChevronRightIcon } from '@fex-design/angular/icons/chevron'
import { buttonPrimitiveClassName } from '../button/button'
import { CalendarRoot } from '../calendar'
import { DatePickerState } from './use-date-picker'
import { RangePickerState } from './use-range-picker'

@Component({
  selector: 'div[datePickerHeader]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-header',
    '[class]': 'className',
  },
  template: '<ng-content />',
})
export class DatePickerHeader {
  protected readonly className = datePickerHeaderClassName
}

@Component({
  selector: 'div[datePickerHeaderTitle]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-header-title',
    '[class]': 'className',
  },
  template: '<ng-content />',
})
export class DatePickerHeaderTitle {
  protected readonly className = datePickerHeaderTitleClassName
}

@Component({
  selector: 'button[datePickerHeaderButton]',
  standalone: true,
  imports: [ChevronLeftIcon, ChevronRightIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-header-button',
    type: 'button',
    '[attr.data-action]': 'action',
    '[class]': 'className',
    '(click)': 'runAction($event)',
  },
  templateUrl: './date-picker-header-button.html',
})
export class DatePickerHeaderButton {
  @Input({ required: true }) action!: DatePickerHeaderAction
  protected readonly className = buttonPrimitiveClassName(datePickerHeaderNavigationClassName)
  protected readonly doubleIconClassName = datePickerHeaderDoubleIconClassName

  constructor(
    private readonly calendar: CalendarRoot,
    @Optional() private readonly datePicker: DatePickerState | null,
    @Optional() private readonly rangePicker: RangePickerState | null,
  ) {}

  isPrevious() {
    return this.action.startsWith('previous')
  }

  isDouble() {
    return this.action.includes('year') || this.action.includes('panel')
  }

  runAction(event: Event) {
    if (event.defaultPrevented) return
    this.calendar.controller.navigate(this.action)
  }

  private owner() {
    const owner = this.datePicker ?? this.rangePicker
    if (!owner)
      throw new Error(
        'DatePickerHeaderButton must be used within DatePickerRoot or RangePickerRoot',
      )
    return owner
  }
}

@Component({
  selector: 'button[datePickerHeaderLabel]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-header-label',
    type: 'button',
    '[attr.data-part]': 'part',
    '[attr.data-hovered]': "hovered ? 'true' : null",
    '[class]': 'className',
    '[style.display]': "visible() ? null : 'none'",
    '(mouseenter)': 'hovered = true',
    '(mouseleave)': 'hovered = false',
    '(click)': 'selectPanel($event)',
  },
  templateUrl: './date-picker-header-label.html',
})
export class DatePickerHeaderLabel {
  @Input({ required: true }) part!: DatePickerHeaderLabelPart
  hovered = false
  protected readonly className = buttonPrimitiveClassName(datePickerHeaderLabelClassName)

  constructor(
    private readonly calendar: CalendarRoot,
    @Optional() private readonly datePicker: DatePickerState | null,
    @Optional() private readonly rangePicker: RangePickerState | null,
  ) {}

  visible() {
    return getDatePickerHeaderLabelParts(
      this.owner().context().picker,
      this.calendar.state().panel,
    ).includes(this.part)
  }

  label() {
    if (this.part === 'month') return `${this.calendar.state().viewDate.month}月`
    const year = this.calendar.state().viewDate.year
    const decadeStart = Math.floor(year / 10) * 10
    return this.calendar.state().panel === 'decade'
      ? `${decadeStart}-${decadeStart + 9}年`
      : `${year}年`
  }

  selectPanel(event: Event) {
    if (event.defaultPrevented) return
    const nextPanel = getNextPanelByHeaderLabel(this.part)
    this.calendar.controller.setPanel(nextPanel)
  }

  private owner() {
    const owner = this.datePicker ?? this.rangePicker
    if (!owner)
      throw new Error('DatePickerHeaderLabel must be used within DatePickerRoot or RangePickerRoot')
    return owner
  }
}
