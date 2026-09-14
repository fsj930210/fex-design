import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Radio, RadioButton, RadioGroup } from '@fex-design/angular/ui/radio'

@Component({
  selector: 'radio-semantic-styles-ui-example',
  standalone: true,
  imports: [Radio, RadioButton, RadioGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class RadioSemanticStylesExample {
  readonly classNames = { root: 'gap-3', control: 'ring-2 ring-orange-300 [--radio-checked-color:var(--success)]', label: 'font-bold text-violet-700' }
}
