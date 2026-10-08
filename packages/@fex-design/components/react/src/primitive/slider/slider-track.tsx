import { sliderTrackClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { type HTMLAttributes, type Ref } from 'react'
import { useSliderContext } from './slider-context'

export interface SliderTrackProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>
}

export function SliderTrack({ ref, className, ...props }: SliderTrackProps) {
  const { snapshot } = useSliderContext('SliderTrack')
  return (
    <span
      {...props}
      ref={ref}
      data-slot="slider-track"
      data-disabled={
        snapshot.disabled ||
        (snapshot.disabledThumbs.length > 0 && snapshot.disabledThumbs.every(Boolean))
          ? ''
          : undefined
      }
      data-orientation={snapshot.orientation}
      className={cn(sliderTrackClassName, className)}
    />
  )
}
