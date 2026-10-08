import { tourArrowClassName } from '@fex-design/components-styles/tour'
import { cn } from '@fex-design/utils'
import { createMemo, onCleanup, type JSX } from 'solid-js'
import { useTourContentContext } from './tour-context'

export interface TourArrowProps {
  class?: string
  style?: JSX.CSSProperties
}

export function TourArrow(props: TourArrowProps) {
  const { floating, snapshot } = useTourContentContext('TourArrow')
  onCleanup(() => floating.setArrowElement(null))
  const style = createMemo(() =>
    snapshot().side === 'top'
      ? {
          bottom: '-6px',
          left: 'var(--floating-arrow-x, 50%)',
          'border-left': '6px solid transparent',
          'border-right': '6px solid transparent',
          'border-top': '6px solid var(--background)',
        }
      : snapshot().side === 'bottom'
        ? {
            top: '-6px',
            left: 'var(--floating-arrow-x, 50%)',
            'border-left': '6px solid transparent',
            'border-right': '6px solid transparent',
            'border-bottom': '6px solid var(--background)',
          }
        : snapshot().side === 'left'
          ? {
              right: '-6px',
              top: 'var(--floating-arrow-y, 50%)',
              'border-top': '6px solid transparent',
              'border-bottom': '6px solid transparent',
              'border-left': '6px solid var(--background)',
            }
          : {
              left: '-6px',
              top: 'var(--floating-arrow-y, 50%)',
              'border-top': '6px solid transparent',
              'border-bottom': '6px solid transparent',
              'border-right': '6px solid var(--background)',
            },
  )
  return (
    <div
      ref={(element) => floating.setArrowElement(element)}
      data-slot="tour-arrow"
      data-side={snapshot().side}
      class={cn(tourArrowClassName, props.class)}
      style={{ ...style(), ...props.style }}
    />
  )
}
