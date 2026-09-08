import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
import { InputControl, InputRoot } from '@fex-design/angular/primitive/input'
@Component({
  selector: 'input-primitive-focus-example',
  standalone: true,
  imports: [InputRoot, InputControl, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './focus.html',
})
export class FocusExample {
  readonly control = viewChild.required(InputControl)
  focus() {
    this.control().focus()
  }
  blur() {
    this.control().blur()
  }
  select() {
    this.control().select()
  }
}
