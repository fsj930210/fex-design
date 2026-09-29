import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  type OnChanges,
  type OnDestroy,
} from '@angular/core'
import {
  createTooltip,
  type Tooltip as TooltipCore,
  type TooltipOptions,
} from '@fex-design/core/tooltip/create-tooltip'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'

let tooltipId = 0

@Component({
  selector: 'div[tooltipRoot], span[tooltipRoot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: '<ng-content />',
})
export class Tooltip implements OnChanges, OnDestroy {
  @Input() open?: boolean
  @Input() defaultOpen = false
  @Input() disabled?: boolean
  @Input() placement?: TooltipOptions['placement']
  @Input() side?: TooltipOptions['side']
  @Input() align?: TooltipOptions['align']
  @Input() sideOffset?: number
  @Input() alignOffset?: number
  @Input() avoidCollisions?: TooltipOptions['avoidCollisions']
  @Input() hoverOpenDelay?: number
  @Input() hoverCloseDelay?: number
  @Input() closeDelay?: number
  @Input() getPopupContainer?: TooltipOptions['getPopupContainer']
  @Output() openChange = new EventEmitter<boolean>()
  readonly contentId = `tooltip-${++tooltipId}`
  private localOpen = this.defaultOpen
  readonly overlay: TooltipCore = createTooltip(this.options())
  readonly snapshot = createCoreStoreSignal(this.overlay)
  private options(): TooltipOptions {
    return {
      open: this.open ?? this.localOpen,
      disabled: this.disabled,
      placement: this.placement,
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      avoidCollisions: this.avoidCollisions,
      hoverOpenDelay: this.hoverOpenDelay,
      hoverCloseDelay: this.hoverCloseDelay,
      closeDelay: this.closeDelay,
      getPopupContainer: this.getPopupContainer,
      onOpenChange: (open) => {
        if (this.open === undefined) {
          this.localOpen = open
          this.overlay?.setOptions(this.options())
        }
        this.openChange.emit(open)
      },
    }
  }
  ngOnChanges() {
    this.overlay.setOptions(this.options())
  }
  ngOnDestroy() {
    this.overlay.destroy()
  }
}
