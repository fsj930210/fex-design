export const tagVariants = ['filled', 'solid', 'outlined'] as const
export type TagVariant = (typeof tagVariants)[number]

export const tagPresetColors = ['primary', 'success', 'warning', 'danger', 'info'] as const
export type TagPresetColor = (typeof tagPresetColors)[number]
export type TagColor = TagPresetColor | (string & {})

export const tagSizes = ['sm', 'md', 'lg'] as const
export type TagSize = (typeof tagSizes)[number]

export interface TagOptions {
  variant?: TagVariant
  color?: TagColor
  size?: TagSize
  disabled?: boolean
}

export type TagPart = 'root' | 'close'
export type TagClassNames = Partial<Record<TagPart, string>>
export type TagStyles<TStyle> = Partial<Record<TagPart, TStyle>>

export interface TagUiOptions<TNode, TStyle> extends TagOptions {
  closable?: boolean
  closeIcon?: TNode
  classNames?: TagClassNames
  styles?: TagStyles<TStyle>
}

export function isTagPresetColor(color: string | undefined): color is TagPresetColor {
  return color !== undefined && (tagPresetColors as readonly string[]).includes(color)
}
