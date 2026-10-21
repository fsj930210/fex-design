import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/angular/primitive/date-picker'
@Component({
  selector: 'date-picker-container-example',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './container.html',
})
export class DatePickerContainerExample {}
