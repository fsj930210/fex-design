import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonAnimationVariants, skeletonBaseClassName, skeletonBlockClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import type { ComponentProps } from 'react'
export type SkeletonBlockProps = ComponentProps<'div'> & SkeletonVisualOptions
export function SkeletonBlock({ animation, className, ...props }: SkeletonBlockProps) {
  return <div aria-hidden="true" data-slot="skeleton-block" className={cn(skeletonBaseClassName, skeletonBlockClassName, skeletonAnimationVariants({ animation }), className)} {...props} />
}
