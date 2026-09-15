import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChild,
} from '@angular/core'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover, PopoverTrigger } from '@fex-design/angular/ui/popover'
import { Button } from '@fex-design/angular/ui/button'

type DemoCase = { label: string; options: PopoverOptions }

@Component({
  selector: 'popover-controlled-example',
  standalone: true,
  imports: [Popover, PopoverTrigger, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controlled.html',
})
export class ControlledExample {
  readonly open = signal(false)
  readonly cases = computed<DemoCase[]>(() => [
    { label: '受控表单', options: { open: this.open() } },
    { label: '非受控：关闭保留草稿', options: {} },
    { label: '关闭销毁：重新填写', options: { destroyOnHidden: true } },
    { label: '提前挂载，关闭保留', options: { lazyMount: false } },
    { label: '提前挂载，关闭销毁', options: { lazyMount: false, destroyOnHidden: true } },
  ])

  changeOpen(item: DemoCase, value: boolean) {
    if (item.options.open !== undefined) this.open.set(value)
  }
  options(item: DemoCase): PopoverOptions {
    return item.options
  }
}
