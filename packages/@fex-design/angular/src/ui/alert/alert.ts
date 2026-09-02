import type { AlertClassNames, AlertOptions, AlertStyles } from '@fex-design/core/alert/types'
import { alertActionClassName, alertClassName, alertCloseClassName, alertContentClassName, alertDescriptionClassName, alertIconClassName, alertTitleClassName } from '@fex-design/styles/alert'
import { booleanAttribute, ChangeDetectionStrategy, Component, contentChild, Directive, input, output, signal } from '@angular/core'
import { CircleCheckIcon } from '../../icon/circle-check'
import { CircleErrorIcon } from '../../icon/circle-error'
import { CircleInfoIcon } from '../../icon/circle-info'
import { CircleWarningIcon } from '../../icon/circle-warning'
import { createHostClassName } from '../../signals/host-class'

@Directive({ selector: '[alertIcon]', standalone: true })
export class AlertIconContent {}
@Directive({ selector: '[alertTitle]', standalone: true })
export class AlertTitleContent {}
@Directive({ selector: '[alertAction]', standalone: true })
export class AlertActionContent {}
@Directive({ selector: '[alertCloseIcon]', standalone: true })
export class AlertCloseIconContent {}

@Component({
  selector: 'alert',
  standalone: true,
  imports: [CircleCheckIcon, CircleInfoIcon, CircleWarningIcon, CircleErrorIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[style]': 'styles().root',
    'data-slot': 'alert',
    role: 'alert',
  },
  templateUrl: './alert.html',
})
export class Alert {
  readonly type = input<NonNullable<AlertOptions['type']>>('info')
  readonly variant = input<NonNullable<AlertOptions['variant']>>('filled')
  readonly title = input<string>()
  readonly description = input<string>()
  readonly showIcon = input(false, { transform: booleanAttribute })
  readonly closable = input(false, { transform: booleanAttribute })
  readonly classNames = input<AlertClassNames>({})
  readonly styles = input<AlertStyles<string>>({})
  readonly close = output<MouseEvent>()
  protected readonly projectedIcon = contentChild(AlertIconContent)
  protected readonly projectedTitle = contentChild(AlertTitleContent)
  protected readonly projectedAction = contentChild(AlertActionContent)
  protected readonly projectedCloseIcon = contentChild(AlertCloseIconContent)
  protected readonly visible = signal(true)
  protected readonly hostClassName = createHostClassName(() =>
    this.visible()
      ? `${alertClassName({ type: this.type(), variant: this.variant() })} ${this.classNames().root ?? ''}`
      : 'hidden',
  )
  protected readonly alertIconClassName = alertIconClassName
  protected readonly alertContentClassName = alertContentClassName
  protected readonly alertTitleClassName = alertTitleClassName
  protected readonly alertDescriptionClassName = alertDescriptionClassName
  protected readonly alertActionClassName = alertActionClassName
  protected readonly alertCloseClassName = alertCloseClassName
  protected closeAlert(event: MouseEvent) {
    this.close.emit(event)
    if (!event.defaultPrevented) this.visible.set(false)
  }
}
