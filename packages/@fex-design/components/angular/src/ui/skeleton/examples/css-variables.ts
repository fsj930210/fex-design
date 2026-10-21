import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Skeleton } from '@fex-design/angular/ui/skeleton'
@Component({
  selector: 'skeleton-css-variables-example',
  imports: [Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class SkeletonCssVariablesExample {}
