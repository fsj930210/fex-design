import type {
  ButtonEffect,
  ButtonColor,
  ButtonIconPlacement,
  ButtonSize,
  ButtonVariant,
} from '@fex-design/core/button/types'
import { buttonClassName, buttonSpinnerClassName } from '@fex-design/components-styles/button'
import { cn } from '@fex-design/utils'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core'
import { LoadingIcon } from '@fex-design/angular/icons/loading'
import { ButtonIcon } from '@fex-design/angular/primitive/button/button-icon'
import { buttonPrimitiveClassName } from '@fex-design/angular/primitive/button'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

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
  size = input<ButtonSize>('md')
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

export { ButtonGroup } from '@fex-design/angular/primitive/button/button-group'

