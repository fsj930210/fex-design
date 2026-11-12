import { Badge } from '@fex-design/angular/ui/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-ui-basic-example',
  standalone: true,
  imports: [Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class Basic {}
