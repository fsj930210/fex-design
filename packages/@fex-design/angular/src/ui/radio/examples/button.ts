import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RadioButtonGroup } from '@fex-design/angular/ui/radio'

@Component({
  selector: 'radio-button-ui-example',
  standalone: true,
  imports: [RadioButtonGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
})
export class RadioButtonExample {
  readonly options = [{ label: '苹果', value: 'apple' }, { label: '梨', value: 'pear' }] as const
}
