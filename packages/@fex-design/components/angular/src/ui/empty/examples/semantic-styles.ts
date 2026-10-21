import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Empty } from '@fex-design/angular/ui/empty'
@Component({
  selector: 'empty-semantic-styles-example',
  standalone: true,
  imports: [Empty],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class EmptySemanticStylesExample {}
