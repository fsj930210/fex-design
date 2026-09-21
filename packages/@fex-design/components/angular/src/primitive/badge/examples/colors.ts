import { Badge, BadgeDot } from '@fex-design/angular/primitive/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-colors-example',
  standalone: true,
  imports: [Badge, BadgeDot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './colors.html',
})
export class Colors {}
