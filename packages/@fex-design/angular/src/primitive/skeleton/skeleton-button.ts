import type { SkeletonAnimation, SkeletonButtonShape, SkeletonButtonSize } from '@fex-design/core/skeleton/types'
import { skeletonAnimationVariants, skeletonBaseClassName, skeletonBlockClassName, skeletonButtonClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
@Component({ selector: 'div[skeletonButton]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'skeleton-button' }, template: '' })
export class SkeletonButton { readonly animation = input<SkeletonAnimation>('none'); readonly block = input(false); readonly className = input('', { alias: 'class' }); readonly shape = input<SkeletonButtonShape | undefined>(); readonly size = input<SkeletonButtonSize>('default'); protected readonly hostClassName = createHostClassName(() => cn(skeletonBaseClassName, skeletonBlockClassName, skeletonAnimationVariants({ animation: this.animation() }), skeletonButtonClassName({ block: this.block(), shape: this.shape(), size: this.size() }), this.className())) }
