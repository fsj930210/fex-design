import {
  convertValueToPercentage,
  isSliderMarkActive,
  isSliderReversed,
} from '@fex-design/core/slider/utils'
import { sliderMarkClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { type HTMLAttributes, type Ref } from 'react'
import { useSliderContext } from './slider-context'

function position(percent: number, vertical: boolean, reversed: boolean) {
  const value = reversed ? 100 - percent : percent
  return vertical ? { bottom: `${value}%` } : { left: `${value}%` }
}

export interface SliderMarkProps extends HTMLAttributes<HTMLSpanElement> {
  value: number
  ref?: Ref<HTMLSpanElement>
}

export function SliderMark({ value, ref, className, style, children, ...props }: SliderMarkProps) {
  const { snapshot } = useSliderContext('SliderMark')
  const percent = convertValueToPercentage(value, snapshot.min, snapshot.max)
  const reversed = isSliderReversed(snapshot.orientation, snapshot.direction, snapshot.reverse)
  const visualPercent = reversed ? 100 - percent : percent
  const active = isSliderMarkActive(snapshot.values, value)
  const placement = position(percent, snapshot.orientation === 'vertical', reversed)
  return (
    <span
      {...props}
      ref={ref}
      data-slot="slider-mark"
      data-active={active ? 'true' : 'false'}
      data-edge={visualPercent === 0 ? 'start' : visualPercent === 100 ? 'end' : undefined}
      data-orientation={snapshot.orientation}
      className={cn(sliderMarkClassName, className)}
      style={{ ...placement, ...style }}
    >
      <span>{children}</span>
    </span>
  )
}
