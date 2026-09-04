export type AnchorActiveMode = 'current' | 'progress'

export type AnchorOrientation = 'vertical' | 'horizontal'

export interface AnchorTargetRef {
  readonly current: HTMLElement | null
}

export type AnchorTarget =
  | string
  | HTMLElement
  | AnchorTargetRef
  | (() => HTMLElement | null)

export interface AnchorItem<TTitle = unknown> {
  key: string
  title: TTitle
  target: AnchorTarget
  targetOffset?: number
  children?: AnchorItem<TTitle>[]
}

export interface AnchorRegisteredItem {
  key: string
  target: AnchorTarget
  targetOffset?: number
  parentKey?: string
}

export type AnchorPart = 'root' | 'list' | 'item' | 'link' | 'rail' | 'indicator'

export type AnchorClassNames = Partial<Record<AnchorPart, string>>

export type AnchorStyles<TStyle> = Partial<Record<AnchorPart, TStyle>>

export interface AnchorFlatItem<TTitle = unknown> {
  item: AnchorItem<TTitle>
  level: number
  index: number
  parentKeys: readonly string[]
}

export interface AnchorTargetPosition<TItem extends { key: string } = { key: string }> {
  item: TItem
  top: number
}

export interface AnchorActiveGroup {
  keys: readonly string[]
  level: number
}

export interface AnchorSnapshot {
  activeKeys: readonly string[]
}

export interface AnchorControllerOptions<TTitle = unknown> {
  activeKeys?: readonly string[]
  defaultActiveKeys?: readonly string[]
  onChange?: (activeKeys: readonly string[], items: readonly AnchorItem<TTitle>[]) => void
}

export interface AnchorController<TTitle = unknown> {
  getSnapshot(): AnchorSnapshot
  subscribe(listener: () => void): () => void
  updateOptions(options: AnchorControllerOptions<TTitle>): void
  change(activeKeys: readonly string[], items: readonly AnchorItem<TTitle>[]): void
}
