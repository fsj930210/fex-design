import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Popover, PopoverTrigger } from '@fex-design/angular/ui/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'popover-css-variables-example',
  standalone: true,
  imports: [Popover, PopoverTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class PopoverCssVariablesExample {
  readonly demo = demo
  readonly rootStyle = demo.customVariables
}
