import { splitOverflowItems } from '@fex-design/core/collection/split-overflow-items'
import type {
  AvatarClassNames,
  AvatarGroupClassNames,
  AvatarGroupStyles,
  AvatarStyles,
} from '@fex-design/core/avatar/types'
import {
  Avatar as PrimitiveAvatar,
  AvatarFallback,
  AvatarGroup as PrimitiveAvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '../../primitive/avatar/avatar'
import { cn } from '@fex/utils'
import { children, createMemo, For, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
export interface AvatarProps extends ParentProps<JSX.HTMLAttributes<HTMLSpanElement>> {
  src?: string
  alt?: string
  srcSet?: string
  fallback?: JSX.Element
  size?: 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
  classNames?: AvatarClassNames
  styles?: AvatarStyles<JSX.CSSProperties>
}
export function Avatar(props: AvatarProps) {
  const [local, rest] = splitProps(props, [
    'src',
    'alt',
    'srcSet',
    'fallback',
    'children',
    'class',
    'style',
    'classNames',
    'styles',
  ])
  return (
    <PrimitiveAvatar
      {...rest}
      class={cn(local.class, local.classNames?.root)}
      style={{ ...(typeof local.style === 'object' ? local.style : {}), ...local.styles?.root }}
    >
      {local.src ? (
        <AvatarImage
          src={local.src}
          alt={local.alt ?? ''}
          srcset={local.srcSet}
          class={local.classNames?.image}
          style={local.styles?.image}
        />
      ) : null}
      <AvatarFallback class={local.classNames?.fallback} style={local.styles?.fallback}>
        {local.fallback ?? local.children}
      </AvatarFallback>
    </PrimitiveAvatar>
  )
}
export interface AvatarGroupProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  maxCount?: number
  renderOverflow?: (count: number, items: readonly JSX.Element[]) => JSX.Element
  classNames?: AvatarGroupClassNames
  styles?: AvatarGroupStyles<JSX.CSSProperties>
}
export function AvatarGroup(props: AvatarGroupProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'children',
    'maxCount',
    'renderOverflow',
    'classNames',
    'styles',
  ])
  const resolved = children(() => local.children)
  const split = createMemo(() => splitOverflowItems(resolved.toArray(), local.maxCount))
  return (
    <PrimitiveAvatarGroup
      {...rest}
      class={cn(local.class, local.classNames?.root)}
      style={{ ...(typeof local.style === 'object' ? local.style : {}), ...local.styles?.root }}
    >
      <For each={split().visibleItems}>{(item) => item}</For>
      <Show when={split().overflowCount > 0}>
        {local.renderOverflow?.(split().overflowCount, split().overflowItems) ?? (
          <AvatarGroupCount class={local.classNames?.overflow} style={local.styles?.overflow}>
            +{split().overflowCount}
          </AvatarGroupCount>
        )}
      </Show>
    </PrimitiveAvatarGroup>
  )
}
