import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tooltip, TooltipTrigger } from '@fex-design/angular/ui/tooltip'
import { Button } from '@fex-design/angular/ui/button'

@Component({
  selector: 'tooltip-ui-css-variables-example',
  standalone: true,
  imports: [Tooltip, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class CssVariablesExample {
  readonly styles = {
    root: {
      '--tooltip-background': '#164e63',
      '--tooltip-foreground': '#ecfeff',
      '--tooltip-content-max-width': '180px',
      '--tooltip-motion-duration': '300ms',
    },
  }
}
