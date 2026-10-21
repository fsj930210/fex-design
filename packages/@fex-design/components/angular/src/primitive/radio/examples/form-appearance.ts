import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RadioBasicExample as BasicExample } from './basic'

@Component({
  selector: 'radio-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
