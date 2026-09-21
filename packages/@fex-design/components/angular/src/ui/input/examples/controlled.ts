import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'input-controlled-example',
  standalone: true,
  imports: [Input, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class ControlledExample {
  protected readonly value = signal('受控内容')
}
