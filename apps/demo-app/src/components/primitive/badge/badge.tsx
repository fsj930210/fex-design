import {
  isBadgePresetColor,
  type BadgeDotOptions,
  type BadgeGroupOptions,
  type BadgeOptions,
  type BadgeRibbonOptions,
} from './utils'
import { splitOverflowItems } from '@/lib/utils/shared/collection/split-overflow-items'

import { cn } from '@/lib/utils'
import { Children, type ComponentProps, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

const badgeClassName = cva(
  'inline-flex h-[var(--badge-height,var(--badge-size-height))] min-w-[var(--badge-min-width,var(--badge-size-min-width))] w-fit shrink-0 items-center justify-center rounded-full border border-transparent bg-[var(--badge-color,var(--badge-semantic-color))] px-[var(--badge-padding-inline,var(--badge-size-padding-inline))] py-0 text-[length:var(--badge-font-size,var(--badge-size-font-size))] leading-none font-medium text-[var(--badge-color-foreground,var(--badge-semantic-color-foreground))] whitespace-nowrap',
  {
    variants: {
      color: {
        default:
          '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))] [--badge-semantic-color-foreground:var(--badge-color-danger-foreground,var(--color-danger-foreground))]',
        primary:
          '[--badge-semantic-color:var(--badge-color-primary,var(--color-primary))] [--badge-semantic-color-foreground:var(--badge-color-primary-foreground,var(--color-primary-foreground))]',
        danger:
          '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))] [--badge-semantic-color-foreground:var(--badge-color-danger-foreground,var(--color-danger-foreground))]',
        warning:
          '[--badge-semantic-color:var(--badge-color-warning,var(--color-warning))] [--badge-semantic-color-foreground:var(--badge-color-warning-foreground,var(--color-warning-foreground))]',
        success:
          '[--badge-semantic-color:var(--badge-color-success,var(--color-success))] [--badge-semantic-color-foreground:var(--badge-color-success-foreground,var(--color-success-foreground))]',
        info: '[--badge-semantic-color:var(--badge-color-info,var(--color-info))] [--badge-semantic-color-foreground:var(--badge-color-info-foreground,var(--color-info-foreground))]',
      },
      size: {
        sm: '[--badge-size-height:var(--badge-height-sm,1rem)] [--badge-size-min-width:var(--badge-min-width-sm,var(--badge-height-sm,1rem))] [--badge-size-padding-inline:var(--badge-padding-inline-sm,0.25rem)] [--badge-size-font-size:var(--badge-font-size-sm,0.625rem)]',
        md: '[--badge-size-height:var(--badge-height-md,1.25rem)] [--badge-size-min-width:var(--badge-min-width-md,var(--badge-height-md,1.25rem))] [--badge-size-padding-inline:var(--badge-padding-inline-md,0.375rem)] [--badge-size-font-size:var(--badge-font-size-md,0.75rem)]',
        lg: '[--badge-size-height:var(--badge-height-lg,1.5rem)] [--badge-size-min-width:var(--badge-min-width-lg,var(--badge-height-lg,1.5rem))] [--badge-size-padding-inline:var(--badge-padding-inline-lg,0.5rem)] [--badge-size-font-size:var(--badge-font-size-lg,0.875rem)]',
      },
    },
    defaultVariants: { color: 'default', size: 'md' },
  },
)

const badgeDotClassName = cva(
  'inline-block size-[var(--badge-dot-size,var(--badge-size-dot-size))] rounded-full bg-current text-[var(--badge-color,var(--badge-semantic-color))]',
  {
    variants: {
      size: {
        sm: '[--badge-size-dot-size:var(--badge-dot-size-sm,0.375rem)]',
        md: '[--badge-size-dot-size:var(--badge-dot-size-md,0.5rem)]',
        lg: '[--badge-size-dot-size:var(--badge-dot-size-lg,0.625rem)]',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

const badgeDotColorClassName = cva('', {
  variants: {
    color: {
      default: '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))]',
      primary: '[--badge-semantic-color:var(--badge-color-primary,var(--color-primary))]',
      danger: '[--badge-semantic-color:var(--badge-color-danger,var(--color-danger))]',
      warning: '[--badge-semantic-color:var(--badge-color-warning,var(--color-warning))]',
      success: '[--badge-semantic-color:var(--badge-color-success,var(--color-success))]',
      info: '[--badge-semantic-color:var(--badge-color-info,var(--color-info))]',
    },
  },
  defaultVariants: { color: 'default' },
})

const badgeRibbonColorClassName = cva('', {
  variants: {
    color: {
      default:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-primary,var(--color-primary))] [--badge-semantic-color-foreground:var(--badge-color-primary-foreground,var(--color-primary-foreground))]',
      primary:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-primary,var(--color-primary))] [--badge-semantic-color-foreground:var(--badge-color-primary-foreground,var(--color-primary-foreground))]',
      danger:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-danger,var(--color-danger))] [--badge-semantic-color-foreground:var(--badge-color-danger-foreground,var(--color-danger-foreground))]',
      warning:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-warning,var(--color-warning))] [--badge-semantic-color-foreground:var(--badge-color-warning-foreground,var(--color-warning-foreground))]',
      success:
        'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-success,var(--color-success))] [--badge-semantic-color-foreground:var(--badge-color-success-foreground,var(--color-success-foreground))]',
      info: 'bg-[var(--badge-color,var(--badge-semantic-color))] text-[var(--badge-color,var(--badge-semantic-color))] [--badge-semantic-color:var(--badge-color-info,var(--color-info))] [--badge-semantic-color-foreground:var(--badge-color-info-foreground,var(--color-info-foreground))]',
    },
  },
  defaultVariants: { color: 'primary' },
})

