import type { TagUiOptions } from '@fex-design/core/tag/types'
import { cn } from '@fex/utils'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import {
  Tag as PrimitiveTag,
  TagClose,
  type TagProps as PrimitiveTagProps,
} from '../../primitive/tag/tag'

export type { TagCloseProps } from '../../primitive/tag/tag'
export { TagClose } from '../../primitive/tag/tag'

export interface TagProps
  extends PrimitiveTagProps,
    TagUiOptions<ReactNode, CSSProperties> {
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
        <TagClose
          disabled={disabled}
          className={classNames?.close}
          style={styles?.close}
          onClick={onClose}
        >
          {closeIcon}
        </TagClose>
      ) : null}
    </PrimitiveTag>
  )
}
