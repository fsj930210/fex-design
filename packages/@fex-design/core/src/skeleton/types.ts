import type { ButtonSize } from '../button/types'

export type SkeletonAnimation = 'none' | 'pulse' | 'wave'
export type SkeletonWidth = number | string
export type SkeletonAvatarSize = 'sm' | 'md' | 'lg'
export type SkeletonAvatarShape = 'circle' | 'square'
export type SkeletonButtonSize = Exclude<ButtonSize, `icon${string}`>
export type SkeletonButtonShape = 'round' | 'square' | 'circle'
export type SkeletonSemanticSlot = 'root' | 'avatar' | 'title' | 'paragraph'

export interface SkeletonVisualOptions {
  animation?: SkeletonAnimation
}

export interface SkeletonAvatarOptions extends SkeletonVisualOptions {
  shape?: SkeletonAvatarShape
  size?: SkeletonAvatarSize
}

export interface SkeletonTitleOptions {
  width?: SkeletonWidth
}

export interface SkeletonParagraphOptions {
  rows?: number
  width?: SkeletonWidth | SkeletonWidth[]
}

export interface SkeletonOptions extends SkeletonVisualOptions {
  avatar?: boolean | SkeletonAvatarOptions
  loading?: boolean
  paragraph?: boolean | SkeletonParagraphOptions
  round?: boolean
  title?: boolean | SkeletonTitleOptions
}

export type SkeletonClassNames = Partial<Record<SkeletonSemanticSlot, string>>
export type SkeletonStyles<TStyle> = Partial<Record<SkeletonSemanticSlot, TStyle>>
