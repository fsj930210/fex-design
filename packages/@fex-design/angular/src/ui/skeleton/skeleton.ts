import type { SkeletonAnimation, SkeletonAvatarOptions, SkeletonClassNames, SkeletonParagraphOptions, SkeletonStyles, SkeletonTitleOptions, SkeletonWidth } from '@fex-design/core/skeleton/types'
import { skeletonAvatarAreaClassName, skeletonBodyClassName, skeletonParagraphClassName, skeletonRootClassName, skeletonTitleClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText } from '../../primitive/skeleton/skeleton'
import { createHostClassName } from '../../signals/host-class'
import { SkeletonPlaceholder } from './skeleton-placeholder'
@Component({ selector: 'div[skeleton]', standalone: true, imports: [NgTemplateOutlet, SkeletonAvatar, SkeletonText], changeDetection: ChangeDetectionStrategy.OnPush, host: { '[class]': 'hostClassName()', '[style]': 'loading() === false || placeholder() ? null : styles().root', '[attr.aria-hidden]': 'loading() === false ? null : true', 'data-slot': 'skeleton-root' }, templateUrl: './skeleton.html' })
export class Skeleton {
  readonly animation = input<SkeletonAnimation>('none')
  readonly avatar = input<boolean | SkeletonAvatarOptions>(false)
  readonly loading = input<boolean | undefined>()
  readonly paragraph = input<boolean | SkeletonParagraphOptions>(true)
  readonly round = input(false)
  readonly title = input<boolean | SkeletonTitleOptions>(true)
  readonly classNames = input<SkeletonClassNames>({})
  readonly styles = input<SkeletonStyles<string>>({})
  protected readonly placeholder = contentChild(SkeletonPlaceholder)
  protected readonly avatarAreaClassName = skeletonAvatarAreaClassName
  protected readonly bodyClassName = skeletonBodyClassName
  protected readonly paragraphClassName = skeletonParagraphClassName
  protected readonly avatarClassName = () => cn(this.classNames().avatar)
  protected readonly titleClassName = () => cn(skeletonTitleClassName, this.classNames().title)
  protected readonly paragraphItemClassName = () => cn(this.classNames().paragraph)
  protected readonly hostClassName = createHostClassName(() => this.loading() === false || this.placeholder() ? 'contents' : cn(skeletonRootClassName, this.classNames().root))
  protected readonly avatarOptions = () => typeof this.avatar() === 'object' ? this.avatar() as SkeletonAvatarOptions : {}
  protected readonly titleOptions = () => typeof this.title() === 'object' ? this.title() as SkeletonTitleOptions : {}
  protected readonly paragraphOptions = () => typeof this.paragraph() === 'object' ? this.paragraph() as SkeletonParagraphOptions : {}
  protected readonly rows = () => Math.max(0, Math.floor(this.paragraphOptions().rows ?? 3))
  protected readonly rowIndexes = () => Array.from({ length: this.rows() }, (_, index) => index)
  protected widthStyle(width: SkeletonWidth | undefined, style: string | undefined) { const value = width === undefined ? '' : `width: ${typeof width === 'number' ? `${width}px` : width}`; return [value, style].filter(Boolean).join('; ') }
  protected rowWidth(index: number) { const options = this.paragraphOptions(); return Array.isArray(options.width) ? options.width[index] : index === this.rows() - 1 ? options.width : undefined }
}
export { SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText, SkeletonPlaceholder }
