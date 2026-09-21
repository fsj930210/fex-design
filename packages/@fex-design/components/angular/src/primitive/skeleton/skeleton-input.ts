import type { SkeletonAnimation } from '@fex-design/core/skeleton/types'
import {
  skeletonAnimationVariants,
  skeletonBaseClassName,
  skeletonBlockClassName,
  skeletonInputBlockClassName,
  skeletonInputClassName,
} from '@fex-design/components-styles/skeleton'
import { cn } from '@fex-design/utils'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
@Component({
  selector: 'div[skeletonInput]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'skeleton-input' },
  template: '',
})
export class SkeletonInput {
  readonly animation = input<SkeletonAnimation>('none')
  readonly block = input(false)
  readonly className = input('', { alias: 'class' })
  protected readonly hostClassName = createHostClassName(() =>
    cn(
      skeletonBaseClassName,
      skeletonBlockClassName,
      skeletonAnimationVariants({ animation: this.animation() }),
      skeletonInputClassName,
      this.block() && skeletonInputBlockClassName,
      this.className(),
    ),
  )
}
