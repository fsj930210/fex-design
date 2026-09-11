import { ChangeDetectionStrategy, Component } from '@angular/core'
import { signal } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { SwitchRoot, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({ selector: 'switch-controlled-example', standalone: true, imports: [SwitchRoot, SwitchThumb, Button], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './controlled.html' })
export class SwitchControlledExample {
  protected readonly roundedChecked = signal(false)
  protected readonly pillChecked = signal(false)
}
