import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectBasicExample as BasicExample } from './basic'

@Component({
  selector: 'select-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
