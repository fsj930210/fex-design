import { computed, input, ChangeDetectionStrategy, Component } from '@angular/core'
import { popoverDescriptionClassName } from '@fex-design/styles/popover'
import { cn } from '@fex/utils'

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
