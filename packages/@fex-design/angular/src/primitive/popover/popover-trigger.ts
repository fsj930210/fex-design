import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { Popover } from './popover-root'
import { eventInfo } from './event-info'

@Directive({
  selector:
    'button[popoverTrigger], input[popoverTrigger], div[popoverTrigger], span[popoverTrigger]',
  standalone: true,
  host: {
    '[attr.type]':
      "element.tagName === 'BUTTON' ? element.getAttribute('type') ?? 'button' : element.getAttribute('type')",
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'popover.snapshot().open',
    '[attr.data-state]': "popover.snapshot().open ? 'open' : 'closed'",
  },
})
export class PopoverTrigger implements AfterViewInit, OnDestroy {
  protected readonly popover = inject(Popover)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)

  readonly element = this.elementRef.nativeElement

  ngOnDestroy() {
    if (this.popover.referenceElement === this.element) {
      this.popover.referenceElement = null
      this.popover.overlay.setReferenceElement(null)
    }
  }

  ngAfterViewInit() {
    // View 初始化后才能拿到真实 button DOM，并注册给 floating 作为 reference。
    this.popover.referenceElement = this.elementRef.nativeElement
    this.popover.overlay.setReferenceElement(this.elementRef.nativeElement)
  }

  @HostListener('click', ['$event'])
  click(event: Event) {
    if (event.defaultPrevented) return
    this.popover.syncOptions()
    this.popover.overlay.trigger.click(eventInfo(event))
  }

  @HostListener('pointerenter', ['$event'])
  pointerEnter(event: Event) {
    if (event.defaultPrevented) return
    this.popover.overlay.trigger.pointerEnter(eventInfo(event))
  }

  @HostListener('pointerleave', ['$event'])
  pointerLeave(event: Event) {
    if (event.defaultPrevented) return
    this.popover.overlay.trigger.pointerLeave(eventInfo(event))
  }

  @HostListener('focus', ['$event'])
  focus(event: Event) {
    if (event.defaultPrevented) return
    this.popover.overlay.trigger.focus(eventInfo(event))
  }

  @HostListener('blur', ['$event'])
  blur(event: Event) {
    if (event.defaultPrevented) return
    this.popover.overlay.trigger.blur(eventInfo(event))
  }

  @HostListener('contextmenu', ['$event'])
  contextMenu(event: Event) {
    if (event.defaultPrevented) return
    this.popover.overlay.trigger.contextMenu(eventInfo(event))
  }
}
