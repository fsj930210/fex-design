import { BadgeDot } from '@fex-design/angular/primitive/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-dot-example',
  standalone: true,
  imports: [BadgeDot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dot.html',
})
export class Dot {}
