import type { SkeletonAvatarOptions, SkeletonClassNames, SkeletonOptions, SkeletonParagraphOptions, SkeletonStyles, SkeletonWidth } from '@fex-design/core/skeleton/types'
import { skeletonAvatarAreaClassName, skeletonBodyClassName, skeletonParagraphClassName, skeletonRootClassName, skeletonTitleClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { createMemo, For, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { SkeletonAvatar } from '../../primitive/skeleton/skeleton-avatar'
import { SkeletonText } from '../../primitive/skeleton/skeleton-text'
export type SkeletonProps = ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'>> & SkeletonOptions & { classNames?: SkeletonClassNames; placeholder?: JSX.Element; styles?: SkeletonStyles<JSX.CSSProperties> }
const widthStyle = (width: SkeletonWidth | undefined): JSX.CSSProperties | undefined => width === undefined ? undefined : { width: typeof width === 'number' ? `${width}px` : width }
function paragraphWidth(options: SkeletonParagraphOptions, index: number, rows: number) { if (Array.isArray(options.width)) return options.width[index]; return index === rows - 1 ? options.width : undefined }
export function Skeleton(props: SkeletonProps) {
  const [local, rest] = splitProps(props, ['animation', 'avatar', 'children', 'class', 'classNames', 'loading', 'paragraph', 'placeholder', 'round', 'style', 'styles', 'title'])
  const avatar = () => local.avatar ?? false
  const title = () => local.title ?? true
  const paragraph = () => local.paragraph ?? true
  const avatarOptions = createMemo(() => typeof avatar() === 'object' ? avatar() as SkeletonAvatarOptions : {})
  const titleOptions = createMemo(() => typeof title() === 'object' ? title() as { width?: SkeletonWidth } : {})
  const paragraphOptions = createMemo(() => typeof paragraph() === 'object' ? paragraph() as SkeletonParagraphOptions : {})
  const rows = createMemo(() => Math.max(0, Math.floor(paragraphOptions().rows ?? 3)))
  return <Show when={local.loading !== false} fallback={local.children}><Show when={local.placeholder === undefined} fallback={local.placeholder}>
    <div {...rest} aria-hidden="true" data-slot="skeleton-root" class={cn(skeletonRootClassName, local.classNames?.root, local.class)} style={typeof local.style === 'object' ? { ...local.styles?.root, ...local.style } : local.style ?? local.styles?.root}>
      <Show when={avatar()}><div class={skeletonAvatarAreaClassName}><SkeletonAvatar animation={avatarOptions().animation ?? local.animation} shape={avatarOptions().shape} size={avatarOptions().size} class={local.classNames?.avatar} style={local.styles?.avatar} /></div></Show>
      <div class={skeletonBodyClassName}><Show when={title()}><SkeletonText animation={local.animation} round={local.round} class={cn(skeletonTitleClassName, local.classNames?.title)} style={{ ...widthStyle(titleOptions().width), ...local.styles?.title }} /></Show>
      <Show when={paragraph() && rows() > 0}><div class={skeletonParagraphClassName}><For each={Array.from({ length: rows() })}>{(_, index) => <SkeletonText animation={local.animation} round={local.round} class={local.classNames?.paragraph} style={{ ...widthStyle(paragraphWidth(paragraphOptions(), index(), rows())), ...local.styles?.paragraph }} />}</For></div></Show></div>
    </div>
  </Show></Show>
}
