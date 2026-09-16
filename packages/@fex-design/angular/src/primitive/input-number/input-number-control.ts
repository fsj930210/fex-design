import { inputControlClassName } from '@fex-design/styles/input'
import { Directive, ElementRef, HostListener, inject } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
import { InputNumberRoot } from './input-number-root'

@Directive({
  selector: 'input[inputNumberControl]',
  standalone: true,
  host: {
    '[class]': 'hostClassName()',
    '[value]': 'root.inputNumber.draft()',
    '[disabled]': 'root.disabled()',
    '[readOnly]': 'root.readOnly()',
    type: 'text',
    inputmode: 'decimal',
    role: 'spinbutton',
    'data-slot': 'input-number-control',
    '[attr.aria-valuemin]': 'root.inputNumber.min()',
    '[attr.aria-valuemax]': 'root.inputNumber.max()',
    '[attr.aria-valuenow]': 'root.inputNumber.value()',
    '[attr.aria-valuetext]': 'root.inputNumber.formattedValue()',
  },
})
export class InputNumberControl {
  readonly root = inject(InputNumberRoot)
  readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement
  protected readonly hostClassName = createHostClassName(inputControlClassName)

  constructor() {
    this.root.setControl(this.element)
  }

  @HostListener('input', ['$event']) input(event: Event) {
    this.root.inputNumber.input((event.currentTarget as HTMLInputElement).value, event)
  }

  @HostListener('blur', ['$event']) blurEvent(event: FocusEvent) {
    this.root.inputNumber.blur(event)
  }

  @HostListener('keydown', ['$event']) keydown(event: KeyboardEvent) {
    this.root.inputNumber.keydown(event)
  }

  focus(options?: FocusOptions) {
    this.element.focus(options)
  }

  blur() {
    this.element.blur()
  }

  select() {
    this.element.select()
  }
}
