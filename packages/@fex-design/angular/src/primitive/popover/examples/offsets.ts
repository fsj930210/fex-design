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
  selector: 'popover-offsets-example',
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
  templateUrl: './offsets.html',
})
export class OffsetsExample {
  readonly sideOffset = signal(12)
  readonly alignOffset = signal(0)
  readonly cases = computed<DemoCase[]>(() =>
    (['start', 'center', 'end'] as const).map((align) => ({
      label: align,
      options: {
        side: 'bottom',
        align,
        arrow: true,
        avoidCollisions: false,
        sideOffset: this.sideOffset(),
        alignOffset: this.alignOffset(),
      },
    })),
  )

  options(item: DemoCase): PopoverOptions {
    return item.options
  }
}
