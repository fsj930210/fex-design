import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BasicExample } from './basic'

@Component({
  selector: 'input-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
