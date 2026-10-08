import {
  convertValueToPercentage,
  getSliderRangeDisabledState,
  isSliderReversed,
} from '@fex-design/core/slider/utils'
import { sliderRangeClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useSliderContext } from './slider-context'

export interface SliderRangeProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function SliderRange(props: SliderRangeProps) {
  const [local, rest] = splitProps(props, ['class', 'style'])
  const { snapshot } = useSliderContext('SliderRange')
  const disabledState = () =>
    getSliderRangeDisabledState(
      snapshot().values,
      snapshot().disabledThumbs,
      snapshot().orientation,
      snapshot().direction,
      snapshot().reverse,
    )
  const rangeStyle = () => {
    const percentages = snapshot().values.map((value) =>
      convertValueToPercentage(value, snapshot().min, snapshot().max),
    )
    const start = snapshot().values.length > 1 ? Math.min(...percentages) : 0
    const endValue = Math.max(...percentages)
    const reversed = isSliderReversed(
      snapshot().orientation,
      snapshot().direction,
      snapshot().reverse,
    )
    const visualStart = reversed ? 100 - endValue : start
    const visualEnd = reversed ? start : 100 - endValue
    return snapshot().orientation === 'vertical'
      ? {
          bottom: `${visualStart}%`,
          top: `${visualEnd}%`,
          'background-image': disabledState().backgroundImage,
          ...(typeof local.style === 'object' ? local.style : {}),
        }
      : {
          left: `${visualStart}%`,
          right: `${visualEnd}%`,
          'background-image': disabledState().backgroundImage,
          ...(typeof local.style === 'object' ? local.style : {}),
        }
  }
  return (
    <span
      {...rest}
      data-slot="slider-range"
      data-disabled={snapshot().disabled || disabledState().disabled ? 'true' : undefined}
      data-orientation={snapshot().orientation}
      class={cn(sliderRangeClassName, local.class)}
      style={rangeStyle()}
    />
  )
}
