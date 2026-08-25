import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button, ButtonGroup } from '@fex-design/angular/ui/button'

@Component({
  selector: 'button-direction-example',
  standalone: true,
  imports: [Button, ButtonGroup, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './direction.html',
})
export class DirectionExample {}
