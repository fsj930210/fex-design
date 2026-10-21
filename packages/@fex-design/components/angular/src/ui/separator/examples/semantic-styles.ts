import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Separator } from '@fex-design/angular/ui/separator'
@Component({
  selector: 'separator-semantic-styles-example',
  standalone: true,
  imports: [Separator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SeparatorSemanticStylesExample {}
