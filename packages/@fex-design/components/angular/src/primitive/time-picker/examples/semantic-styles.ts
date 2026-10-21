import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
} from '@fex-design/angular/primitive/time-picker'
@Component({
  selector: 'time-picker-semantic-styles-example',
  standalone: true,
  imports: [
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class TimePickerSemanticStylesExample {
  readonly classNames = {
    root: 'rounded-xl border-purple-500',
    input: 'font-semibold text-purple-950',
    popup: 'rounded-xl border-purple-300',
    panel: 'bg-purple-50',
    column: 'border-purple-200',
    item: 'rounded-md',
    selectedItem: '!bg-purple-200 !text-purple-950',
  }
  readonly styles = {
    root: 'border-color:#7c3aed;border-radius:12px;',
    input: 'color:#5b21b6;font-weight:600;',
    popup: 'border-color:#c4b5fd;border-radius:12px;',
    panel: 'background-color:#f5f3ff;',
    column: 'border-color:#ddd6fe;',
    item: {
      borderRadius: '6px',
    },
    selectedItem: {
      backgroundColor: '#ddd6fe',
      color: '#4c1d95',
    },
  }
}
