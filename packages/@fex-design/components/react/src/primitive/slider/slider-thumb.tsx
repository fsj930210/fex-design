import {
  convertValueToPercentage,
  isSliderReversed,
} from '@fex-design/core/slider/utils'
import { sliderThumbClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { type HTMLAttributes, type KeyboardEvent, type Ref } from 'react'
import { useSliderContext } from './slider-context'

function position(percent: number, vertical: boolean, reversed: boolean) {
  const value = reversed ? 100 - percent : percent
  return vertical ? { bottom: `${value}%` } : { left: `${value}%` }
}

export interface SliderThumbProps extends HTMLAttributes<HTMLSpanElement> {
  index?: number
  disabled?: boolean
  ref?: Ref<HTMLSpanElement>
}

export function SliderThumb({
  index = 0,
  disabled = false,
  ref,
  className,
  style,
  onFocus,
  onKeyDown,
  onKeyUp,
  children,
  ...props
}: SliderThumbProps) {
  const context = useSliderContext('SliderThumb')
  const { controller, snapshot } = context
  const value = snapshot.values[index] ?? snapshot.min
  const percent = convertValueToPercentage(value, snapshot.min, snapshot.max)
  const reversed = isSliderReversed(snapshot.orientation, snapshot.direction, snapshot.reverse)
  const isDisabled = snapshot.disabled || snapshot.disabledThumbs[index] || disabled
  const placement = position(percent, snapshot.orientation === 'vertical', reversed)
  const positionStyle =
    snapshot.orientation === 'vertical'
      ? {
          position: 'absolute' as const,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          ...placement,
        }
      : {
          position: 'absolute' as const,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          ...placement,
        }
  const keyDirection = (event: KeyboardEvent<HTMLSpanElement>) => {
    const visualReverse = isSliderReversed(
      snapshot.orientation,
      snapshot.direction,
      snapshot.reverse,
    )
    const map: Record<string, number> = {
      ArrowRight: visualReverse ? -1 : 1,
      ArrowLeft: visualReverse ? 1 : -1,
      ArrowUp: visualReverse && snapshot.orientation === 'vertical' ? -1 : 1,
      ArrowDown: visualReverse && snapshot.orientation === 'vertical' ? 1 : -1,
      PageUp: 10,
      PageDown: -10,
    }
    return map[event.key]
  }
  return (
    <span
      {...props}
      ref={ref}
      role="slider"
      tabIndex={isDisabled ? undefined : 0}
      aria-valuemin={snapshot.min}
      aria-valuemax={snapshot.max}
      aria-valuenow={value}
      aria-orientation={snapshot.orientation}
      aria-disabled={isDisabled || undefined}
      data-slot="slider-thumb"
      data-index={index}
      data-disabled={isDisabled ? '' : undefined}
      data-orientation={snapshot.orientation}
      className={cn(sliderThumbClassName, className)}
      style={{ ...positionStyle, ...style }}
      onFocus={(event) => {
        onFocus?.(event)
        controller.setActiveIndex(index)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || isDisabled || !snapshot.keyboard) return
        if (!event.repeat) controller.startSlide(value, 'keyboard')
        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault()
          controller.setValueAt(index, event.key === 'Home' ? snapshot.min : snapshot.max, {
            source: 'keyboard',
          })
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
          event.preventDefault()
          controller.removeValue(index)
        } else {
          const direction = keyDirection(event)
          if (direction !== undefined) {
            event.preventDefault()
            const visualDirection =
              isSliderReversed(snapshot.orientation, snapshot.direction, snapshot.reverse) &&
              event.key.startsWith('Arrow')
                ? -direction
                : direction
            controller.stepThumb(index, Math.sign(visualDirection), Math.abs(visualDirection))
          }
        }
      }}
      onKeyUp={(event) => {
        onKeyUp?.(event)
        if (!event.defaultPrevented) controller.endSlide()
      }}
    >
      {children}
    </span>
  )
}
