import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Tooltip, TooltipTrigger } from '@fex-design/angular/ui/tooltip'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'tooltip-ui-controlled-example',
  standalone: true,
  imports: [Tooltip, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class ControlledExample {
  readonly open = signal(false)
}
