export const badgePresetColors = ['primary', 'info', 'success', 'warning', 'danger'] as const
export type BadgePresetColor = (typeof badgePresetColors)[number]
export type BadgeColor = BadgePresetColor | (string & {})
export type BadgePlacement = 'start' | 'end'
export type BadgeOffset = readonly [inline: number | string, block: number | string]

const toCssLength = (value: number | string) => (typeof value === 'number' ? `${value}px` : value)

export function getBadgeOffsetTransform(offset?: BadgeOffset) {
  return offset
    ? `translate(calc(50% + ${toCssLength(offset[0])}), calc(-50% + ${toCssLength(offset[1])}))`
    : undefined
}

export function isBadgePresetColor(color: string | undefined): color is BadgePresetColor {
  return color !== undefined && (badgePresetColors as readonly string[]).includes(color)
}

export interface BadgeOptions<TContent = string | number> {
  color?: BadgeColor
  count?: TContent
  showZero?: boolean
  overflowCount?: number
}

export interface BadgeDotOptions {
  color?: BadgeColor
}

export interface BadgeAttachmentOptions {
  offset?: BadgeOffset
}

export type BadgePart = 'root' | 'content' | 'indicator'
export type BadgeClassNames = Partial<Record<BadgePart, string>>
export type BadgeStyles<TStyle> = Partial<Record<BadgePart, TStyle>>

export interface BadgeGroupOptions {
  maxCount?: number
}

export interface BadgeRibbonOptions {
  color?: BadgeColor
  placement?: BadgePlacement
}
