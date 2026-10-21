import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  CheckboxRoot,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
} from '@fex-design/angular/primitive/checkbox'
@Component({
  selector: 'checkbox-semantic-styles-example',
  standalone: true,
  imports: [CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class CheckboxSemanticStylesExample {}
