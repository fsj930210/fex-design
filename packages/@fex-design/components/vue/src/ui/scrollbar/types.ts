import type { HTMLAttributes, StyleValue } from 'vue'
import type { ScrollbarPart, ScrollbarRootOptions, ScrollbarOverflow } from '@fex-design/core/scrollbar/types'

export interface ScrollbarProps extends Omit<ScrollbarRootOptions, 'onScroll'> {
  viewportProps?: Omit<HTMLAttributes, 'innerHTML' | 'textContent'> & { overflow?: ScrollbarOverflow }
  classNames?: Partial<Record<ScrollbarPart, string>>
  styles?: Partial<Record<ScrollbarPart, StyleValue>>
}
