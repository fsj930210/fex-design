import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonAvatar, SkeletonText } from '@fex-design/angular/primitive/skeleton'
@Component({ selector: 'skeleton-list-example', standalone: true, imports: [SkeletonAvatar, SkeletonText], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './list.html' })
export class SkeletonListExample { protected readonly items = [0, 1, 2] }

