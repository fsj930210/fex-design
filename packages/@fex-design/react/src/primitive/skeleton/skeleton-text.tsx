import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonTextClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import type { ComponentProps } from 'react'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonTextProps = ComponentProps<'div'> & SkeletonVisualOptions & { round?: boolean }
export function SkeletonText({ className, round, ...props }: SkeletonTextProps) {
  return <SkeletonBlock data-slot="skeleton-text" className={cn(skeletonTextClassName, round && 'rounded-full', className)} {...props} />
}
