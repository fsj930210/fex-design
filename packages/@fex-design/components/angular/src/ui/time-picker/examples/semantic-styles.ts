import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  TimePicker,
  type TimePickerClassNames,
  type TimePickerStyles,
} from '@fex-design/angular/ui/time-picker'
@Component({
  selector: 'time-picker-semantic-styles-example',
  standalone: true,
  imports: [TimePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class TimePickerSemanticStylesExample {
  readonly classNames: TimePickerClassNames = {
    root: 'rounded-xl border-purple-500',
    input: 'font-semibold text-purple-950',
    popup: 'rounded-xl border-purple-300',
    panel: 'bg-purple-50',
    column: 'border-purple-200',
    item: 'rounded-md',
    selectedItem: '!bg-purple-200 !text-purple-950',
  }
  readonly styles: TimePickerStyles<Record<string, string | number>> = {
    root: {
      borderColor: '#7c3aed',
      borderRadius: '12px',
    },
    input: {
      color: '#5b21b6',
      fontWeight: 600,
    },
    popup: {
      borderColor: '#c4b5fd',
      borderRadius: '12px',
    },
    panel: {
      backgroundColor: '#f5f3ff',
    },
    column: {
      borderColor: '#ddd6fe',
    },
    item: {
      borderRadius: '6px',
    },
    selectedItem: {
      backgroundColor: '#ddd6fe',
      color: '#4c1d95',
    },
  }
}
