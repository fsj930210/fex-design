import type {
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '../../primitive/scrollbar'
import type { HTMLAttributes, StyleValue } from 'vue'
import type {
  ScrollbarPart,
  ScrollbarRootOptions,
  ScrollbarOverflow,
} from '@fex-design/core/scrollbar/types'

export interface ScrollbarProps extends Omit<ScrollbarRootOptions, 'onScroll'> {
  horizontalBarProps?:
    | Omit<InstanceType<typeof ScrollbarBar>['$props'], 'axis' | 'children'>
    | undefined
  verticalBarProps?:
    | Omit<InstanceType<typeof ScrollbarBar>['$props'], 'axis' | 'children'>
    | undefined
  horizontalTrackProps?:
    | Omit<InstanceType<typeof ScrollbarTrack>['$props'], 'axis' | 'children'>
    | undefined
  verticalTrackProps?:
    | Omit<InstanceType<typeof ScrollbarTrack>['$props'], 'axis' | 'children'>
    | undefined
  horizontalThumbProps?:
    | Omit<InstanceType<typeof ScrollbarThumb>['$props'], 'axis' | 'children'>
    | undefined
  verticalThumbProps?:
    | Omit<InstanceType<typeof ScrollbarThumb>['$props'], 'axis' | 'children'>
    | undefined
  cornerProps?:
    | Omit<InstanceType<typeof ScrollbarCorner>['$props'], 'axis' | 'children'>
    | undefined
  viewportProps?: Omit<HTMLAttributes, 'innerHTML' | 'textContent'> & {
    overflow?: ScrollbarOverflow
  }
  classNames?: Partial<Record<ScrollbarPart, string>>
  styles?: Partial<Record<ScrollbarPart, StyleValue>>
}
