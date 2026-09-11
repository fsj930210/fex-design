import { computed, input, ChangeDetectionStrategy, Component } from '@angular/core'
import { popoverTitleClassName } from '@fex-design/styles/popover'
import { cn } from '@fex/utils'

@Component({
  selector: 'div[popoverTitle]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'popover-title' },
  template: '<ng-content />',
})
export class PopoverTitle {
  readonly className = input('', { alias: 'class' })
  protected readonly hostClassName = computed(() => cn(popoverTitleClassName, this.className()))
}

