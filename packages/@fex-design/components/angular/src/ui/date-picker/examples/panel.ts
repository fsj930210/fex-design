import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { DatePicker } from '@fex-design/angular/ui/date-picker'
@Component({
  selector: 'date-picker-panel-example',
  standalone: true,
  imports: [NgTemplateOutlet, DatePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panel.html',
})
export class DatePickerPanelExample {}
