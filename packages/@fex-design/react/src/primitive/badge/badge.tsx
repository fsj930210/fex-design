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
import { Children, type ComponentProps, type ReactNode } from 'react'

export type { BadgeColor } from '@fex-design/core'
export interface BadgeProps
  extends Omit<ComponentProps<'span'>, 'color'>, BadgeOptions<ReactNode> {}

export function Badge({
  className,
  color,
  count,
  showZero = false,
  overflowCount,
  children,
  style,
  ...props
}: BadgeProps) {
  const presetColor = isBadgePresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  const value =
    typeof count === 'number' && overflowCount != null && count > overflowCount
      ? `${overflowCount}+`
      : count
  if (value == null && children == null) return null
  if (value === 0 && !showZero && children == null) return null
  return (
    <span
      data-slot="badge"
      data-color={color}
      className={cn(badgeClassName({ color: presetColor }), className)}
      style={
        {
          '--badge-color': customColor,
          ...style,
        } as ComponentProps<'span'>['style']
      }
      {...props}
    >
      {value ?? children}
    </span>
  )
}

export function BadgeDot({
  className,
  color,
  style,
  ...props
}: Omit<ComponentProps<'span'>, 'color'> & BadgeDotOptions) {
  const presetColor = isBadgePresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  return (
    <span
      data-slot="badge-dot"
      data-color={color ?? 'default'}
      className={cn(badgeDotClassName, badgeDotColorClassName({ color: presetColor }), className)}
      style={
        {
          '--badge-color': customColor,
          ...style,
        } as ComponentProps<'span'>['style']
      }
      {...props}
    />
  )
}

export interface BadgeGroupProps extends ComponentProps<'div'>, BadgeGroupOptions {
  renderOverflow?: (count: number, items: readonly ReactNode[]) => ReactNode
}
export function BadgeGroup({
  maxCount,
  renderOverflow,
  className,
  children,
  ...props
}: BadgeGroupProps) {
  const split = splitOverflowItems(Children.toArray(children), maxCount)
  return (
    <div {...props} data-slot="badge-group" className={cn(badgeGroupClassName, className)}>
      {split.visibleItems}
      {split.overflowCount > 0 &&
        (renderOverflow?.(split.overflowCount, split.overflowItems) ?? (
          <span data-slot="badge" className={badgeClassName()}>
            +{split.overflowCount}
          </span>
        ))}
    </div>
  )
}

export interface BadgeRibbonProps
  extends Omit<ComponentProps<'span'>, 'color'>, BadgeRibbonOptions {}
export function BadgeRibbon({
  color = 'primary',
  placement = 'end',
  className,
  children,
  style,
  ...props
}: BadgeRibbonProps) {
  const presetColor = isBadgePresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  return (
    <span
      {...props}
      data-slot="badge-ribbon"
      data-color={color}
      data-placement={placement}
      className={cn(
        badgeRibbonClassName,
        badgeRibbonColorClassName({ color: presetColor ?? 'primary' }),
        className,
      )}
      style={{ '--badge-color': customColor, ...style } as ComponentProps<'div'>['style']}
    >
      <span data-slot="badge-ribbon-text" className={badgeRibbonTextClassName}>
        {children}
      </span>
    </span>
  )
}
