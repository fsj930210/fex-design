import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag, TagAction } from '@fex-design/angular/primitive/tag'
@Component({
  selector: 'tag-semantic-styles-example',
  standalone: true,
  imports: [Tag, TagAction],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class TagSemanticStylesExample {}
