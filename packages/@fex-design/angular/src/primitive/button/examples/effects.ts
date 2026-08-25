import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

const effectNames = [
  'expand-icon',
  'ring-hover',
  'shine-hover',
  'gooey-start',
  'gooey-end',
  'underline',
  'hover-underline',
  'press',
] as const

@Component({
  selector: 'button-primitive-effects-example',
  standalone: true,
  imports: [Button, ButtonIcon, PlusIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './effects.html',
})
export class EffectsExample {
  protected readonly effects = effectNames.map((effect) => ({
    effect,
    className: buttonClassName({ effect }),
  }))
}
