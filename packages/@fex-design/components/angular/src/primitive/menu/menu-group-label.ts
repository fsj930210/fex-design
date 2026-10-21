import { Component, ChangeDetectionStrategy, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuGroupLabelClassName } from '@fex-design/components-styles/menu'
@Component({
  selector: 'div[menuGroupLabel]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClass()', 'data-slot': 'menu-group-label' },
  template: '<ng-content />',
})
export class MenuGroupLabel {
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  protected readonly hostClass = createHostClassName(menuGroupLabelClassName, this.className)
}
