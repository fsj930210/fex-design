import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RadioGroup, Radio, RadioButton } from '@fex-design/angular/primitive/radio'
@Component({
  selector: 'radio-semantic-styles-example',
  standalone: true,
  imports: [RadioGroup, Radio, RadioButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class RadioSemanticStylesExample {}
