export type AvatarPart = 'root' | 'image' | 'fallback'
export type AvatarClassNames = Partial<Record<AvatarPart, string>>
export type AvatarStyles<TStyle> = Partial<Record<AvatarPart, TStyle>>

export type AvatarGroupPart = 'root' | 'overflow'
export type AvatarGroupClassNames = Partial<Record<AvatarGroupPart, string>>
export type AvatarGroupStyles<TStyle> = Partial<Record<AvatarGroupPart, TStyle>>
