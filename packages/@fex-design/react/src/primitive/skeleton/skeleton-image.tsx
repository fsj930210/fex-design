import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonImageClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import type { ComponentProps } from 'react'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonImageProps = ComponentProps<'div'> & SkeletonVisualOptions
export function SkeletonImage({ className, ...props }: SkeletonImageProps) {
  return <SkeletonBlock data-slot="skeleton-image" className={cn(skeletonImageClassName, className)} {...props}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 5h16v14H4z" /><circle cx="9" cy="10" r="2" /><path d="m4 17 4-4 3 3 2-2 7 5" /></svg></SkeletonBlock>
}
