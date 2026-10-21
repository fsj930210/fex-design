export type ScrollbarAxis = 'x' | 'y'
export type ScrollbarVisibility = 'auto' | 'always' | 'hidden'
export type ScrollbarAutoHide = 'never' | 'scroll' | 'move' | 'leave'
export type ScrollbarClickScroll = false | 'page' | 'jump'
export type ScrollbarOverflowMode = 'auto' | 'hidden'
export type ScrollbarOverflow = {
  x?: ScrollbarOverflowMode | undefined
  y?: ScrollbarOverflowMode | undefined
}
export type ScrollbarPart =
  | 'viewport'
  | 'barX'
  | 'barY'
  | 'trackX'
  | 'trackY'
  | 'thumbX'
  | 'thumbY'
  | 'corner'

export interface ScrollbarOptions {
  /** Bar visibility overrides autoHide. @default 'auto' */
  visibility?: ScrollbarVisibility | undefined
  /** never: persistent; scroll/move: hide after inactivity; leave: hide after pointer leave. */
  autoHide?: ScrollbarAutoHide | undefined
  autoHideDelay?: number | undefined
  dragScroll?: boolean | undefined
  clickScroll?: ScrollbarClickScroll | undefined
  minThumbSize?: number | undefined
  /** Disable custom bar interactions; native viewport scrolling remains available. */
  disabled?: boolean | undefined
  onScroll?: ((detail: ScrollbarScrollDetail) => void) | undefined
}

export interface ScrollbarRootOptions extends ScrollbarOptions {
  /** Show Track and Corner backgrounds without changing their layout or interaction. @default false */
  showTrack?: boolean | undefined
  /** Show Corner background; omitted values inherit showTrack. */
  showCorner?: boolean | undefined
  /** Viewport values override Root values per axis; missing axes default to auto. */
  overflow?: ScrollbarOverflow | undefined
}

export interface ScrollbarScrollDetail {
  scrollLeft: number
  scrollTop: number
}

export interface ScrollbarController {
  connect(root: HTMLElement): () => void
  /** Replace the configuration snapshot without reconnecting DOM listeners. */
  setOptions(options: ScrollbarOptions): void
  update(): void
  scrollTo(options: ScrollToOptions): void
  scrollBy(options: ScrollToOptions): void
  destroy(): void
}
