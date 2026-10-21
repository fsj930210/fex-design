import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CheckboxUiBasicExample as BasicExample } from './basic'

@Component({
  selector: 'checkbox-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
