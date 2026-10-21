import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SwitchBasicExample as BasicExample } from './basic'

@Component({
  selector: 'switch-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
