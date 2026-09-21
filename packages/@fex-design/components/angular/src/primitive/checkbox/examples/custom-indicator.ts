import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/angular/primitive/checkbox'

@Component({
  selector: 'checkbox-primitive-custom-indicator-example',
  standalone: true,
  imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-indicator.html',
})
export class CheckboxPrimitiveCustomIndicatorExample {}
