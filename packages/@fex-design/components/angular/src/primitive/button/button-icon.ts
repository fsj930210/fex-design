import { buttonIconClassName } from '@fex-design/components-styles/button'
import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

@Component({
  selector: 'span[buttonIcon]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.data-icon]': 'placement() === "end" ? "inline-end" : "inline-start"',
  },
  templateUrl: './button-icon.html',
})
export class ButtonIcon {
  readonly placement = input<'start' | 'end'>('start')
  readonly element = inject<ElementRef<HTMLSpanElement>>(ElementRef).nativeElement
  protected readonly hostClassName = createHostClassName(() => buttonIconClassName())
}
