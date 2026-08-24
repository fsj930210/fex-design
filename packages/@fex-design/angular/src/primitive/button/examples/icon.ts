import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'button-icon-example',
  standalone: true,
  imports: [Button, ButtonIcon, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.html',
})
export class IconExample {}
