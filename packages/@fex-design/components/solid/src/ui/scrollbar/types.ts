import type { JSX } from 'solid-js'
import type { ScrollbarPart } from '@fex-design/core/scrollbar/types'
import type { ScrollbarRootProps, ScrollbarViewportProps } from '../../primitive/scrollbar'

export type ScrollbarProps = ScrollbarRootProps & {
  viewportProps?: Omit<ScrollbarViewportProps, 'children'>
  classNames?: Partial<Record<ScrollbarPart, string>>
  styles?: Partial<Record<ScrollbarPart, JSX.CSSProperties | string>>
}
