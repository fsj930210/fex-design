import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  DestroyRef,
  ElementRef,
  EventEmitter,
  effect,
  HostListener,
  Input,
  Output,
  TemplateRef,
  untracked,
  ViewContainerRef,
  inject,
  input,
  type AfterViewInit,
  type EmbeddedViewRef,
  type OnChanges,
  type OnDestroy,
} from '@angular/core'
import {
  createTooltip,
  getTooltipArrowPosition,
  type Tooltip as TooltipCore,
  type TooltipOptions,
} from '@fex-design/core/tooltip/create-tooltip'
import { tooltipArrowClassName, tooltipContentClassName } from '@fex-design/components-styles/tooltip'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

let tooltipId = 0
const eventInfo = (event: Event) => ({
  target: event.target,
  currentTarget: event.currentTarget,
  event,
})

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

@Directive({ selector: 'ng-template[tooltipPortal]', standalone: true })
export class TooltipPortal {
  readonly container = input<HTMLElement | null>()
  private readonly tooltip = inject(Tooltip)
  private readonly template = inject(TemplateRef<unknown>)
  private readonly views = inject(ViewContainerRef)
  private view: EmbeddedViewRef<unknown> | undefined
  constructor() {
    effect(() => {
      const mounted = this.tooltip.snapshot().mounted
      untracked(() => {
        if (!mounted) {
          this.views.clear()
          this.view = undefined
          return
        }
        if (!this.view) this.view = this.views.createEmbeddedView(this.template)
        const target = this.container() ?? this.tooltip.overlay.resolvePopupContainer()
        if (target)
          for (const node of this.view.rootNodes)
            if (node.parentNode !== target) target.appendChild(node)
      })
    })
    inject(DestroyRef).onDestroy(() => this.views.clear())
  }
}

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
