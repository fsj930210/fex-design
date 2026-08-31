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
} from '@fex-design/react/primitive/avatar'
import { cn } from '@fex/utils'
import { Children, type ComponentProps, type CSSProperties, type ReactNode } from 'react'

export interface AvatarProps extends Omit<ComponentProps<typeof PrimitiveAvatar>, 'children'> {
  src?: string
  alt?: string
  srcSet?: string
  fallback?: ReactNode
  children?: ReactNode
  classNames?: AvatarClassNames
  styles?: AvatarStyles<CSSProperties>
}

export function Avatar({
  src,
  alt = '',
  srcSet,
  fallback,
  children,
  className,
  style,
  classNames,
  styles,
  ...props
}: AvatarProps) {
  return (
    <PrimitiveAvatar
      {...props}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {src ? (
        <AvatarImage
          src={src}
          alt={alt}
          srcSet={srcSet}
          className={classNames?.image}
          style={styles?.image}
        />
      ) : null}
      <AvatarFallback className={classNames?.fallback} style={styles?.fallback}>
        {fallback ?? children}
      </AvatarFallback>
    </PrimitiveAvatar>
  )
}

export interface AvatarGroupProps extends ComponentProps<typeof PrimitiveAvatarGroup> {
  maxCount?: number
  renderOverflow?: (overflowCount: number, overflowItems: readonly ReactNode[]) => ReactNode
  classNames?: AvatarGroupClassNames
  styles?: AvatarGroupStyles<CSSProperties>
}

export function AvatarGroup({
  maxCount,
  renderOverflow,
  children,
  className,
  style,
  classNames,
  styles,
  ...props
}: AvatarGroupProps) {
  const { visibleItems, overflowItems, overflowCount } = splitOverflowItems(
    Children.toArray(children),
    maxCount,
  )
  return (
    <PrimitiveAvatarGroup
      {...props}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
    >
      {visibleItems}
      {overflowCount > 0
        ? (renderOverflow?.(overflowCount, overflowItems) ?? (
            <AvatarGroupCount className={classNames?.overflow} style={styles?.overflow}>
              +{overflowCount}
            </AvatarGroupCount>
          ))
        : null}
    </PrimitiveAvatarGroup>
  )
}
