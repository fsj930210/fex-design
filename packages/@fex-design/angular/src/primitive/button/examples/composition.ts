import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button, ButtonGroup, ButtonIcon } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'button-composition-example',
  standalone: true,
  imports: [Button, ButtonGroup, ButtonIcon, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './composition.html',
})
export class CompositionExample {}
