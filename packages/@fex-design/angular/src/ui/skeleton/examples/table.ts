import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonButton, SkeletonText } from '@fex-design/angular/ui/skeleton'
@Component({ selector: 'skeleton-table-example', standalone: true, imports: [SkeletonButton, SkeletonText], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './table.html' })
export class SkeletonTableExample { protected readonly indexes = Array.from({ length: 12 }, (_, index) => index) }

