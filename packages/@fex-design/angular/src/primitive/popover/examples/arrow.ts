import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChild,
} from '@angular/core'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/angular/primitive/popover'
import { Button } from '@fex-design/angular/ui/button'

type DemoCase = { label: string; options: PopoverOptions }

@Component({
  selector: 'popover-arrow-example',
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
  templateUrl: './arrow.html',
})
export class ArrowExample {
  readonly cases = [
    { label: '不显示箭头', options: { arrow: false, placement: 'bottomLeft' } },
    { label: '箭头距面板边缘 16px', options: { arrow: true, placement: 'bottomLeft' } },
    {
      label: '箭头距面板边缘 28px',
      options: { arrow: true, arrowPadding: 28, placement: 'bottomLeft' },
    },
  ] satisfies DemoCase[]

  options(item: DemoCase): PopoverOptions {
    return item.options
  }
}
