import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { tooltipContentClassName } from '@fex-design/components-styles/tooltip'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { Tooltip } from './tooltip-root'
import { eventInfo } from './event-info'

@Component({
  selector: 'div[tooltipContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tooltip',
    'data-slot': 'tooltip-content',
    '[id]': 'tooltip.contentId',
    '[class]': 'hostClassName()',
    '[style.position]': "'var(--floating-strategy, absolute)'",
    '[style.left]': "'var(--floating-x, 0px)'",
    '[style.top]': "'var(--floating-y, 0px)'",
    '[style.display]': "tooltip.snapshot().mounted ? null : 'none'",
    '[style.transform-origin]': "'var(--floating-transform-origin)'",
    '[attr.data-state]': "tooltip.snapshot().open ? 'open' : 'closed'",
    '[attr.data-phase]': 'tooltip.snapshot().phase',
    '[attr.data-side]': 'tooltip.snapshot().side',
    '[attr.data-align]': 'tooltip.snapshot().align',
    '[attr.data-placement]': 'tooltip.snapshot().placement',
  },
  template: '<ng-content />',
})
export class TooltipContent implements AfterViewInit, OnDestroy {
  protected readonly tooltip = inject(Tooltip)
  protected readonly hostClassName = createHostClassName(tooltipContentClassName)
  private readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  @Input()
  set color(value: string | undefined) {
    if (value) this.element.style.setProperty('--tooltip-background', value)
    else this.element.style.removeProperty('--tooltip-background')
  }
  @HostListener('pointerenter', ['$event']) pointerEnter(event: Event) {
    if (event.defaultPrevented) return
    this.tooltip.overlay.content.pointerEnter(eventInfo(event))
  }
  @HostListener('pointerleave', ['$event']) pointerLeave(event: Event) {
    if (event.defaultPrevented) return
    this.tooltip.overlay.content.pointerLeave(eventInfo(event))
  }
  ngAfterViewInit() {
    this.tooltip.overlay.setFloatingElement(this.element)
  }
  ngOnDestroy() {
    this.tooltip.overlay.setFloatingElement(null)
  }
}
