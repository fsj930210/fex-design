import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'

@Component({
  selector: 'fex-separator-direction-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class Direction {}
