import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SliderBasicExample as BasicExample } from './basic'

@Component({
  selector: 'slider-form-appearance-example',
  standalone: true,
  imports: [BasicExample],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-appearance.html',
})
export class FormAppearanceExample {}
