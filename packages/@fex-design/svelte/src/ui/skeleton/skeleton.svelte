<script lang="ts">
  import type { SkeletonClassNames, SkeletonOptions, SkeletonParagraphOptions, SkeletonStyles, SkeletonWidth } from '@fex-design/core/skeleton/types'
  import { skeletonAvatarAreaClassName, skeletonBodyClassName, skeletonParagraphClassName, skeletonRootClassName, skeletonTitleClassName } from '@fex-design/styles/skeleton'
  import { cn } from '@fex/utils'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import SkeletonAvatar from '../../primitive/skeleton/skeleton-avatar.svelte'
  import SkeletonText from '../../primitive/skeleton/skeleton-text.svelte'
  let { animation, avatar = false, children, class: className, classNames, loading, paragraph = true, placeholder, round, style, styles, title = true, ...rest }: Omit<HTMLAttributes<HTMLDivElement>, 'title'> & SkeletonOptions & { children?: Snippet; classNames?: SkeletonClassNames; placeholder?: Snippet; styles?: SkeletonStyles<string> } = $props()
  const widthStyle = (width: SkeletonWidth | undefined) => width === undefined ? '' : `width: ${typeof width === 'number' ? `${width}px` : width}`
  const mergeStyle = (...values: Array<string | null | undefined>) => values.filter(Boolean).join('; ')
  let avatarOptions = $derived(typeof avatar === 'object' ? avatar : {})
  let titleOptions = $derived(typeof title === 'object' ? title : {})
  let paragraphOptions: SkeletonParagraphOptions = $derived(typeof paragraph === 'object' ? paragraph : {})
  let rows = $derived(Math.max(0, Math.floor(paragraphOptions.rows ?? 3)))
  const rowWidth = (index: number) => Array.isArray(paragraphOptions.width) ? paragraphOptions.width[index] : index === rows - 1 ? paragraphOptions.width : undefined
</script>
{#if loading === false}
  {@render children?.()}
{:else if placeholder}
  {@render placeholder()}
{:else}
  <div {...rest} aria-hidden="true" data-slot="skeleton-root" class={cn(skeletonRootClassName, classNames?.root, className)} style={mergeStyle(styles?.root, style)}>
    {#if avatar}<div class={skeletonAvatarAreaClassName}><SkeletonAvatar animation={avatarOptions.animation ?? animation} shape={avatarOptions.shape} size={avatarOptions.size} class={classNames?.avatar} style={styles?.avatar} /></div>{/if}
    <div class={skeletonBodyClassName}>
      {#if title}<SkeletonText {animation} {round} class={cn(skeletonTitleClassName, classNames?.title)} style={mergeStyle(widthStyle(titleOptions.width), styles?.title)} />{/if}
      {#if paragraph && rows > 0}<div class={skeletonParagraphClassName}>{#each Array(rows) as _, index (index)}<SkeletonText {animation} {round} class={classNames?.paragraph} style={mergeStyle(widthStyle(rowWidth(index)), styles?.paragraph)} />{/each}</div>{/if}
    </div>
  </div>
{/if}
