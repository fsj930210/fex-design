import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/angular/primitive/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'popover-css-variables-example',
  standalone: true,
  imports: [
    Popover,
    PopoverTrigger,
    PopoverPortal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverTitle,
    Button,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class PopoverCssVariablesExample {
  readonly demo = demo
  readonly rootStyle = demo.customVariables
}
