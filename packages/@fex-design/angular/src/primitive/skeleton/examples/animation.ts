import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkeletonAvatar, SkeletonButton, SkeletonText } from '@fex-design/angular/primitive/skeleton'
@Component({ selector: 'skeleton-animation-example', standalone: true, imports: [SkeletonAvatar, SkeletonButton, SkeletonText], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './animation.html' })
export class SkeletonAnimationExample { protected readonly modes = [{ value: 'none', label: '无动画' }, { value: 'pulse', label: '呼吸' }, { value: 'wave', label: '流光' }] as const }

