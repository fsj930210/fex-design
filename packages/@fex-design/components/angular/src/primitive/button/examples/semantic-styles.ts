import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button, ButtonIcon } from '@fex-design/angular/primitive/button'
import { LoadingIcon } from '@fex-design/angular/icons/loading'
@Component({
  selector: 'button-semantic-styles-example',
  standalone: true,
  imports: [Button, ButtonIcon, LoadingIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class ButtonSemanticStylesExample {}
