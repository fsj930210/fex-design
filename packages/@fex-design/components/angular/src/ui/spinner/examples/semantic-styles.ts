import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SpinnerContainer } from '@fex-design/angular/ui/spinner'

@Component({
  selector: 'spinner-semantic-styles-example',
  standalone: true,
  imports: [SpinnerContainer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SpinnerSemanticStylesExample {}
