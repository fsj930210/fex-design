import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'fex-separator-menu-example',
  standalone: true,
  imports: [Separator, Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.html',
})
export class Menu {}
