import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Kbd, KbdGroup } from '@fex-design/angular/primitive/kbd'
@Component({
  selector: 'kbd-ui-direction-example',
  standalone: true,
  imports: [Kbd, KbdGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {}
