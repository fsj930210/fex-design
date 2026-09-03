import type { SkeletonButtonShape, SkeletonButtonSize, SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonButtonClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import type { ComponentProps } from 'react'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonButtonProps = ComponentProps<'div'> & SkeletonVisualOptions & { block?: boolean; shape?: SkeletonButtonShape; size?: SkeletonButtonSize }
export function SkeletonButton({ block, className, shape, size, ...props }: SkeletonButtonProps) {
  return <SkeletonBlock data-slot="skeleton-button" className={cn(skeletonButtonClassName({ block, shape, size }), className)} {...props} />
}
