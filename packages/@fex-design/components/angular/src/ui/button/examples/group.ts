import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button, ButtonGroup } from '@fex-design/angular/ui/button'

@Component({
  selector: 'button-group-ui-example',
  standalone: true,
  imports: [Button, ButtonGroup],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './group.html',
})
export class GroupExample {}
