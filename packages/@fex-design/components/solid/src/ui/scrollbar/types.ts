import type {
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '../../primitive/scrollbar'
import type { ComponentProps, JSX } from 'solid-js'
import type { ScrollbarPart } from '@fex-design/core/scrollbar/types'
import type { ScrollbarRootProps, ScrollbarViewportProps } from '../../primitive/scrollbar'

export type ScrollbarProps = ScrollbarRootProps & {
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
  viewportProps?: Omit<ScrollbarViewportProps, 'children'>
  classNames?: Partial<Record<ScrollbarPart, string>>
  styles?: Partial<Record<ScrollbarPart, JSX.CSSProperties | string>>
}
