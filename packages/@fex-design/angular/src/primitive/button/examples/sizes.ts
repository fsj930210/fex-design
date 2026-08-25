import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { buttonClassName } from '@fex-design/styles/button'

const sizeNames = [
  'xs',
  'sm',
  'default',
  'lg',
  'xl',
  'icon-xs',
  'icon-sm',
  'icon',
  'icon-lg',
  'icon-xl',
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
