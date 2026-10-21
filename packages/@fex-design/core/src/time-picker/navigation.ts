import type { TimePeriod, TimePickerOption } from './types'

/** Navigation moves focus only; native button activation commits the value. */
export function getNextTimeOption<T extends number | TimePeriod>(
  options: readonly TimePickerOption<T>[],
  active: T | undefined,
  selected: T | undefined,
  direction: 1 | -1,
): T | undefined {
  const enabled = options.filter((option) => !option.disabled)
  if (!enabled.length) return undefined
  const current = enabled.findIndex((option) => option.value === (active ?? selected))
  if (current < 0) return (direction === 1 ? enabled[0] : enabled[enabled.length - 1])?.value
  return enabled[Math.min(enabled.length - 1, Math.max(0, current + direction))]?.value
}
