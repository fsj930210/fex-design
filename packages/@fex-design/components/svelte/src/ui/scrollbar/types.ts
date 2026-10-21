import type {
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '../../primitive/scrollbar'
import type { ComponentProps, Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type {
  ScrollbarPart,
  ScrollbarRootOptions,
  ScrollbarScrollDetail,
  ScrollbarOverflow,
} from '@fex-design/core/scrollbar/types'

export interface ScrollbarProps
  extends HTMLAttributes<HTMLDivElement>, Omit<ScrollbarRootOptions, 'onScroll'> {
  children?: Snippet
  element?: HTMLDivElement | undefined
  viewportElement?: HTMLDivElement | undefined
  horizontalBarProps?: Omit<ComponentProps<typeof ScrollbarBar>, 'axis' | 'children'> | undefined
  verticalBarProps?: Omit<ComponentProps<typeof ScrollbarBar>, 'axis' | 'children'> | undefined
  horizontalTrackProps?:
    | Omit<ComponentProps<typeof ScrollbarTrack>, 'axis' | 'children'>
    | undefined
  verticalTrackProps?: Omit<ComponentProps<typeof ScrollbarTrack>, 'axis' | 'children'> | undefined
  horizontalThumbProps?:
    | Omit<ComponentProps<typeof ScrollbarThumb>, 'axis' | 'children'>
    | undefined
  verticalThumbProps?: Omit<ComponentProps<typeof ScrollbarThumb>, 'axis' | 'children'> | undefined
  cornerProps?: Omit<ComponentProps<typeof ScrollbarCorner>, 'axis' | 'children'> | undefined
  viewportProps?: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    overflow?: ScrollbarOverflow
  }
  classNames?: Partial<Record<ScrollbarPart, string>>
  styles?: Partial<Record<ScrollbarPart, string>>
  onScrollChange?: (detail: ScrollbarScrollDetail) => void
}
