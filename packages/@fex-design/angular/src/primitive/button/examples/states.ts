import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

@Component({
  selector: 'button-native-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './states.html',
})
export class StatesExample {
  protected readonly defaultClassName = buttonClassName()
}