export type { BadgeColor, BadgeSize } from './utils'
export interface BadgeProps
  extends Omit<ComponentProps<'span'>, 'color'>, BadgeOptions<ReactNode> {}

export function Badge({
  className,
  color,
  size = 'md',
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
      data-size={size}
      className={cn(badgeClassName({ color: presetColor, size }), className)}
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
  size = 'md',
  style,
  ...props
}: Omit<ComponentProps<'span'>, 'color'> & BadgeDotOptions) {
  const presetColor = isBadgePresetColor(color) ? color : undefined
  const customColor = color && !presetColor ? color : undefined
  return (
    <span
      data-slot="badge-dot"
      data-color={color ?? 'default'}
      data-size={size}
      className={cn(
        badgeDotClassName({ size }),
        badgeDotColorClassName({ color: presetColor }),
        className,
      )}
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
    <div {...props} data-slot="badge-group" className={cn("inline-flex flex-wrap items-center gap-1.5", className)}>
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
        "absolute -end-2 top-2 z-10 rounded-sm rounded-ee-none px-2 text-sm leading-[22px] whitespace-nowrap after:absolute after:end-0 after:top-full after:size-2 after:origin-top after:scale-y-75 after:border-4 after:border-solid after:border-current after:[border-inline-end-color:transparent] after:[border-block-end-color:transparent] after:brightness-75 after:content-[''] data-[placement=start]:end-auto data-[placement=start]:-start-2 data-[placement=start]:rounded-ee-sm data-[placement=start]:rounded-es-none data-[placement=start]:after:end-auto data-[placement=start]:after:start-0 data-[placement=start]:after:[border-inline-end-color:currentColor] data-[placement=start]:after:[border-inline-start-color:transparent]",
        badgeRibbonColorClassName({ color: presetColor ?? 'primary' }),
        className,
      )}
      style={{ '--badge-color': customColor, ...style } as ComponentProps<'div'>['style']}
    >
      <span data-slot="badge-ribbon-text" className="relative text-[var(--badge-color-foreground,var(--badge-semantic-color-foreground))]">
        {children}
      </span>
    </span>
  )
}
