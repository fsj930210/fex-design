import {
  convertValueToPercentage,
  isSliderReversed,
} from '@fex-design/core/slider/utils'
import { sliderThumbClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useSliderContext } from './slider-context'

export interface SliderThumbProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  index?: number
  disabled?: boolean
}

export function SliderThumb(props: SliderThumbProps) {
  const [local, rest] = splitProps(props, [
    'index',
    'disabled',
    'class',
    'style',
    'onFocus',
    'onKeyDown',
    'onKeyUp',
  ])
  const context = useSliderContext('SliderThumb')
  const index = () => local.index ?? 0
  const value = () => context.snapshot().values[index()] ?? context.snapshot().min
  const percent = () =>
    convertValueToPercentage(value(), context.snapshot().min, context.snapshot().max)
  const visualPercent = () =>
    isSliderReversed(
      context.snapshot().orientation,
      context.snapshot().direction,
      context.snapshot().reverse,
    )
      ? 100 - percent()
      : percent()
  const disabled = () =>
    context.snapshot().disabled || context.snapshot().disabledThumbs[index()] || local.disabled
  const customStyle = () =>
    typeof local.style === 'object' ? (local.style as JSX.CSSProperties) : {}
  const thumbStyle = (): JSX.CSSProperties =>
    context.snapshot().orientation === 'vertical'
      ? {
          position: 'absolute',
          bottom: `${visualPercent()}%`,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          ...customStyle(),
        }
      : {
          position: 'absolute',
          top: '50%',
          left: `${visualPercent()}%`,
          transform: 'translate(-50%, -50%)',
          ...customStyle(),
        }

  return (
    <span
      {...rest}
      data-slot="slider-thumb"
      data-index={index()}
      role="slider"
      tabIndex={disabled() ? undefined : 0}
      aria-valuemin={context.snapshot().min}
      aria-valuemax={context.snapshot().max}
      aria-valuenow={value()}
      aria-orientation={context.snapshot().orientation}
      aria-disabled={disabled() || undefined}
      data-disabled={disabled() ? '' : undefined}
      data-orientation={context.snapshot().orientation}
      class={cn(sliderThumbClassName, local.class)}
      style={thumbStyle()}
      onFocus={(event) => {
        if (typeof local.onFocus === 'function') local.onFocus(event)
        context.controller.setActiveIndex(index())
      }}
      onKeyDown={(event) => {
        if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
        if (event.defaultPrevented || disabled() || !context.snapshot().keyboard) return
        if (!event.repeat) context.controller.startSlide(value(), 'keyboard')
        const keyMap: Record<string, number> = {
          ArrowRight: 1,
          ArrowUp: 1,
          ArrowLeft: -1,
          ArrowDown: -1,
          PageUp: 10,
          PageDown: -10,
        }
        if (event.key === 'Home') {
          event.preventDefault()
          context.controller.setValueAt(index(), context.snapshot().min, { source: 'keyboard' })
        } else if (event.key === 'End') {
          event.preventDefault()
          context.controller.setValueAt(index(), context.snapshot().max, { source: 'keyboard' })
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
          event.preventDefault()
          context.controller.removeValue(index())
        } else if (event.key in keyMap) {
          event.preventDefault()
          const direction = keyMap[event.key]!
          const visualDirection =
            isSliderReversed(
              context.snapshot().orientation,
              context.snapshot().direction,
              context.snapshot().reverse,
            ) && event.key.startsWith('Arrow')
              ? -direction
              : direction
          context.controller.stepThumb(
            index(),
            visualDirection > 0 ? 1 : -1,
            Math.abs(visualDirection),
          )
        }
      }}
      onKeyUp={(event) => {
        if (typeof local.onKeyUp === 'function') local.onKeyUp(event)
        context.controller.endSlide()
      }}
    />
  )
}
