import {
  convertValueToPercentage,
  getSliderRangeDisabledState,
  isSliderReversed,
} from '@fex-design/core/slider/utils'
import { sliderRangeClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { type HTMLAttributes, type Ref } from 'react'
import { useSliderContext } from './slider-context'

export interface SliderRangeProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>
}

export function SliderRange({ ref, className, style, ...props }: SliderRangeProps) {
  const { snapshot } = useSliderContext('SliderRange')
  const percentages = snapshot.values.map((value) =>
    convertValueToPercentage(value, snapshot.min, snapshot.max),
  )
  const reversed = isSliderReversed(snapshot.orientation, snapshot.direction, snapshot.reverse)
  const start = snapshot.values.length > 1 ? Math.min(...percentages) : 0
  const end = Math.max(...percentages)
  const visualStart = reversed ? 100 - end : start
  const visualEnd = reversed ? start : 100 - end
  const disabledState = getSliderRangeDisabledState(
    snapshot.values,
    snapshot.disabledThumbs,
    snapshot.orientation,
    snapshot.direction,
    snapshot.reverse,
  )
  const rangeStyle =
    snapshot.orientation === 'vertical'
      ? { bottom: `${visualStart}%`, top: `${visualEnd}%` }
      : { left: `${visualStart}%`, right: `${visualEnd}%` }
  return (
    <span
      {...props}
      ref={ref}
      data-slot="slider-range"
      data-disabled={snapshot.disabled || disabledState.disabled ? '' : undefined}
      data-orientation={snapshot.orientation}
      className={cn(sliderRangeClassName, className)}
      style={{ ...rangeStyle, backgroundImage: disabledState.backgroundImage, ...style }}
    />
  )
}
