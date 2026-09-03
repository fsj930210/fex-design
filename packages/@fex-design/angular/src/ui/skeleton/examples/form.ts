import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonButton, SkeletonInput, SkeletonText } from '@fex-design/angular/ui/skeleton'
@Component({ selector: 'skeleton-form-example', standalone: true, imports: [SkeletonButton, SkeletonInput, SkeletonText], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './form.html' })
export class SkeletonFormExample {  }

