import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Card } from '@fex-design/angular/ui/card'
@Component({
  selector: 'card-direction-example',
  standalone: true,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {
  protected readonly directions = ['ltr', 'rtl']
}
