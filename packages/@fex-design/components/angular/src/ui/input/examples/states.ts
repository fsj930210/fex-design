import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Input } from '@fex-design/angular/ui/input'
@Component({
  selector: 'input-states-example',
  standalone: true,
  imports: [Input],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './states.html',
})
export class StatesExample {}
