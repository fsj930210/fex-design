import {
  isTagPresetColor,
  type TagOptions,
  type TagPresetColor,
} from '@fex-design/core/tag/types'
import { tagClassName, tagActionClassName } from '@fex-design/styles/tag'
import { cn } from '@fex/utils'
import type { ComponentProps, CSSProperties } from 'react'
import { CloseIcon } from '../../icon/close'

type TagCSSProperties = CSSProperties & {
  '--tag-color'?: string
  '--tag-color-foreground'?: string
}

export interface TagProps extends Omit<ComponentProps<'span'>, 'color'>, TagOptions {}

export function Tag({
  color,
  variant = 'filled',
  size = 'md',
  disabled = false,
  className,
  style,
  ...props
}: TagProps) {
  const presetColor: TagPresetColor | undefined = isTagPresetColor(color) ? color : undefined
  const mergedStyle: TagCSSProperties = {
    ...(color && !presetColor ? { '--tag-color': color } : undefined),
    ...style,
  }
  return (
    <span
      {...props}
      data-slot="tag"
      data-color={presetColor ?? (color ? 'custom' : undefined)}
      data-variant={variant}
      data-size={size}
      data-disabled={disabled ? 'true' : undefined}
      className={cn(tagClassName({ variant, color: presetColor, size }), className)}
      style={mergedStyle}
    />
  )
}

export interface TagActionProps extends ComponentProps<'button'> {}

export function TagAction({
  type = 'button',
  'aria-label': ariaLabel,
  className,
  children,
  ...props
}: TagActionProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={ariaLabel}
      data-slot="tag-action"
      className={cn(tagActionClassName, className)}
    >
      {children ?? <CloseIcon aria-hidden />}
    </button>
  )
}
