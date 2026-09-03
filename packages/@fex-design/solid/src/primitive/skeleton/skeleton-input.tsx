import type { SkeletonVisualOptions } from '@fex-design/core/skeleton/types'
import { skeletonInputBlockClassName, skeletonInputClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonInputProps = JSX.HTMLAttributes<HTMLDivElement> & SkeletonVisualOptions & { block?: boolean }
export function SkeletonInput(props: SkeletonInputProps) { const [local, rest] = splitProps(props, ['block', 'class']); return <SkeletonBlock {...rest} data-slot="skeleton-input" class={cn(skeletonInputClassName, local.block && skeletonInputBlockClassName, local.class)} /> }
