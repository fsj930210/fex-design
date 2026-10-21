import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DatePickerBasicExample as BasicExample } from './basic'

@Component({
  selector: 'date-picker-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
