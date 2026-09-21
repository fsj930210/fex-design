import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'input-focus-example',
  standalone: true,
  imports: [Input, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './focus.html',
})
export class FocusExample {
  protected readonly control = viewChild.required<Input>('inputRef')
}
