import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'

@Component({
  selector: 'input-validation-example',
  standalone: true,
  imports: [Input],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './validation.html',
})
export class ValidationExample {}
