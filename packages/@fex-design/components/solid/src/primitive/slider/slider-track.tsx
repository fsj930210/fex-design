import { sliderTrackClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useSliderContext } from './slider-context'

export interface SliderTrackProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function SliderTrack(props: SliderTrackProps) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  const { snapshot } = useSliderContext('SliderTrack')
  return (
    <span
      {...rest}
      data-slot="slider-track"
      data-disabled={
        snapshot().disabled ||
        (snapshot().disabledThumbs.length > 0 && snapshot().disabledThumbs.every(Boolean))
          ? 'true'
          : undefined
      }
      data-orientation={snapshot().orientation}
      class={cn(sliderTrackClassName, local.class)}
    >
      {local.children}
    </span>
  )
}
