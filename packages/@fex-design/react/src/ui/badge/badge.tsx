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
import { type ComponentProps, type CSSProperties, type ReactNode } from 'react'

/** 常用的附着式 Badge 快捷组件；完整组合能力请使用 primitive/badge。 */
export interface BadgeUiProps extends BadgeProps, BadgeAttachmentOptions {
  dot?: boolean
  classNames?: BadgeClassNames
  styles?: BadgeStyles<CSSProperties>
}
export function Badge({
  children,
  count,
  dot = false,
  offset,
  className,
  style,
  classNames,
  styles,
  ...props
}: BadgeUiProps) {
  const indicatorStyle = {
    translate: offset ? 'none' : undefined,
    transform: getBadgeOffsetTransform(offset),
    ...styles?.indicator,
  }
  if (!dot && count === undefined)
    return (
      <PrimitiveBadge
        {...props}
        className={cn(className, classNames?.root)}
        style={{ ...style, ...styles?.root }}
      >
        {children}
      </PrimitiveBadge>
    )
  if (children == null)
    return dot ? (
      <BadgeDot {...props} className={classNames?.indicator} style={indicatorStyle} />
    ) : (
      <PrimitiveBadge
        {...props}
        {...(count !== undefined ? { count } : {})}
        className={classNames?.indicator}
        style={indicatorStyle}
      />
    )
  return (
    <span
      data-slot="badge-root"
      className={cn(badgeRootClassName, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      <span data-slot="badge-content" className={classNames?.content} style={styles?.content}>
        {children}
      </span>
      {dot ? (
        <BadgeDot {...props} className={classNames?.indicator} style={indicatorStyle} />
      ) : (
        <PrimitiveBadge
          {...props}
          {...(count !== undefined ? { count } : {})}
          className={classNames?.indicator}
          style={indicatorStyle}
        />
      )}
    </span>
  )
}

export interface BadgeRibbonProps extends Omit<ComponentProps<'div'>, 'color'>, BadgeRibbonOptions {
  text?: ReactNode
}
export function BadgeRibbon({
  text,
  color,
  placement,
  className,
  children,
  ...props
}: BadgeRibbonProps) {
  return (
    <div
      {...props}
      data-slot="badge-ribbon-root"
      className={cn(badgeRibbonRootClassName, className)}
    >
      <div data-slot="badge-ribbon-content">{children}</div>
      <PrimitiveBadgeRibbon
        {...(color !== undefined ? { color } : {})}
        {...(placement !== undefined ? { placement } : {})}
      >
        {text}
      </PrimitiveBadgeRibbon>
    </div>
  )
}
