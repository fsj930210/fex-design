import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgComponentOutlet } from '@angular/common'
import { CheckIcon } from '@fex-design/angular/icons/check'
import { XIcon } from '@fex-design/angular/icons/x'
import { Switch } from '@fex-design/angular/ui/switch'
@Component({
  selector: 'switch-content-ui-example',
  standalone: true,
  imports: [Switch, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './content.html',
})
export class SwitchContentExample {
  protected readonly checkIcon = CheckIcon
  protected readonly xIcon = XIcon
}
