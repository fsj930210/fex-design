import type { CSSProperties } from 'react'
import type { ScrollbarPart } from '@fex-design/core/scrollbar/types'
import type { ScrollbarRootProps, ScrollbarViewportProps } from '../../primitive/scrollbar'

export interface ScrollbarProps extends ScrollbarRootProps {
  viewportProps?: Omit<ScrollbarViewportProps, 'children'>
  classNames?: Partial<Record<ScrollbarPart, string>>
  styles?: Partial<Record<ScrollbarPart, CSSProperties>>
}
