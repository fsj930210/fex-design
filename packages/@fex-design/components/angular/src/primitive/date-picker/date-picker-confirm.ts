import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { datePickerConfirmClassName } from '@fex-design/components-styles/date-picker'
import { buttonClassName } from '@fex-design/components-styles/button'
import { getFooterOwner } from './date-picker-footer-owner'
@Component({
  selector: 'button[datePickerConfirm]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-confirm',
    type: 'button',
    '[class]': 'hostClassName()',
    '[disabled]': 'disabled() || !owner.context().canConfirm',
  },
  template: '<ng-content>确定</ng-content>',
})
export class DatePickerConfirm {
  readonly class = input<string>()
  constructor() {
    listenNativeEvent('click', (event) => this.click(event))
  }
  readonly disabled = input(false, { transform: booleanAttribute })
  protected readonly hostClassName = createHostClassName(
    cn(buttonClassName({ variant: 'solid', color: 'primary' }), datePickerConfirmClassName),
    () => this.class(),
  )
  protected readonly owner = getFooterOwner()
  click(event: Event) {
    if (isPickerActionBlocked(event)) return
    this.owner.confirm()
  }
}
