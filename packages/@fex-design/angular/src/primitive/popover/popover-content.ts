import {
  computed,
  input,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { popoverContentClassName } from '@fex-design/styles/popover'
import { cn } from '@fex/utils'
import { Popover } from './popover-root'
import { eventInfo } from './event-info'

@Component({
  selector: 'div[popoverContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'dialog',
    tabindex: '-1',
    'data-slot': 'popover-content',
    '[class]': 'hostClassName()',
    '[style.position]': "'var(--floating-strategy, absolute)'",
    '[style.left]': "'var(--floating-x, 0px)'",
    '[style.top]': "'var(--floating-y, 0px)'",
    '[hidden]': "popover.snapshot().phase === 'closed'",
    '[attr.inert]': 'popover.snapshot().open ? null : ""',
    '[style.transform-origin]': "'var(--floating-transform-origin)'",
    '[attr.data-state]': "popover.snapshot().open ? 'open' : 'closed'",
    '[attr.data-phase]': 'popover.snapshot().phase',
    '[attr.data-side]': 'popover.snapshot().side',
    '[attr.data-align]': 'popover.snapshot().align',
    '[attr.data-placement]': 'popover.snapshot().placement',
  },
  template: '<ng-content />',
})
export class PopoverContent implements AfterViewInit, OnDestroy {
  protected readonly popover = inject(Popover)
  private readonly elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef)
  readonly element = this.elementRef.nativeElement
  readonly className = input('', { alias: 'class' })
  protected readonly hostClassName = computed(() => cn(popoverContentClassName(), this.className()))

  @HostListener('pointerenter', ['$event'])
  pointerEnter(event: Event) {
    if (event.defaultPrevented) return
    const info = eventInfo(event)
    this.popover.overlay.content.pointerEnter(info)
  }

  @HostListener('pointerleave', ['$event'])
  pointerLeave(event: Event) {
    if (event.defaultPrevented) return
    const info = eventInfo(event)
    this.popover.overlay.content.pointerLeave(info)
  }

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement
    this.popover.contentElement = element
    this.popover.overlay.setFloatingElement(element)
  }

  ngOnDestroy() {
    if (this.popover.contentElement === this.elementRef.nativeElement) {
      this.popover.contentElement = null
    }
    this.popover.overlay.setFloatingElement(null)
  }
}
