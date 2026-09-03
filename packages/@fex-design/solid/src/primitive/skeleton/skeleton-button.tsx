import type { SkeletonButtonShape, SkeletonButtonSize, SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonButtonClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonButtonProps = JSX.HTMLAttributes<HTMLDivElement> & SkeletonVisualOptions & { block?: boolean; shape?: SkeletonButtonShape; size?: SkeletonButtonSize }
export function SkeletonButton(props: SkeletonButtonProps) { const [local, rest] = splitProps(props, ['block', 'class', 'shape', 'size']); return <SkeletonBlock {...rest} data-slot="skeleton-button" class={cn(skeletonButtonClassName({ block: local.block, shape: local.shape, size: local.size }), local.class)} /> }
