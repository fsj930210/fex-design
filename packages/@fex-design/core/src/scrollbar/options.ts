import type { ScrollbarOptions, ScrollbarOverflow, ScrollbarOverflowMode } from './types'

export function resolveScrollbarOptions(input: ScrollbarOptions) {
  return {
    visibility: input.visibility ?? 'auto',
    autoHide: input.autoHide ?? 'scroll',
    autoHideDelay: Math.max(0, input.autoHideDelay ?? 900),
    dragScroll: input.dragScroll ?? true,
    clickScroll: input.clickScroll ?? false,
    minThumbSize: Math.max(0, input.minThumbSize ?? 24),
    disabled: input.disabled ?? false,
    onScroll: input.onScroll,
  }
}

/** Resolve axes independently so a partial Viewport override preserves Root policy. */
export function resolveScrollbarOverflow(
  viewport?: ScrollbarOverflow,
  root?: ScrollbarOverflow,
): { x: ScrollbarOverflowMode; y: ScrollbarOverflowMode } {
  return { x: viewport?.x ?? root?.x ?? 'auto', y: viewport?.y ?? root?.y ?? 'auto' }
}

export type ResolvedScrollbarOptions = ReturnType<typeof resolveScrollbarOptions>
