import type { SkeletonAnimation } from '@fex-design/core/skeleton/types'
import {
  skeletonAnimationVariants,
  skeletonBaseClassName,
  skeletonBlockClassName,
  skeletonTextClassName,
} from '@fex-design/components-styles/skeleton'
import { cn } from '@fex-design/utils'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Component({
  selector: 'div[skeletonText]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'skeleton-text' },
  template: '',
})
export class SkeletonText {
  readonly animation = input<SkeletonAnimation>('none')
  readonly className = input('', { alias: 'class' })
  readonly round = input(false)
  protected readonly hostClassName = createHostClassName(() =>
    cn(
      skeletonBaseClassName,
      skeletonBlockClassName,
      skeletonTextClassName,
      skeletonAnimationVariants({ animation: this.animation() }),
      this.round() && 'rounded-full',
      this.className(),
    ),
  )
}
