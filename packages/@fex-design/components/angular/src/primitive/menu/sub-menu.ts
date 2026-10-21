import { Component, ChangeDetectionStrategy, inject, input, effect, untracked } from '@angular/core'
import type { MenuBranch } from '@fex-design/core/menu/dom-types'
import type { MenuPopoverProps } from './popover-types'
import { MenuRoot } from './menu-root'
import { MENU_LEVEL } from './context'
@Component({
  selector: 'div[subMenu]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.display]': "'contents'" },
  template: '<ng-content />',
})
export class SubMenu {
  readonly value = input.required<string>()
  readonly popoverProps = input<MenuPopoverProps>()
  private readonly menu = inject(MenuRoot)
  readonly branch: MenuBranch = {
    value: () => this.value(),
    popoverProps: () => this.popoverProps(),
    parent: inject(MENU_LEVEL, { optional: true }) ?? undefined,
  }
  constructor() {
    // Signal inputs configure the external floating controller.
    effect(() => {
      this.value()
      this.popoverProps()
      untracked(() => this.menu.binding.dom.refresh())
    })
  }
}
