import { computed, input, ChangeDetectionStrategy, Component } from '@angular/core'
import { popoverDescriptionClassName } from '@fex-design/components-styles/popover'
import { cn } from '@fex-design/utils'

@Component({
  selector: 'div[popoverDescription]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'popover-description' },
  template: '<ng-content />',
})
export class PopoverDescription {
  readonly className = input('', { alias: 'class' })
  protected readonly hostClassName = computed(() =>
    cn(popoverDescriptionClassName, this.className()),
  )
}
