import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Badge, BadgeDot } from '@fex-design/angular/primitive/badge'

@Component({
  selector: 'badge-basic-example',
  standalone: true,
  imports: [Badge, BadgeDot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}
