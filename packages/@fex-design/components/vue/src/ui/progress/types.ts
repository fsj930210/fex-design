import type { CSSProperties } from 'vue'
import type {
  ProgressRangeItem, ProgressColor, ProgressGapPlacement, ProgressInfoPlacement, ProgressLinecap,
  ProgressSize, ProgressStatus, ProgressVariant,
} from '@fex-design/core/progress/types'

export interface ProgressProps {
  value?: number | null
  min?: number
  max?: number
  variant?: ProgressVariant
  status?: ProgressStatus
  size?: ProgressSize
  thickness?: number
  ranges?: readonly ProgressRangeItem[]
  steps?: number
  gap?: number
  color?: ProgressColor
  trackColor?: string
  linecap?: ProgressLinecap
  trackLinecap?: ProgressLinecap
  gapDegree?: number
  gapPlacement?: ProgressGapPlacement
  showInfo?: boolean
  showValue?: boolean
  infoPlacement?: ProgressInfoPlacement
  label?: string
  format?: (percent: number | null, value: number | null) => string | number
  success?: boolean
  classNames?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', string>>
  styles?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', CSSProperties>>
}
