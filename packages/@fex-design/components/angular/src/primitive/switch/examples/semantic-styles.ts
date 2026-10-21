import { Spinner } from '@fex-design/angular/primitive/spinner'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/angular/primitive/switch'
@Component({
  selector: 'switch-semantic-styles-example',
  standalone: true,
  imports: [Spinner, SwitchRoot, SwitchContent, SwitchThumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SwitchSemanticStylesExample {}
