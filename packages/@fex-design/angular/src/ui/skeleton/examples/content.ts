import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Skeleton } from '@fex-design/angular/ui/skeleton'
@Component({ selector: 'skeleton-content-example', standalone: true, imports: [Skeleton], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './content.html' })
export class SkeletonContentExample { protected readonly loading = signal(true) }

