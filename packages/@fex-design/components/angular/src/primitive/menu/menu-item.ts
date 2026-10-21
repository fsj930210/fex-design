import {
  booleanAttribute,
  Directive,
  ElementRef,
  effect,
  inject,
  input,
  untracked,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuItemClassName } from '@fex-design/components-styles/menu'
import { MenuRoot } from './menu-root'
import { MENU_LEVEL } from './context'
@Directive({
  selector: 'button[menuItem],a[menuItem]',
  standalone: true,
  host: { '[class]': 'hostClass()', role: 'menuitem', 'data-slot': 'menu-item' },
})
export class MenuItem implements AfterViewInit, OnDestroy {
  readonly value = input.required<string>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly textValue = input<string>()
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  private readonly menu = inject(MenuRoot)
  private readonly parent = inject(MENU_LEVEL, { optional: true }) ?? undefined
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  private stop?: () => void
  protected readonly hostClass = createHostClassName(
    () =>
      menuItemClassName({
        orientation:
          !this.parent && this.menu.binding.snapshot().layout === 'horizontal'
            ? 'horizontal'
            : 'vertical',
      }),
    this.className,
  )
  constructor() {
    // Input changes update the registered host, not another local state copy.
    effect(() => {
      this.value()
      this.disabled()
      this.textValue()
      untracked(() => this.menu.binding.dom.refresh())
    })
  }
  ngAfterViewInit() {
    this.stop = this.menu.binding.dom.bindItem(
      this.element,
      () => ({ value: this.value(), disabled: this.disabled(), textValue: this.textValue() }),
      this.parent,
    )
  }
  ngOnDestroy() {
    this.stop?.()
  }
}
