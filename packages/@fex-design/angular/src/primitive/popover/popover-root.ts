import { Directive, ElementRef, inject, input, output, signal } from '@angular/core'
import type { PopoverOptions, PopoverChangeInfo } from '@fex-design/core/popover/types'
import { createPopover } from './create-popover'

@Directive({ selector: 'div[popoverRoot], span[popoverRoot], ng-container[popoverRoot]', standalone: true, exportAs: 'popover' })
export class Popover {
  private readonly parent = inject(Popover, { optional: true, skipSelf: true })
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  readonly open = input<PopoverOptions['open']>()
  readonly defaultOpen = input<PopoverOptions['defaultOpen']>()
  readonly trigger = input<PopoverOptions['trigger']>()
  readonly disabled = input<PopoverOptions['disabled']>()
  readonly placement = input<PopoverOptions['placement']>()
  readonly side = input<PopoverOptions['side']>()
  readonly align = input<PopoverOptions['align']>()
  readonly sideOffset = input<PopoverOptions['sideOffset']>()
  readonly alignOffset = input<PopoverOptions['alignOffset']>()
  readonly strategy = input<PopoverOptions['strategy']>()
  readonly avoidCollisions = input<PopoverOptions['avoidCollisions']>()
  readonly collisionBoundary = input<PopoverOptions['collisionBoundary']>()
  readonly collisionPadding = input<PopoverOptions['collisionPadding']>()
  readonly arrow = input<PopoverOptions['arrow']>()
  readonly arrowPadding = input<PopoverOptions['arrowPadding']>()
  readonly matchReferenceWidth = input<PopoverOptions['matchReferenceWidth']>()
  readonly hideWhenDetached = input<PopoverOptions['hideWhenDetached']>()
  readonly zIndex = input<PopoverOptions['zIndex']>()
  readonly getPopupContainer = input<PopoverOptions['getPopupContainer']>()
  readonly hoverOpenDelay = input<PopoverOptions['hoverOpenDelay']>()
  readonly hoverCloseDelay = input<PopoverOptions['hoverCloseDelay']>()
  readonly closeDelay = input<PopoverOptions['closeDelay']>()
  readonly dismiss = input<PopoverOptions['dismiss']>()
  readonly lazyMount = input<PopoverOptions['lazyMount']>()
  readonly destroyOnHidden = input<PopoverOptions['destroyOnHidden']>()
  readonly openChange = output<boolean>()
  readonly openChangeInfo = output<PopoverChangeInfo>()
  private readonly binding = createPopover(() => this.options(), () => this.parent?.overlay)
  readonly snapshot = this.binding.snapshot
  get overlay() { return this.binding.overlay }
  get hoverAncestors() { return this.overlay.ancestors }
  referenceElement: HTMLElement | null = null
  contentElement: HTMLElement | null = null
  arrowElement: HTMLElement | null = null

  private readonly optionSource = signal<(() => PopoverOptions) | undefined>(undefined)

  /** Composite controls connect their own Core state without assigning signal inputs. */
  connectOptions(source: () => PopoverOptions) { this.optionSource.set(source) }

  options(): PopoverOptions {
    return {
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      trigger: this.trigger(),
      disabled: this.disabled(),
      placement: this.placement(),
      side: this.side(),
      align: this.align(),
      sideOffset: this.sideOffset(),
      alignOffset: this.alignOffset(),
      strategy: this.strategy(),
      avoidCollisions: this.avoidCollisions(),
      collisionBoundary: this.collisionBoundary(),
      collisionPadding: this.collisionPadding(),
      arrow: this.arrow(),
      arrowPadding: this.arrowPadding(),
      matchReferenceWidth: this.matchReferenceWidth(),
      hideWhenDetached: this.hideWhenDetached(),
      zIndex: this.zIndex(),
      getPopupContainer: this.getPopupContainer(),
      hoverOpenDelay: this.hoverOpenDelay(),
      hoverCloseDelay: this.hoverCloseDelay(),
      closeDelay: this.closeDelay(),
      dismiss: this.dismiss(),
      lazyMount: this.lazyMount(),
      destroyOnHidden: this.destroyOnHidden(),
      ...this.optionSource()?.(),
      onOpenChange: (open, info) => {
        this.openChange.emit(open)
        this.openChangeInfo.emit(info)
      },
    }
  }

  syncOptions() { this.overlay.setOptions(this.options()) }
}
