import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePicker } from '@fex-design/angular/ui/time-picker'

@Component({ selector: 'time-picker-format-example', standalone: true, imports: [TimePicker], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './format.html' })
export class TimePickerFormatExample {
  readonly formats = [
  { format: 'HH:mm:ss', use12Hours: false, label: '时、分、秒：3 列', stepped: false },
  { format: 'HH:mm', use12Hours: false, label: '时、分：2 列', stepped: false },
  { format: 'mm:ss', use12Hours: false, label: '分、秒：2 列', stepped: false },
  { format: 'HH', use12Hours: false, label: '仅小时：1 列', stepped: false },
  { format: 'hh:mm A', use12Hours: true, label: '12 小时：时、分、时段，共 3 列', stepped: false },
  { format: 'hh:mm:ss A', use12Hours: true, label: '12 小时：4 列，时/分/秒步长为 2/5/10', stepped: true },
]
}
