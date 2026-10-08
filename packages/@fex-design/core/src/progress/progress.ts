import type { CircleStepsGeometry, ProgressRangeItem, ProgressColor, ProgressGeometry, ProgressVariant } from "./types"
import type { ProgressStatus } from "./types"

export function normalizeProgressValue(value: number | null | undefined, min = 0, max = 100) {
  const safeMin = Number.isFinite(min) ? min : 0
  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 1
  if (value === null || value === undefined || !Number.isFinite(value))
    return { value: null, min: safeMin, max: safeMax, percentage: null }
  const current = Math.min(safeMax, Math.max(safeMin, value))
  return {
    value: current,
    min: safeMin,
    max: safeMax,
    percentage: (current - safeMin) / (safeMax - safeMin),
  }
}

export function resolveProgressStatus(
  status: ProgressStatus | undefined,
  value: number | null | undefined,
  min = 0,
  max = 100,
): ProgressStatus {
  if (status) return status
  const normalized = normalizeProgressValue(value, min, max)
  if (normalized.percentage === null || normalized.percentage <= 0) return "pending"
  if (normalized.percentage >= 1) return "success"
  return "active"
}

export function getProgressGeometry(options: {
  value?: number | null | undefined
  min?: number | undefined
  max?: number | undefined
  size?: number | undefined
  thickness?: number | undefined
  variant?: ProgressVariant | undefined
  gapDegree?: number | undefined
}): ProgressGeometry {
  const { value, percentage } = normalizeProgressValue(options.value, options.min, options.max)
  const size = Math.max(1, options.size ?? 48)
  const thickness = Math.min(size, Math.max(1, options.thickness ?? 4))
  const radius = Math.max(0, (size - thickness) / 2)
  const circumference = 2 * Math.PI * radius
  const gapDegree =
    options.variant === "dashboard" ? Math.min(295, Math.max(0, options.gapDegree ?? 75)) : 0
  const arcRatio = (360 - gapDegree) / 360
  const rangeLength = arcRatio * (percentage ?? 0.25) * 100
  return {
    value,
    percentage,
    radius,
    center: size / 2,
    circumference,
    trackDasharray: `${arcRatio * 100} 100`,
    rangeDasharray: `${rangeLength} 100`,
    dashOffset: 0,
    rotation: options.variant === "dashboard" ? 90 + gapDegree / 2 : -90,
    arcRatio,
  }
}

export function getCircleStepsGeometry(options: {
  value?: number | null | undefined
  min?: number | undefined
  max?: number | undefined
  size?: number | undefined
  thickness?: number | undefined
  steps?: number | undefined
  gap?: number | undefined
}): CircleStepsGeometry {
  const size = Math.max(1, options.size ?? 96)
  const thickness = Math.max(1, options.thickness ?? 8)
  const radius = Math.max(0, (size - thickness) / 2)
  const circumference = 2 * Math.PI * radius
  const steps = Math.max(1, options.steps ?? 10)
  const gap = Math.max(0, options.gap ?? 2)
  const stepAngle = 360 / steps
  const gapAngle = circumference > 0 ? (gap / circumference) * 360 : 0
  const activeAngle = Math.max(0, stepAngle - gapAngle)
  const stepLength = (activeAngle / 360) * circumference
  const gapLength = (gapAngle / 360) * circumference
  const normalized = normalizeProgressValue(options.value, options.min, options.max)
  const activeSteps = Math.round((normalized.percentage ?? 0) * steps)
  const stepItems = Array.from({ length: steps }).map((_, index) => {
    const offset = (index * stepAngle / 360) * circumference
    return {
      index,
      active: index < activeSteps,
      offset: -offset,
    }
  })
  return {
    size,
    thickness,
    radius,
    circumference,
    activeSteps,
    stepDasharray: `${stepLength} ${gapLength + circumference}`,
    stepLength,
    gapLength,
    steps: stepItems,
  }
}

export function getLineStepsGeometry(options: {
  value?: number | null | undefined
  min?: number | undefined
  max?: number | undefined
  steps?: number | undefined
}) {
  const steps = Math.max(1, options.steps ?? 5)
  const normalized = normalizeProgressValue(options.value, options.min, options.max)
  const activeSteps = Math.round((normalized.percentage ?? 0) * steps)
  return {
    total: steps,
    activeSteps,
    steps: Array.from({ length: steps }).map((_, index) => ({
      index,
      active: index < activeSteps,
    })),
  }
}

export function getProgressGradientStops(
  color: ProgressColor | undefined,
): [string, string][] | null {
  if (!color || typeof color === "string") return null
  if ("from" in color)
    return [
      ["0%", color.from],
      ["100%", color.to],
    ]
  return Object.entries(color.stops).sort(([a], [b]) => Number.parseFloat(a) - Number.parseFloat(b))
}

export function getLinearProgressBackground(color: ProgressColor | undefined) {
  if (!color) return undefined
  if (typeof color === "string") return color
  const stops = getProgressGradientStops(color) ?? []
  return `linear-gradient(${color.direction ?? "to right"}, ${stops.map(([offset, value]) => `${value} ${offset}`).join(", ")})`
}

export function getProgressStepColor(color: ProgressColor | undefined, index: number, steps: number) {
  if (!color) return 'var(--primary)'
  if (typeof color === 'string') return color
  if ('stops' in color) {
    const position = ((index + 1) / steps) * 100
    const stops = Object.entries(color.stops)
      .map(([key, value]) => [Number.parseFloat(key), value] as const)
      .sort((a, b) => a[0] - b[0])
    return [...stops].reverse().find(([stop]) => position >= stop)?.[1]
      ?? stops[0]?.[1] ?? 'var(--primary)'
  }
  return index < steps / 2 ? color.from : color.to
}

export function getProgressRanges(ranges: readonly ProgressRangeItem[], min = 0, max = 100) {
  const limits = normalizeProgressValue(min, min, max)
  const capacity = limits.max - limits.min
  let used = 0
  const items = ranges.map((range, index) => {
    const amount = Math.min(capacity - used, Number.isFinite(range.value) ? Math.max(0, range.value) : 0)
    const offset = used / capacity * 100
    used += amount
    return { index, value: limits.min + amount, offset, color: range.color }
  })
  return { value: limits.min + used, ranges: items }
}
