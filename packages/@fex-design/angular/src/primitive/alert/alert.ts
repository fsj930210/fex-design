import type { AlertOptions } from '@fex-design/core/alert/types'
import {
  alertActionClassName,
  alertClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
} from '@fex-design/styles/alert'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'

@Component({
  selector: 'div[alert]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'alert', role: 'alert' },
  template: '<ng-content />',
})
export class Alert {
  readonly type = input<NonNullable<AlertOptions['type']>>('info')
  readonly variant = input<NonNullable<AlertOptions['variant']>>('filled')
  protected readonly hostClassName = createHostClassName(() =>
    alertClassName({ type: this.type(), variant: this.variant() }),
  )
}

@Component({
  selector: 'span[alertIcon]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'alert-icon' },
  template: '<ng-content />',
})
export class AlertIcon {
  protected readonly hostClassName = createHostClassName(alertIconClassName)
}

@Component({
  selector: 'div[alertTitle]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'alert-title',
  },
  template: '<ng-content />',
})
export class AlertTitle {
  protected readonly hostClassName = createHostClassName(alertTitleClassName)
}

@Component({
  selector: 'div[alertDescription]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'alert-description',
  },
  template: '<ng-content />',
})
export class AlertDescription {
  protected readonly hostClassName = createHostClassName(alertDescriptionClassName)
}

@Component({
  selector: 'div[alertAction]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'alert-action',
  },
  template: '<ng-content />',
})
export class AlertAction {
  protected readonly hostClassName = createHostClassName(alertActionClassName)
}
