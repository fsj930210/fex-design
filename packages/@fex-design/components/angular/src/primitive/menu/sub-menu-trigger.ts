import {
  booleanAttribute,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  effect,
  inject,
  input,
  untracked,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { ChevronRightIcon } from '@fex-design/angular/icons/chevron'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuItemClassName, menuExpandIconClassName } from '@fex-design/components-styles/menu'
import { MenuRoot } from './menu-root'
import { SubMenu } from './sub-menu'
@Component({
  selector: 'button[subMenuTrigger]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChevronRightIcon],
  host: {
    '[class]': 'hostClass()',
    role: 'menuitem',
    type: 'button',
    'data-slot': 'submenu-trigger',
  },
  templateUrl: './sub-menu-trigger.html',
})
export class SubMenuTrigger implements AfterViewInit, OnDestroy {
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly textValue = input<string>()
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  private readonly menu = inject(MenuRoot)
  private readonly sub = inject(SubMenu)
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly indicatorClass = menuExpandIconClassName
  protected readonly hostClass = createHostClassName(
    () =>
      menuItemClassName({
        orientation:
          !this.sub.branch.parent && this.menu.binding.snapshot().layout === 'horizontal'
            ? 'horizontal'
            : 'vertical',
      }),
    this.className,
  )
  private stop?: () => void
  constructor() {
    // Input changes synchronize the registered DOM host.
    effect(() => {
      this.disabled()
      this.textValue()
      this.sub.value()
      untracked(() => this.menu.binding.dom.refresh())
    })
  }
  ngAfterViewInit() {
    this.stop = this.menu.binding.dom.bindItem(
      this.element,
      () => ({ value: this.sub.value(), disabled: this.disabled(), textValue: this.textValue() }),
      this.sub.branch.parent,
      this.sub.branch,
    )
  }
  ngOnDestroy() {
    this.stop?.()
  }
}
