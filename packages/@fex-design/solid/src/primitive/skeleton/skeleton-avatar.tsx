import type { SkeletonAvatarOptions } from '@fex-design/core/skeleton/types'
import { skeletonAvatarClassName } from '@fex-design/styles/skeleton'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
import { SkeletonBlock } from './skeleton-block'
export type SkeletonAvatarProps = JSX.HTMLAttributes<HTMLDivElement> & SkeletonAvatarOptions
export function SkeletonAvatar(props: SkeletonAvatarProps) { const [local, rest] = splitProps(props, ['class', 'shape', 'size']); return <SkeletonBlock {...rest} data-slot="skeleton-avatar" class={cn(skeletonAvatarClassName({ shape: local.shape, size: local.size }), local.class)} /> }
