import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TimePickerBasicExample as BasicExample } from './basic'

@Component({
  selector: 'time-picker-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
