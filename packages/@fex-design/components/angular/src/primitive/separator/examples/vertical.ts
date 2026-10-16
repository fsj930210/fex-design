import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '@fex-design/angular/primitive/separator'
@Component({
  selector: 'separator-vertical-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vertical.html',
})
export class Vertical {}
