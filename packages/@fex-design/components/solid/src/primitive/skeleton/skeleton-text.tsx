import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonTextClassName } from '@fex-design/components-styles/skeleton'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonTextProps = JSX.HTMLAttributes<HTMLDivElement> &
  SkeletonVisualOptions & { round?: boolean }
export function SkeletonText(props: SkeletonTextProps) {
  const [local, rest] = splitProps(props, ['class', 'round'])
  return (
    <SkeletonBlock
      {...rest}
      data-slot="skeleton-text"
      class={cn(skeletonTextClassName, local.round && 'rounded-full', local.class)}
    />
  )
}
