import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RadioButtonGroup, RadioGroup } from '@fex-design/angular/ui/radio'

@Component({
  selector: 'radio-basic-ui-example',
  standalone: true,
  imports: [RadioButtonGroup, RadioGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class RadioBasicExample {
  readonly options = [{ label: '苹果', value: 'apple' }, { label: '梨', value: 'pear' }] as const
}
