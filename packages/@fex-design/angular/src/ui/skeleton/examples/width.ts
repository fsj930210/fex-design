import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Skeleton } from '@fex-design/angular/ui/skeleton'
@Component({ selector: 'skeleton-width-example', standalone: true, imports: [Skeleton], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './width.html' })
export class SkeletonWidthExample {}

