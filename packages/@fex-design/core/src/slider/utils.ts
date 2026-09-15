import type { SliderDirection, SliderOrientation } from './types'

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export function getDecimalCount(value: number) {
  if (!Number.isFinite(value)) return 0
  const stringValue = value.toString()
  if (!stringValue.includes('e')) return stringValue.split('.')[1]?.length ?? 0
  const [coefficient, exponent] = stringValue.split('e')
  return Math.max(0, (coefficient?.split('.')[1]?.length ?? 0) - Number(exponent))
}

export function roundValue(value: number, decimalCount: number) {
  const rounder = 10 ** decimalCount
  return Math.round(value * rounder) / rounder
}

export function snapValueToStep(value: number, min: number, max: number, step: number) {
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1
  const decimals = Math.max(getDecimalCount(safeStep), getDecimalCount(min))
  return clamp(
    roundValue(Math.round((value - min) / safeStep) * safeStep + min, decimals),
    min,
    max,
  )
}

export function getClosestValue(values: readonly number[], value: number) {
  return values.reduce((closest, item) =>
    Math.abs(item - value) < Math.abs(closest - value) ? item : closest,
  )
}

export function normalizeSliderValue(
  value: number,
  min: number,
  max: number,
  step: number | null,
  marks: readonly number[],
) {
  if (step === null) return getClosestValue([min, ...marks, max], clamp(value, min, max))
  return snapValueToStep(value, min, max, step)
}

export function convertValueToPercentage(value: number, min: number, max: number) {
  if (max === min) return 0
  return clamp(((value - min) / (max - min)) * 100, 0, 100)
}

export function isSliderReversed(
  orientation: SliderOrientation,
  direction: SliderDirection,
  reverse: boolean,
) {
  return reverse !== (orientation === 'horizontal' && direction === 'rtl')
}

export function getSliderValueFromPointer(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  min: number,
  max: number,
  orientation: SliderOrientation,
  direction: SliderDirection = 'ltr',
  reverse = false,
) {
  const raw =
    orientation === 'vertical'
      ? (rect.bottom - clientY) / rect.height
      : (clientX - rect.left) / rect.width
  const percent = isSliderReversed(orientation, direction, reverse) ? 1 - raw : raw
  return min + percent * (max - min)
}

export function getClosestValueIndex(
  values: readonly number[],
  nextValue: number,
  disabled: readonly boolean[] = [],
) {
  let closestIndex = -1
  let closestDistance = Number.POSITIVE_INFINITY
  values.forEach((value, index) => {
    const distance = Math.abs(value - nextValue)
    if (!disabled[index] && distance < closestDistance) {
      closestIndex = index
      closestDistance = distance
    }
  })
  return closestIndex
}

export function isSliderMarkActive(values: readonly number[], mark: number) {
  if (values.length < 2) return mark <= (values[0] ?? Number.NEGATIVE_INFINITY)
  return mark >= values[0]! && mark <= values.at(-1)!
}

export function getSliderRangeDisabledState(
  values: readonly number[],
  disabledThumbs: readonly boolean[],
  orientation: SliderOrientation,
  direction: SliderDirection,
  reverse: boolean,
) {
  if (values.length <= 1) {
    return { disabled: disabledThumbs[0] === true, backgroundImage: undefined }
  }
  const spans = values.slice(0, -1).map((value, index) => ({
    size: values[index + 1]! - value,
    disabled: disabledThumbs[index] === true && disabledThumbs[index + 1] === true,
  }))
  if (spans.every((span) => span.disabled)) return { disabled: true, backgroundImage: undefined }
  if (spans.every((span) => !span.disabled)) return { disabled: false, backgroundImage: undefined }
  const reversed = isSliderReversed(orientation, direction, reverse)
  const visualSpans = reversed ? [...spans].reverse() : spans
  const total = visualSpans.reduce((sum, span) => sum + span.size, 0)
  let offset = 0
  const stops = visualSpans.flatMap((span) => {
    const start = (offset / total) * 100
    offset += span.size
    const end = (offset / total) * 100
    const color = span.disabled
      ? 'var(--slider-disabled-range-background)'
      : 'transparent'
    return [`${color} ${start}%`, `${color} ${end}%`]
  })
  return {
    disabled: false,
    backgroundImage: `linear-gradient(to ${orientation === 'vertical' ? 'top' : 'right'}, ${stops.join(', ')})`,
  }
}
