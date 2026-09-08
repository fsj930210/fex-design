import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Input, InputGroup } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'input-group-example',
  standalone: true,
  imports: [Input, InputGroup, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './group.html',
})
export class GroupExample {}
