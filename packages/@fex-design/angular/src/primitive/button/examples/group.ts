import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button, ButtonGroup } from '@fex-design/angular/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

@Component({
  selector: 'button-group-example',
  standalone: true,
  imports: [Button, ButtonGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './group.html',
})
export class GroupExample {
  protected readonly defaultClassName = buttonClassName()
}
