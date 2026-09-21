import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@fex-design/angular/primitive/tooltip'
import { Button } from '@fex-design/angular/primitive/button'

@Component({
  selector: 'tooltip-color-example',
  standalone: true,
  imports: [Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './color.html',
})
export class ColorExample {
  readonly colors = [
    { label: '品牌蓝', value: '#1677ff' },
    { label: '紫色', value: '#722ed1' },
    { label: '暖红色', value: '#d4380d' },
  ]
}
