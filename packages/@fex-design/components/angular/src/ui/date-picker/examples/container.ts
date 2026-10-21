import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { DatePicker } from '@fex-design/angular/ui/date-picker'
@Component({
  selector: 'date-picker-container-example',
  standalone: true,
  imports: [NgTemplateOutlet, DatePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './container.html',
})
export class DatePickerContainerExample {}
