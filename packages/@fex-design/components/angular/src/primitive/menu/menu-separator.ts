import { Component, ChangeDetectionStrategy, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuSeparatorClassName } from '@fex-design/components-styles/menu'
@Component({
  selector: 'div[menuSeparator]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClass()', role: 'separator', 'data-slot': 'menu-separator' },
  template: '<ng-content />',
})
export class MenuSeparator {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  protected readonly hostClass = createHostClassName(menuSeparatorClassName, this.className)
}
