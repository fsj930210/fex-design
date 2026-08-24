import type { ButtonEffect, ButtonIconPlacement } from '@fex-design/core/button/types'
import { buttonIconClassName } from '@fex-design/styles/button'
import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'

@Component({
  selector: 'span[buttonIcon]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.data-icon]': "dataIcon() ?? 'inline-' + placement()",
  },
  templateUrl: './button-icon.html',
})
export class ButtonIcon {
  readonly element = inject<ElementRef<HTMLSpanElement>>(ElementRef).nativeElement
  readonly placement = input<ButtonIconPlacement>('start')
  readonly effect = input<ButtonEffect>()
  readonly dataIcon = input<string | undefined>(undefined, { alias: 'data-icon' })

  protected readonly hostClassName = createHostClassName(() =>
    buttonIconClassName({ placement: this.placement(), effect: this.effect() }),
  )
}
