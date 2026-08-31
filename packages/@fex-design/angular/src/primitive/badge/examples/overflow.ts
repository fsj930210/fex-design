import { Badge } from '@fex-design/angular/primitive/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-overflow-example',
  standalone: true,
  imports: [Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overflow.html',
})
export class Overflow {}
