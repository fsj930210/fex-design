import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
@Component({
  selector: 'separator-vertical-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vertical.html',
})
export class Vertical {}
