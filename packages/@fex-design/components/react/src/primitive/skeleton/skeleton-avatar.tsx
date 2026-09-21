import type { SkeletonAvatarOptions } from '@fex-design/core/skeleton/types'
import { skeletonAvatarClassName } from '@fex-design/components-styles/skeleton'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonAvatarProps = ComponentProps<'div'> & SkeletonAvatarOptions
export function SkeletonAvatar({ className, shape, size, ...props }: SkeletonAvatarProps) {
  return (
    <SkeletonBlock
      data-slot="skeleton-avatar"
      className={cn(skeletonAvatarClassName({ shape, size }), className)}
      {...props}
    />
  )
}
