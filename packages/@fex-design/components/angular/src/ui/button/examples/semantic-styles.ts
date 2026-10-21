import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'button-semantic-styles-example',
  standalone: true,
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class ButtonSemanticStylesExample {}
