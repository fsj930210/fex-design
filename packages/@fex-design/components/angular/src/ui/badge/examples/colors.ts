import { Badge } from '@fex-design/angular/ui/badge'
import { BadgeDot } from '@fex-design/angular/primitive/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-ui-colors-example',
  standalone: true,
  imports: [Badge, BadgeDot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './colors.html',
})
export class Colors {}
