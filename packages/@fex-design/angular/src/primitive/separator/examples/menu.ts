import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
@Component({
  selector: 'separator-menu-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.html',
})
export class Menu {}
