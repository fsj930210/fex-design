import { computed } from 'vue'
import {
  getProgressRanges, getCircleStepsGeometry, getLineStepsGeometry, getLinearProgressBackground,
  getProgressGradientStops, getProgressStepColor, normalizeProgressValue, resolveProgressStatus,
} from '@fex-design/core/progress/progress'
import type { ProgressProps } from './types'

export function useProgress(props: Readonly<ProgressProps>) {
  const rangeLayout = computed(() => props.ranges !== undefined && props.variant === 'line' && !(props.steps && props.steps > 0) ? getProgressRanges(props.ranges, props.min, props.max) : null)
  const effectiveValue = computed(() => rangeLayout.value?.value ?? props.value)
  const normalized = computed(() => normalizeProgressValue(effectiveValue.value, props.min, props.max))
  const status = computed(() => props.success ? 'success' : resolveProgressStatus(props.status, effectiveValue.value, props.min, props.max))
  const showInfo = computed(() => props.showInfo ?? props.showValue ?? (props.variant === 'line' || props.infoPlacement === 'inside'))
  const size = computed(() => typeof props.size === 'number' ? props.size
    : props.size === 'sm' ? (props.variant === 'line' ? 4 : 32)
    : props.size === 'lg' ? (props.variant === 'line' ? 12 : 96)
    : props.variant === 'line' ? 8 : 48)
  const thickness = computed(() => props.thickness ?? (
    typeof props.size === 'number' && props.variant === 'line' ? props.size
    : props.size === 'sm' ? 4 : props.size === 'lg' ? 8 : props.variant === 'line' ? 8 : 4))
  const isCircle = computed(() => props.variant === 'circle' || props.variant === 'dashboard')
  const lineSteps = computed(() => props.steps && props.steps > 0 && !isCircle.value
    ? getLineStepsGeometry({ value: props.value, min: props.min, max: props.max, steps: props.steps }) : null)
  const circleSteps = computed(() => props.steps && props.steps > 0 && isCircle.value
    ? getCircleStepsGeometry({ value: props.value, min: props.min, max: props.max, steps: props.steps, size: size.value, thickness: thickness.value, gap: props.gap }) : null)
  const gradient = computed(() => getProgressGradientStops(props.color)?.map(([offset, color]) => ({
    offset: `${Number.parseFloat(offset)}%`, color,
  })))
  const background = computed(() => getLinearProgressBackground(props.color))
  const rangeStyle = computed(() => ({
    ...(background.value ? { background: background.value } : {}),
    ...props.styles?.range,
  }))
  const trackStyle = computed(() => ({
    height: `${thickness.value}px`,
    ...(props.trackColor ? { backgroundColor: props.trackColor } : {}),
    ...props.styles?.track,
  }))
  const stepColor = (index: number) => status.value === 'success'
    ? 'var(--success)' : getProgressStepColor(props.color, index, props.steps!)
  const activeColor = computed(() => status.value === 'success' ? 'var(--success)' : background.value ?? 'var(--primary)')
  return { rangeLayout, effectiveValue, normalized, status, showInfo, size, thickness, isCircle, lineSteps, circleSteps, gradient, rangeStyle, trackStyle, stepColor, activeColor }
}
