import type { TagUiOptions } from '@fex-design/core/tag/types'
import { cn } from '@fex-design/utils'
import type { ComponentProps, CSSProperties, MouseEventHandler, ReactNode } from 'react'
import {
  Tag as PrimitiveTag,
  TagAction,
  type TagProps as PrimitiveTagProps,
} from '@fex-design/react/primitive/tag'

export type { TagActionProps } from '@fex-design/react/primitive/tag'
export { TagAction } from '@fex-design/react/primitive/tag'

export interface TagProps extends PrimitiveTagProps, TagUiOptions<ReactNode, CSSProperties> {
  actionProps?:
    | Omit<ComponentProps<typeof TagAction>, 'children' | 'disabled' | 'onClick'>
    | undefined
  onClose?: MouseEventHandler<HTMLButtonElement>
}

export function Tag({
  actionProps,
  closable = false,
  closeIcon,
  onClose,
  disabled = false,
  className,
  style,
  classNames,
  styles,
  children,
  ...props
}: TagProps) {
  return (
    <PrimitiveTag
      {...props}
      disabled={disabled}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {children}
      {closable ? (
        <TagAction
          {...actionProps}
          disabled={disabled}
          aria-label={actionProps?.['aria-label'] ?? 'Close'}
          className={cn(classNames?.close, actionProps?.className)}
          style={{ ...styles?.close, ...actionProps?.style }}
          onClick={onClose}
        >
          {closeIcon}
        </TagAction>
      ) : null}
    </PrimitiveTag>
  )
}
