import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText } from '@fex-design/angular/ui/skeleton'
@Component({ selector: 'skeleton-basic-example', standalone: true, imports: [SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './basic.html' })
export class SkeletonBasicExample {  }
