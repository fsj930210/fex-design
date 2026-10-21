import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
} from '@fex-design/angular/primitive/tooltip'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'tooltip-semantic-styles-example',
  standalone: true,
  imports: [Tooltip, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class TooltipSemanticStylesExample {}
