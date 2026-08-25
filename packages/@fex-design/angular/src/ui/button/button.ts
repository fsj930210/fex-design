import type {
  ButtonEffect,
  ButtonColor,
  ButtonIconPlacement,
  ButtonSize,
  ButtonVariant,
} from '@fex-design/core/button/types'
import { buttonClassName, buttonSpinnerClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core'
import { LoadingIcon } from '../../icon/loading'
import { ButtonIcon } from '../../primitive/button/button-icon'
import { buttonPrimitiveClassName } from '../../primitive/button/button'
import { createHostClassName } from '../../signals/host-class'

@Component({
  selector: 'button[button]',
  standalone: true,
  imports: [ButtonIcon, LoadingIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-color]': 'color()',
    '[attr.data-size]': 'size()',
    '[attr.data-effect]': 'effect()',
    '[attr.data-loading]': "loading() ? 'true' : null",
    '[disabled]': 'disabledState()',
  },
  templateUrl: './button.template.html',
})
export class Button {
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement

  variant = input<ButtonVariant>('outlined')
  color = input<ButtonColor>()
  size = input<ButtonSize>('default')
  effect = input<ButtonEffect>()

  iconPlacement = input<ButtonIconPlacement>('start')
  loading = input(false, { transform: booleanAttribute })
  disabled = input(false, { transform: booleanAttribute })

  protected readonly spinnerClassName = buttonSpinnerClassName
  protected readonly disabledState = computed(() => this.disabled() || this.loading())

  protected readonly hostClassName = createHostClassName(() =>
    cn(
      buttonPrimitiveClassName(),
      buttonClassName({
        variant: this.variant(),
        color: this.color(),
        size: this.size(),
        effect: this.effect(),
      }),
    ),
  )
}

export { ButtonGroup } from '../../primitive/button/button-group'
