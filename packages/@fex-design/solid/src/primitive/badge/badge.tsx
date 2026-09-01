import {
  isBadgePresetColor,
  type BadgeDotOptions,
  type BadgeGroupOptions,
  type BadgeOptions,
  type BadgeRibbonOptions,
} from '@fex-design/core'
import { splitOverflowItems } from '@fex-design/core/collection/split-overflow-items'
import {
  badgeClassName,
  badgeDotClassName,
  badgeDotColorClassName,
  badgeGroupClassName,
  badgeRibbonClassName,
  badgeRibbonColorClassName,
  badgeRibbonTextClassName,
} from '@fex-design/styles/badge'
import { cn } from '@fex/utils'
import type { JSX, ParentProps } from 'solid-js'
import { children, createMemo, For, Show, splitProps } from 'solid-js'

export type BadgeProps = ParentProps<
  Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'color'> & BadgeOptions<JSX.Element>
>
export function Badge(props: BadgeProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'children',
    'color',
    'size',
    'count',
    'showZero',
    'overflowCount',
  ])
  const value = () =>
    typeof local.count === 'number' &&
    local.overflowCount !== undefined &&
    local.count > local.overflowCount
      ? `${local.overflowCount}+`
      : local.count
  const visible = () => value() !== 0 || Boolean(local.showZero) || local.children != null
  return (
    <Show when={visible()}>
      <span
        {...rest}
        data-slot="badge"
        data-color={local.color}
        data-size={local.size ?? 'md'}
        class={cn(
          badgeClassName({
            color: isBadgePresetColor(local.color) ? local.color : undefined,
            size: local.size,
          }),
          local.class,
        )}
        style={{
          ...(typeof local.style === 'object' ? local.style : {}),
          '--badge-color': local.color && !isBadgePresetColor(local.color) ? local.color : undefined,
        }}
      >
        {value() ?? local.children}
      </span>
    </Show>
  )
}
export function BadgeDot(
  props: Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'color'> & BadgeDotOptions,
) {
  const [local, rest] = splitProps(props, ['class', 'style', 'color', 'size'])
  return (
    <span
      {...rest}
      data-slot="badge-dot"
      data-color={local.color ?? 'default'}
      data-size={local.size ?? 'md'}
      class={cn(
        badgeDotClassName({ size: local.size }),
        badgeDotColorClassName({
          color: isBadgePresetColor(local.color) ? local.color : undefined,
        }),
        local.class,
      )}
      style={{
        ...(typeof local.style === 'object' ? local.style : {}),
        '--badge-color': local.color && !isBadgePresetColor(local.color) ? local.color : undefined,
      }}
    />
  )
}
export interface BadgeGroupProps
  extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>>, BadgeGroupOptions {
  overflow?: (count: number, items: readonly JSX.Element[]) => JSX.Element
}
export function BadgeGroup(props: BadgeGroupProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'maxCount', 'overflow'])
  const resolved = children(() => local.children)
  const split = createMemo(() => splitOverflowItems(resolved.toArray(), local.maxCount))
  return (
    <div {...rest} data-slot="badge-group" class={cn(badgeGroupClassName, local.class)}>
      <For each={split().visibleItems}>{(item) => item}</For>
      <Show when={split().overflowCount > 0}>
        {local.overflow?.(split().overflowCount, split().overflowItems) ?? (
          <span data-slot="badge" class={badgeClassName()}>
            +{split().overflowCount}
          </span>
        )}
      </Show>
    </div>
  )
}
export function BadgeRibbon(
  props: ParentProps<Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'color'> & BadgeRibbonOptions>,
) {
  const [local, rest] = splitProps(props, ['class', 'style', 'children', 'color', 'placement'])
  return (
    <span
      {...rest}
      data-slot="badge-ribbon"
      data-color={local.color ?? 'primary'}
      data-placement={local.placement ?? 'end'}
      class={cn(
        badgeRibbonClassName,
        badgeRibbonColorClassName({
          color: isBadgePresetColor(local.color) ? local.color : 'primary',
        }),
        local.class,
      )}
      style={{
        ...(typeof local.style === 'object' ? local.style : {}),
        '--badge-color': local.color && !isBadgePresetColor(local.color) ? local.color : undefined,
      }}
    >
      <span data-slot="badge-ribbon-text" class={badgeRibbonTextClassName}>
        {local.children}
      </span>
    </span>
  )
}
