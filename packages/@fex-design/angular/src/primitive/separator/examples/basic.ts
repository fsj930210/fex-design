import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '../separator'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'fex-separator-basic-example',
  standalone: true,
  imports: [Separator, Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class Basic {}
