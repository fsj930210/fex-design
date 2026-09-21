import { ChangeDetectionStrategy, Component } from '@angular/core'
import { signal } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { Switch } from '@fex-design/angular/ui/switch'
@Component({
  selector: 'switch-controlled-ui-example',
  standalone: true,
  imports: [Switch, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class SwitchControlledExample {
  protected readonly roundedChecked = signal(false)
  protected readonly pillChecked = signal(false)
}
