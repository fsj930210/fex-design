import { createMemo } from 'solid-js'
import {
  getProgressRanges, getCircleStepsGeometry, getLineStepsGeometry, getLinearProgressBackground,
  getProgressGradientStops, getProgressStepColor, normalizeProgressValue, resolveProgressStatus,
} from '@fex-design/core/progress/progress'
import type { ProgressProps } from './types'

export function useProgress(props: ProgressProps) {
  const rangeLayout = createMemo(() => props.ranges !== undefined && (props.variant ?? 'line') === 'line' && !(props.steps && props.steps > 0) ? getProgressRanges(props.ranges, props.min, props.max) : null)
  const value = () => rangeLayout()?.value ?? (props.value === undefined ? 0 : props.value)
  const min = () => props.min ?? 0
  const max = () => props.max ?? 100
  const variant = () => props.variant ?? 'line'
  const placement = () => props.infoPlacement ?? 'outside'
  const linecap = () => props.linecap ?? 'round'
  const normalized = createMemo(() => normalizeProgressValue(value(), min(), max()))
  const status = createMemo(() => props.success ? 'success' : resolveProgressStatus(props.status, value(), min(), max()))
  const showInfo = () => props.showInfo ?? props.showValue ?? (variant() === 'line' || placement() === 'inside')
  const size = () => typeof props.size === 'number' ? props.size
    : props.size === 'sm' ? (variant() === 'line' ? 4 : 32)
    : props.size === 'lg' ? (variant() === 'line' ? 12 : 96)
    : variant() === 'line' ? 8 : 48
  const thickness = () => props.thickness ?? (
    typeof props.size === 'number' && variant() === 'line' ? props.size
    : props.size === 'sm' ? 4 : props.size === 'lg' ? 8 : variant() === 'line' ? 8 : 4)
  const isCircle = () => variant() === 'circle' || variant() === 'dashboard'
  const lineSteps = createMemo(() => props.steps && props.steps > 0 && !isCircle()
    ? getLineStepsGeometry({ value: value(), min: min(), max: max(), steps: props.steps }) : null)
  const circleSteps = createMemo(() => props.steps && props.steps > 0 && isCircle()
    ? getCircleStepsGeometry({ value: value(), min: min(), max: max(), steps: props.steps, size: size(), thickness: thickness(), gap: props.gap ?? 2 }) : null)
  const gradient = createMemo(() => getProgressGradientStops(props.color)?.map(([offset, color]) => ({
    offset: `${Number.parseFloat(offset)}%`, color,
  })))
  const background = createMemo(() => getLinearProgressBackground(props.color))
  const rootStyle = () => typeof props.style === 'string'
    ? `${Object.entries(props.styles?.root ?? {}).map(([key, value]) => `${key}: ${value};`).join(' ')} ${props.style}`
    : { ...props.styles?.root, ...props.style }
  const rangeStyle = () => ({
    ...(background() ? { background: background() } : {}),
    ...props.styles?.range,
  })
  const trackStyle = () => ({
    height: `${thickness()}px`,
    ...(props.trackColor ? { 'background-color': props.trackColor } : {}),
    ...props.styles?.track,
  })
  const stepColor = (index: number) => status() === 'success'
    ? 'var(--success)' : getProgressStepColor(props.color, index, props.steps!)
  const activeColor = () => status() === 'success' ? 'var(--success)' : background() ?? 'var(--primary)'
  return { rangeLayout, value, min, max, variant, placement, linecap, normalized, status, showInfo, size, thickness,
    isCircle, lineSteps, circleSteps, gradient, rootStyle, rangeStyle, trackStyle, stepColor, activeColor }
}
