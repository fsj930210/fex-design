import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { Tooltip } from './tooltip-root'
import { eventInfo } from './event-info'

@Directive({
  selector:
    'button[tooltipTrigger], input[tooltipTrigger], div[tooltipTrigger], span[tooltipTrigger]',
  standalone: true,
  host: {
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.data-state]': "tooltip.snapshot().open ? 'open' : 'closed'",
  },
})
export class TooltipTrigger implements AfterViewInit, OnDestroy {
  protected readonly tooltip = inject(Tooltip)
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly originalDescribedBy = this.element.getAttribute('aria-describedby')
  protected describedBy() {
    if (!this.tooltip.snapshot().mounted) return this.originalDescribedBy
    return [this.originalDescribedBy, this.tooltip.contentId].filter(Boolean).join(' ')
  }
  ngAfterViewInit() {
    this.tooltip.overlay.setReferenceElement(this.element)
  }
  ngOnDestroy() {
    this.tooltip.overlay.setReferenceElement(null)
  }
  @HostListener('pointerenter', ['$event']) pointerEnter(event: Event) {
    if (event.defaultPrevented) return
    this.tooltip.overlay.trigger.pointerEnter(eventInfo(event))
  }
  @HostListener('pointerleave', ['$event']) pointerLeave(event: Event) {
    if (event.defaultPrevented) return
    this.tooltip.overlay.trigger.pointerLeave(eventInfo(event))
  }
  @HostListener('focus', ['$event']) focus(event: Event) {
    if (event.defaultPrevented) return
    this.tooltip.overlay.trigger.focus(eventInfo(event))
  }
  @HostListener('blur', ['$event']) blur(event: Event) {
    if (event.defaultPrevented) return
    this.tooltip.overlay.trigger.blur(eventInfo(event))
  }
}
