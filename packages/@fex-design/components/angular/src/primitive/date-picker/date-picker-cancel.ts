import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'
import { listenNativeEvent } from '@fex-design/angular/directives/listen-native-event'
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core'
import { cn } from '@fex-design/utils'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { datePickerCancelClassName } from '@fex-design/components-styles/date-picker'
import { buttonPrimitiveClassName } from '@fex-design/angular/primitive/button'
import { getFooterOwner } from './date-picker-footer-owner'
@Component({
  selector: 'button[datePickerCancel]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'date-picker-cancel',
    type: 'button',
    '[class]': 'hostClassName()',
    '[disabled]': 'disabled()',
  },
  template: '<ng-content>取消</ng-content>',
})
export class DatePickerCancel {
  readonly class = input<string>()
  constructor() {
    listenNativeEvent('click', (event) => this.click(event))
  }
  readonly disabled = input(false, { transform: booleanAttribute })
  protected readonly hostClassName = createHostClassName(
    cn(buttonPrimitiveClassName(), datePickerCancelClassName),
    () => this.class(),
  )
  protected readonly owner = getFooterOwner()
  click(event: Event) {
    if (isPickerActionBlocked(event)) return
    this.owner.cancel()
  }
}
