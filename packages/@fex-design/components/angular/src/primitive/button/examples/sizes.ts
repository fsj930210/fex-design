import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { PlusIcon } from '@fex-design/angular/icons/plus'
import { buttonClassName } from '@fex-design/components-styles/button'

const sizeNames = [
  'sm',
  'md',
  'lg',

  'icon-sm',
  'icon-md',
  'icon-lg',
] as const

@Component({
  selector: 'button-primitive-sizes-example',
  standalone: true,
  imports: [Button, ButtonIcon, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sizes.html',
})
export class SizesExample {
  protected readonly sizes = sizeNames.map((size) => ({
    size,
    className: buttonClassName({ size }),
  }))
}
