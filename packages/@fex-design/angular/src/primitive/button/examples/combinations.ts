import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

@Component({
  selector: 'button-composition-example',
  standalone: true,
  imports: [Button, ButtonIcon, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combinations.html',
})
export class CombinationsExample {
  protected readonly destructiveClassName = buttonClassName({
    variant: 'solid',
    color: 'danger',
    size: 'lg',
    effect: 'press',
  })
  protected readonly outlineClassName = buttonClassName({
    variant: 'outlined',
    effect: 'expand-icon',
  })
}
