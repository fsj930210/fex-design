import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Checkbox } from '@fex-design/angular/ui/checkbox'

@Component({
  selector: 'checkbox-ui-custom-indicator-example',
  standalone: true,
  imports: [Checkbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-indicator.html',
})
export class CheckboxUiCustomIndicatorExample {}
