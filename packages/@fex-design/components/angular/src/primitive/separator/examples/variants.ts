import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '@fex-design/angular/primitive/separator'
@Component({
  selector: 'separator-variants-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './variants.html',
})
export class Variants {}
