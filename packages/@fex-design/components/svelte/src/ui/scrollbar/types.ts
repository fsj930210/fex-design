import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ScrollbarPart, ScrollbarRootOptions, ScrollbarScrollDetail, ScrollbarOverflow } from '@fex-design/core/scrollbar/types'

export interface ScrollbarProps extends HTMLAttributes<HTMLDivElement>, Omit<ScrollbarRootOptions, 'onScroll'> {
  children?: Snippet
  element?: HTMLDivElement | undefined
  viewportElement?: HTMLDivElement | undefined
  viewportProps?: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { overflow?: ScrollbarOverflow }
  classNames?: Partial<Record<ScrollbarPart, string>>
  styles?: Partial<Record<ScrollbarPart, string>>
  onScrollChange?: (detail: ScrollbarScrollDetail) => void
}
