import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'fex-separator-vertical-example',
  standalone: true,
  imports: [Separator, Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vertical.html',
})
export class Vertical {}
