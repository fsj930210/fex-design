import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
@Component({
  selector: 'input-basic-example',
  standalone: true,
  imports: [Input],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic.html',
})
export class BasicExample {}
