import {
  computed,
  input,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { popoverArrowClassName } from '@fex-design/styles/popover'
import { cn } from '@fex/utils'
import { Popover } from './popover-root'

@Component({
  selector: 'div[popoverArrow]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'popover-arrow',
    '[hidden]': '!popover.snapshot().arrow',
    '[class]': 'hostClassName()',
    '[style.left]':
      "popover.snapshot().side === 'left' || popover.snapshot().side === 'right' ? null : 'var(--floating-arrow-x, 0px)'",
    '[style.top]':
      "popover.snapshot().side === 'left' || popover.snapshot().side === 'right' ? 'var(--floating-arrow-y, 0px)' : null",
    '[attr.data-side]': 'popover.snapshot().side',
  },
  template: '',
})
export class PopoverArrow implements AfterViewInit, OnDestroy {
  protected readonly popover = inject(Popover)
  private readonly elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef)
  readonly className = input('', { alias: 'class' })
  protected readonly hostClassName = computed(() => cn(popoverArrowClassName, this.className()))

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement
    // arrow 是 Floating UI arrow middleware 的输入，注册后 core 会写入箭头坐标。
    this.popover.arrowElement = element
    this.popover.overlay.setArrowElement(element)
  }

  ngOnDestroy() {
    if (this.popover.arrowElement === this.elementRef.nativeElement) {
      this.popover.arrowElement = null
    }
    this.popover.overlay.setArrowElement(null)
  }
}
