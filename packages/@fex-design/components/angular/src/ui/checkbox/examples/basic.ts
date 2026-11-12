import { ChangeDetectionStrategy, Component, input, booleanAttribute } from '@angular/core'
import { Checkbox } from '@fex-design/angular/ui/checkbox'

@Component({
  selector: 'checkbox-ui-basic-example',
  standalone: true,
  imports: [Checkbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class CheckboxUiBasicExample {
  readonly invalid = input(false, { transform: booleanAttribute })
}
