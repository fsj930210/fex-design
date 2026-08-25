import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { LoadingIcon } from '@fex-design/angular/icon/loading'
import { buttonSpinnerClassName } from '@fex-design/styles/button'

@Component({
  selector: 'button-primitive-loading-example',
  standalone: true,
  imports: [Button, ButtonIcon, LoadingIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading.html',
})
export class LoadingExample {
  protected readonly spinnerClassName = buttonSpinnerClassName
}
