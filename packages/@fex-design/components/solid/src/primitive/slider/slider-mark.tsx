import {
  convertValueToPercentage,
  isSliderMarkActive,
  isSliderReversed,
} from '@fex-design/core/slider/utils'
import { sliderMarkClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useSliderContext } from './slider-context'

export interface SliderMarkProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  value: number
}

export function SliderMark(props: SliderMarkProps) {
  const [local, rest] = splitProps(props, ['value', 'class', 'style', 'children'])
  const { snapshot } = useSliderContext('SliderMark')
  const visual = () => {
    const percent = convertValueToPercentage(local.value, snapshot().min, snapshot().max)
    return isSliderReversed(snapshot().orientation, snapshot().direction, snapshot().reverse)
      ? 100 - percent
      : percent
  }
  const placement = () =>
    snapshot().orientation === 'vertical' ? { bottom: `${visual()}%` } : { left: `${visual()}%` }
  return (
    <span
      {...rest}
      data-slot="slider-mark"
      data-active={isSliderMarkActive(snapshot().values, local.value) ? 'true' : 'false'}
      data-edge={visual() === 0 ? 'start' : visual() === 100 ? 'end' : undefined}
      data-orientation={snapshot().orientation}
      class={cn(sliderMarkClassName, local.class)}
      style={{ ...placement(), ...(typeof local.style === 'object' ? local.style : {}) }}
    >
      <span>{local.children}</span>
    </span>
  )
}
