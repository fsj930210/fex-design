import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonInputBlockClassName, skeletonInputClassName } from '@fex-design/components-styles/skeleton'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonInputProps = ComponentProps<'div'> & SkeletonVisualOptions & { block?: boolean }
export function SkeletonInput({ block, className, ...props }: SkeletonInputProps) {
  return (
    <SkeletonBlock
      data-slot="skeleton-input"
      className={cn(skeletonInputClassName, block && skeletonInputBlockClassName, className)}
      {...props}
    />
  )
}
