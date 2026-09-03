import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonAnimationVariants, skeletonBaseClassName, skeletonBlockClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
export type SkeletonBlockProps = JSX.HTMLAttributes<HTMLDivElement> & SkeletonVisualOptions
export function SkeletonBlock(props: SkeletonBlockProps) {
  const [local, rest] = splitProps(props, ['animation', 'class'])
  return <div {...rest} aria-hidden="true" data-slot="skeleton-block" class={cn(skeletonBaseClassName, skeletonBlockClassName, skeletonAnimationVariants({ animation: local.animation }), local.class)} />
}
