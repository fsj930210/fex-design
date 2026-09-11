import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgComponentOutlet } from '@angular/common'
import { CheckIcon } from '@fex-design/angular/icon/check'
import { XIcon } from '@fex-design/angular/icon/x'
import { Switch } from '@fex-design/angular/ui/switch'
@Component({ selector: 'switch-content-example', standalone: true, imports: [Switch, NgComponentOutlet], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './content.html' })
export class SwitchContentExample {
  protected readonly checkIcon = CheckIcon
  protected readonly xIcon = XIcon
}
