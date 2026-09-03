import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Skeleton } from '@fex-design/angular/ui/skeleton'
@Component({ selector: 'skeleton-styles-example', standalone: true, imports: [Skeleton], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './styles.html' })
export class SkeletonStylesExample {}

