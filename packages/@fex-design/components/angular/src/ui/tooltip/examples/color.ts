import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tooltip, TooltipTrigger } from '@fex-design/angular/ui/tooltip'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'tooltip-ui-color-example',
  standalone: true,
  imports: [Tooltip, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './color.html',
})
export class ColorExample {}
