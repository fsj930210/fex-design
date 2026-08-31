import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

@Component({
  selector: 'button-icon-example',
  standalone: true,
  imports: [Button, ButtonIcon, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icons.html',
})
export class IconsExample {
  protected readonly defaultClassName = buttonClassName()
  protected readonly iconClassName = buttonClassName({ size: 'icon' })
}
