import { computed, input, ChangeDetectionStrategy, Component } from '@angular/core'
import { popoverHeaderClassName } from '@fex-design/styles/popover'
import { cn } from '@fex/utils'

@Component({
  selector: 'div[popoverHeader]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'popover-header' },
  template: '<ng-content />',
})
export class PopoverHeader {
  readonly className = input('', { alias: 'class' })
  protected readonly hostClassName = computed(() => cn(popoverHeaderClassName, this.className()))
}
