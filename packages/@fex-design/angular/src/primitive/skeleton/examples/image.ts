import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonImage, SkeletonText } from '@fex-design/angular/primitive/skeleton'
@Component({ selector: 'skeleton-image-example', standalone: true, imports: [SkeletonImage, SkeletonText], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './image.html' })
export class SkeletonImageExample {  }

