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
  selector: 'popover-container-example',
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
  templateUrl: './container.html',
})
export class ContainerExample {
  readonly container = viewChild<ElementRef<HTMLDivElement>>('container')
  readonly cases = [
    { label: '挂载到 body', options: {} },
    {
      label: '在框内打开浮层',
      options: {
        getPopupContainer: () => this.container()?.nativeElement ?? document.body,
      },
    },
  ] satisfies DemoCase[]

  options(item: DemoCase): PopoverOptions {
    return item.options
  }
}
