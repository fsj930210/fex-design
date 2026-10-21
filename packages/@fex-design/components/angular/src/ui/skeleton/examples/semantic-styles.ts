import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Skeleton } from '@fex-design/angular/ui/skeleton'
@Component({
  selector: 'skeleton-semantic-styles-example',
  standalone: true,
  imports: [Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class SkeletonSemanticStylesExample {}
