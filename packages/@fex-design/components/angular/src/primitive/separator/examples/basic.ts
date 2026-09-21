import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
@Component({
  selector: 'separator-basic-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class Basic {}
