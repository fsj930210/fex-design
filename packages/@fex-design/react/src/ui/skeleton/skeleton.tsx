import type {
  SkeletonClassNames,
  SkeletonOptions,
  SkeletonParagraphOptions,
  SkeletonStyles,
  SkeletonWidth,
} from '@fex-design/core/skeleton/types'
import {
  skeletonAvatarAreaClassName,
  skeletonBodyClassName,
  skeletonParagraphClassName,
  skeletonRootClassName,
  skeletonTitleClassName,
} from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { SkeletonAvatar } from '../../primitive/skeleton/skeleton-avatar'
import { SkeletonText } from '../../primitive/skeleton/skeleton-text'
export type SkeletonProps = Omit<ComponentProps<'div'>, 'title'> &
  SkeletonOptions & {
    classNames?: SkeletonClassNames
    placeholder?: ReactNode
    styles?: SkeletonStyles<CSSProperties>
  }
const widthStyle = (width: SkeletonWidth | undefined): CSSProperties | undefined =>
  width === undefined ? undefined : { width }
function paragraphWidth(options: SkeletonParagraphOptions, index: number, rows: number) {
  if (Array.isArray(options.width)) return options.width[index]
  return index === rows - 1 ? options.width : undefined
}
export function Skeleton({
  animation,
  avatar = false,
  children,
  className,
  classNames,
  loading,
  paragraph = true,
  placeholder,
  round,
  style,
  styles,
  title = true,
  ...props
}: SkeletonProps) {
  if (loading === false) return children
  if (placeholder !== undefined) return placeholder
  const avatarOptions = typeof avatar === 'object' ? avatar : {}
  const titleOptions = typeof title === 'object' ? title : {}
  const paragraphOptions = typeof paragraph === 'object' ? paragraph : {}
  const rows = Math.max(0, Math.floor(paragraphOptions.rows ?? 3))
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton-root"
      className={cn(skeletonRootClassName, classNames?.root, className)}
      style={{ ...styles?.root, ...style }}
      {...props}
    >
      {avatar && (
        <div className={skeletonAvatarAreaClassName}>
          <SkeletonAvatar
            animation={avatarOptions.animation ?? animation}
            shape={avatarOptions.shape}
            size={avatarOptions.size}
            className={classNames?.avatar}
            style={styles?.avatar}
          />
        </div>
      )}
      <div className={skeletonBodyClassName}>
        {title && (
          <SkeletonText
            animation={animation}
            round={round}
            className={cn(skeletonTitleClassName, classNames?.title)}
            style={{ ...widthStyle(titleOptions.width), ...styles?.title }}
          />
        )}
        {paragraph && rows > 0 && (
          <div className={skeletonParagraphClassName}>
            {Array.from({ length: rows }, (_, index) => (
              <SkeletonText
                key={index}
                animation={animation}
                round={round}
                className={classNames?.paragraph}
                style={{
                  ...widthStyle(paragraphWidth(paragraphOptions, index, rows)),
                  ...styles?.paragraph,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
