import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
@Component({
  selector: 'input-variants-example',
  standalone: true,
  imports: [Input],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './variants.html',
})
export class VariantsExample {}
