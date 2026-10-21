import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonAvatar, SkeletonText } from '@fex-design/angular/primitive/skeleton'
@Component({
  selector: 'skeleton-semantic-styles-example',
  imports: [SkeletonAvatar, SkeletonText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SkeletonSemanticStylesExample {}
