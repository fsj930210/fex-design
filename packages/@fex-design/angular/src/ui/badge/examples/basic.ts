import { Badge } from '@fex-design/angular/ui/badge'
import { BadgeDot } from '@fex-design/angular/primitive/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-ui-basic-example',
  standalone: true,
  imports: [Badge, BadgeDot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class Basic {}
