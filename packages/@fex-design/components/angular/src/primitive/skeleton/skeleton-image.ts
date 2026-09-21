import type { SkeletonAnimation } from '@fex-design/core/skeleton/types'
import {
  skeletonAnimationVariants,
  skeletonBaseClassName,
  skeletonBlockClassName,
  skeletonImageClassName,
} from '@fex-design/components-styles/skeleton'
import { cn } from '@fex-design/utils'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Component({
  selector: 'div[skeletonImage]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'skeleton-image' },
  templateUrl: './skeleton-image.html',
})
export class SkeletonImage {
  readonly animation = input<SkeletonAnimation>('none')
  readonly className = input('', { alias: 'class' })
  protected readonly hostClassName = createHostClassName(() =>
    cn(
      skeletonBaseClassName,
      skeletonBlockClassName,
      skeletonAnimationVariants({ animation: this.animation() }),
      skeletonImageClassName,
      this.className(),
    ),
  )
}
