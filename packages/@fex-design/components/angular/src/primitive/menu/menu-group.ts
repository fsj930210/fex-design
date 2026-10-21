import { Component, ChangeDetectionStrategy, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuGroupClassName } from '@fex-design/components-styles/menu'
@Component({
  selector: 'div[menuGroup]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClass()', role: 'group', 'data-slot': 'menu-group' },
  template: '<ng-content />',
})
export class MenuGroup {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  protected readonly hostClass = createHostClassName(menuGroupClassName, this.className)
}
