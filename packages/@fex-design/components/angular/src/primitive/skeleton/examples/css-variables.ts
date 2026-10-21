import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonAvatar, SkeletonText } from '@fex-design/angular/primitive/skeleton'
@Component({
  selector: 'skeleton-css-variables-example',
  imports: [SkeletonAvatar, SkeletonText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SkeletonCssVariablesExample {}
