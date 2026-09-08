import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InputControl, InputGroup, InputRoot } from '@fex-design/angular/primitive/input'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'input-primitive-group-example',
  standalone: true,
  imports: [InputRoot, InputControl, InputGroup, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './group.html',
})
export class GroupExample {}
