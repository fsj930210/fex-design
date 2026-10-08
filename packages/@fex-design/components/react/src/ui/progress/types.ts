import type { ComponentProps, CSSProperties, ReactNode, Ref } from 'react'
import type { ProgressRangeItem, ProgressColor, ProgressGapPlacement, ProgressInfoPlacement, ProgressLinecap, ProgressSize, ProgressStatus, ProgressVariant } from '@fex-design/core/progress/types'

export interface ProgressProps extends Omit<ComponentProps<'div'>, 'color'> {
  ref?: Ref<HTMLDivElement>
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
  label?: ReactNode
  format?: (percent: number | null, value: number | null) => ReactNode
  success?: boolean
  classNames?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', string>>
  styles?: Partial<Record<'root' | 'track' | 'range' | 'info' | 'label' | 'step', CSSProperties>>
}

