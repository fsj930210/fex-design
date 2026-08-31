import {
  Badge as PrimitiveBadge,
  BadgeDot,
  BadgeRibbon as PrimitiveBadgeRibbon,
  type BadgeProps,
} from '../../primitive/badge/badge'
export { BadgeGroup } from '../../primitive/badge/badge'
import {
  getBadgeOffsetTransform,
  type BadgeAttachmentOptions,
  type BadgeClassNames,
  type BadgeRibbonOptions,
  type BadgeStyles,
} from '@fex-design/core'
import { badgeRibbonRootClassName, badgeRootClassName } from '@fex-design/styles/badge'
import { cn } from '@fex/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export type BadgeUiProps = BadgeProps &
  BadgeAttachmentOptions & {
    dot?: boolean
    classNames?: BadgeClassNames
    styles?: BadgeStyles<JSX.CSSProperties>
  }
export function Badge(props: BadgeUiProps) {
  const [local, rest] = splitProps(props, [
    'children',
    'count',
    'dot',
    'class',
    'offset',
    'style',
    'classNames',
    'styles',
  ])
  const indicatorStyle = {
    ...(typeof local.style === 'object' ? local.style : {}),
    translate: local.offset ? 'none' : undefined,
    transform: getBadgeOffsetTransform(local.offset),
    ...local.styles?.indicator,
  }
  if (!local.dot && local.count === undefined)
    return (
      <PrimitiveBadge
        {...rest}
        class={cn(local.class, local.classNames?.root)}
        style={local.styles?.root}
      >
        {local.children}
      </PrimitiveBadge>
    )
  if (local.children == null)
    return local.dot ? (
      <BadgeDot
        {...rest}
        class={cn(local.class, local.classNames?.indicator)}
        style={indicatorStyle}
      />
    ) : (
      <PrimitiveBadge
        {...rest}
        count={local.count}
        class={cn(local.class, local.classNames?.indicator)}
        style={indicatorStyle}
      />
    )
  return (
    <span
      data-slot="badge-root"
      class={cn(badgeRootClassName, local.class, local.classNames?.root)}
      style={local.styles?.root}
    >
      <span
        data-slot="badge-content"
        class={local.classNames?.content}
        style={local.styles?.content}
      >
        {local.children}
      </span>
      {local.dot ? (
        <BadgeDot {...rest} class={local.classNames?.indicator} style={indicatorStyle} />
      ) : (
        <PrimitiveBadge
          {...rest}
          count={local.count}
          class={local.classNames?.indicator}
          style={indicatorStyle}
        />
      )}
    </span>
  )
}
export type BadgeRibbonProps = ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'color'> & BadgeRibbonOptions & { text?: JSX.Element }
>
export function BadgeRibbon(props: BadgeRibbonProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'text', 'color', 'placement'])
  return (
    <div {...rest} data-slot="badge-ribbon-root" class={cn(badgeRibbonRootClassName, local.class)}>
      <div data-slot="badge-ribbon-content">{local.children}</div>
      <PrimitiveBadgeRibbon
        {...(local.color !== undefined ? { color: local.color } : {})}
        {...(local.placement !== undefined ? { placement: local.placement } : {})}
      >
        {local.text}
      </PrimitiveBadgeRibbon>
    </div>
  )
}
