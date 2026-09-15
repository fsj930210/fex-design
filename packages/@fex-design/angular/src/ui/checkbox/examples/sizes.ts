import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Checkbox } from '@fex-design/angular/ui/checkbox'

@Component({
  selector: 'checkbox-ui-sizes-example',
  standalone: true,
  imports: [Checkbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class CheckboxUiSizesExample {}
