import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
@Component({
  selector: 'input-sizes-example',
  standalone: true,
  imports: [Input],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class SizesExample {}
