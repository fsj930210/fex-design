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
  selector: 'popover-triggers-example',
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
  templateUrl: './triggers.html',
})
export class TriggersExample {
  readonly cases = [
    { label: 'Hover 悬停', options: { trigger: ['hover'] } },
    { label: 'Focus 聚焦', options: { trigger: ['focus'] } },
    { label: 'Click 点击', options: { trigger: ['click'] } },
    { label: 'Context menu 右键', options: { trigger: ['context-menu'] } },
    { label: 'Hover + Focus', options: { trigger: ['hover', 'focus'] } },
    { label: 'Hover + Click', options: { trigger: ['hover', 'click'] } },
    { label: 'Focus + Click', options: { trigger: ['focus', 'click'] } },
    {
      label: '悬停延迟 300ms / 400ms',
      options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 },
    },
  ] satisfies DemoCase[]

  options(item: DemoCase): PopoverOptions {
    return item.options
  }
}
