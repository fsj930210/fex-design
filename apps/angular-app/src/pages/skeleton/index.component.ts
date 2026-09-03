import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SkeletonAvatar,
  SkeletonBlock,
  SkeletonButton,
  SkeletonImage,
  SkeletonInput,
  SkeletonText,
} from '@fex-design/angular/primitive/skeleton'
import { Card } from '@fex-design/angular/ui/card'

@Component({
  selector: 'skeleton-page',
  standalone: true,
  imports: [
    Card,
    SkeletonAvatar,
    SkeletonBlock,
    SkeletonButton,
    SkeletonImage,
    SkeletonInput,
    SkeletonText,
  ],
  host: { class: 'block' },
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  protected readonly rows = [0, 1, 2]
}
