import { ChangeDetectionStrategy, Component, input, booleanAttribute } from '@angular/core'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/angular/primitive/date-picker'
@Component({
  selector: 'date-picker-basic-example',
  standalone: true,
  imports: [
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class DatePickerBasicExample {
  readonly invalid = input(false, { transform: booleanAttribute })
}
