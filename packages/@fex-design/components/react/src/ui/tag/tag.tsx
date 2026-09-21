import type { TagUiOptions } from '@fex-design/core/tag/types'
import { cn } from '@fex-design/utils'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import {
  Tag as PrimitiveTag,
  TagAction,
  type TagProps as PrimitiveTagProps,
} from '@fex-design/react/primitive/tag/tag'

export type { TagActionProps } from '@fex-design/react/primitive/tag/tag'
export { TagAction } from '@fex-design/react/primitive/tag/tag'

export interface TagProps extends PrimitiveTagProps, TagUiOptions<ReactNode, CSSProperties> {
  onClose?: MouseEventHandler<HTMLButtonElement>
}

export function Tag({
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
          disabled={disabled}
          aria-label="Close"
          className={classNames?.close}
          style={styles?.close}
          onClick={onClose}
        >
          {closeIcon}
        </TagAction>
      ) : null}
    </PrimitiveTag>
  )
}
