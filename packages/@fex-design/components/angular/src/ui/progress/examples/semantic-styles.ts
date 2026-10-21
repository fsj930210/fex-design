import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Progress } from '@fex-design/angular/ui/progress'

@Component({
  selector: 'progress-semantic-styles-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Progress],
  templateUrl: './semantic-styles.html',
})
export class ProgressSemanticStylesExample {}
