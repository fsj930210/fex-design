import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { getTooltipArrowPosition } from '@fex-design/core/tooltip/create-tooltip'
import { tooltipArrowClassName } from '@fex-design/components-styles/tooltip'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { Tooltip } from './tooltip-root'

@Component({
  selector: 'div[tooltipArrow]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'tooltip-arrow',
    '[class]': 'hostClassName()',
    '[attr.data-side]': 'tooltip.snapshot().side',
    '[attr.data-align]': 'tooltip.snapshot().align',
    '[style.left]': 'arrowPosition().left ?? null',
    '[style.top]': 'arrowPosition().top ?? null',
  },
  template: '',
})
export class TooltipArrow implements AfterViewInit, OnDestroy {
  protected readonly tooltip = inject(Tooltip)
  protected readonly hostClassName = createHostClassName(tooltipArrowClassName)
  private readonly element = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement
  protected arrowPosition() {
    return getTooltipArrowPosition(this.tooltip.snapshot().side, this.tooltip.snapshot().align)
  }
  ngAfterViewInit() {
    this.tooltip.overlay.setArrowElement(this.element)
  }
  ngOnDestroy() {
    this.tooltip.overlay.setArrowElement(null)
  }
}
