import type { SkeletonAnimation, SkeletonAvatarShape, SkeletonAvatarSize } from '@fex-design/core/skeleton/types'
import { skeletonAnimationVariants, skeletonAvatarClassName, skeletonBaseClassName, skeletonBlockClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
@Component({ selector: 'div[skeletonAvatar]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', 'aria-hidden': 'true', 'data-slot': 'skeleton-avatar' }, template: '' })
export class SkeletonAvatar { readonly animation = input<SkeletonAnimation>('none'); readonly className = input('', { alias: 'class' }); readonly shape = input<SkeletonAvatarShape>('circle'); readonly size = input<SkeletonAvatarSize>('md'); protected readonly hostClassName = createHostClassName(() => cn(skeletonBaseClassName, skeletonBlockClassName, skeletonAnimationVariants({ animation: this.animation() }), skeletonAvatarClassName({ shape: this.shape(), size: this.size() }), this.className())) }
