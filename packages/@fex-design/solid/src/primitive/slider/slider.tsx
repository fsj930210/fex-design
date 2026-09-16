import { createSliderController } from '@fex-design/core/slider/create-slider-controller'
import type {
  SliderChangeMeta,
  SliderDirection,
  SliderOrientation,
} from '@fex-design/core/slider/types'
import { getSliderValueFromPointer } from '@fex-design/core/slider/utils'
import { sliderRootClassName, type SliderStyleProps } from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import { splitProps, type JSX } from 'solid-js'
import { createCoreStoreSignal } from '../../primitives/create-core-store-signal'

import { SliderContext } from './slider-context'

export interface SliderRootProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>, SliderStyleProps {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number | null
  marks?: readonly number[]
  minStepsBetweenThumbs?: number
  orientation?: SliderOrientation
  direction?: SliderDirection
  reverse?: boolean
  disabledThumbs?: readonly boolean[]
  keyboard?: boolean
  draggableRange?: boolean
  editable?: boolean
  minCount?: number
  maxCount?: number
  disabled?: boolean
  onChange?: (value: number[], meta: SliderChangeMeta) => void
  onEnd?: (value: number[], meta: SliderChangeMeta) => void
}

export function SliderRoot(props: SliderRootProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'min',
    'max',
    'step',
    'marks',
    'minStepsBetweenThumbs',
    'orientation',
    'direction',
    'reverse',
    'disabledThumbs',
    'keyboard',
    'draggableRange',
    'editable',
    'minCount',
    'maxCount',
    'disabled',
    'size',
    'class',
    'children',
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onChange',
    'onEnd',
  ])
  let rootElement: HTMLDivElement | undefined
  let dragRange = false
  let pointerOffset = 0
  const options = {
    get value() {
      return local.value
    },
    get defaultValue() {
      return local.defaultValue
    },
    get min() {
      return local.min
    },
    get max() {
      return local.max
    },
    get step() {
      return local.step
    },
    get marks() {
      return local.marks
    },
    get minStepsBetweenThumbs() {
      return local.minStepsBetweenThumbs
    },
    get orientation() {
      return local.orientation
    },
    get direction() {
      return local.direction ?? (rest.dir === 'rtl' ? 'rtl' : 'ltr')
    },
    get reverse() {
      return local.reverse
    },
    get disabledThumbs() {
      return local.disabledThumbs
    },
    get keyboard() {
      return local.keyboard
    },
    get draggableRange() {
      return local.draggableRange
    },
    get editable() {
      return local.editable
    },
    get minCount() {
      return local.minCount
    },
    get maxCount() {
      return local.maxCount
    },
    get disabled() {
      return local.disabled
    },
    onChange: (value: number[], meta: SliderChangeMeta) => local.onChange?.(value, meta),
    onEnd: (value: number[], meta: SliderChangeMeta) => local.onEnd?.(value, meta),
  }
  const controller = createSliderController(options)
  const storeSnapshot = createCoreStoreSignal(controller)
  const snapshot = () => {
    storeSnapshot()
    return controller.getSnapshot()
  }
  const size = () => local.size ?? 'md'

  return (
    <SliderContext.Provider value={{ controller, snapshot, rootElement: () => rootElement }}>
      <div
        {...rest}
        ref={(element) => {
          rootElement = element
        }}
        data-disabled={
          snapshot().disabled ||
          (snapshot().disabledThumbs.length > 0 && snapshot().disabledThumbs.every(Boolean))
            ? 'true'
            : undefined
        }
        data-orientation={snapshot().orientation}
        data-slot="slider"
        data-reverse={snapshot().reverse ? '' : undefined}
        class={cn(
          sliderRootClassName({ size: size(), orientation: snapshot().orientation }),
          local.class,
        )}
        onPointerDown={(event) => {
          if (typeof local.onPointerDown === 'function') local.onPointerDown(event)
          if (event.defaultPrevented || snapshot().disabled || !rootElement) return
          rootElement.setPointerCapture(event.pointerId)
          const nextValue = getSliderValueFromPointer(
            event.clientX,
            event.clientY,
            rootElement.getBoundingClientRect(),
            snapshot().min,
            snapshot().max,
            snapshot().orientation,
            snapshot().direction,
            snapshot().reverse,
          )
          const target = event.target as HTMLElement
          const thumbIndex = Number(
            target.closest('[data-slot="slider-thumb"]')?.getAttribute('data-index'),
          )
          if (Number.isInteger(thumbIndex)) {
            controller.setActiveIndex(thumbIndex)
            pointerOffset = snapshot().values[thumbIndex]! - nextValue
          } else pointerOffset = 0
          dragRange = !!target.closest('[data-slot="slider-range"]') && snapshot().draggableRange
          if (dragRange) controller.startRangeSlide(nextValue)
          else if (snapshot().editable && !target.closest('[data-slot="slider-thumb"]'))
            controller.addValue(nextValue)
          else
            controller.startSlide(
              Number.isInteger(thumbIndex) ? snapshot().values[thumbIndex]! : nextValue,
            )
        }}
        onPointerMove={(event) => {
          if (typeof local.onPointerMove === 'function') local.onPointerMove(event)
          if (
            event.defaultPrevented ||
            snapshot().disabled ||
            !rootElement?.hasPointerCapture(event.pointerId)
          )
            return
          const nextValue = getSliderValueFromPointer(
            event.clientX,
            event.clientY,
            rootElement.getBoundingClientRect(),
            snapshot().min,
            snapshot().max,
            snapshot().orientation,
            snapshot().direction,
            snapshot().reverse,
          )
          dragRange
            ? controller.moveRangeSlide(nextValue)
            : controller.moveSlide(nextValue + pointerOffset)
        }}
        onPointerUp={(event) => {
          if (typeof local.onPointerUp === 'function') local.onPointerUp(event)
          if (!rootElement?.hasPointerCapture(event.pointerId)) return
          rootElement.releasePointerCapture(event.pointerId)
          controller.endSlide()
          dragRange = false
        }}
        onPointerCancel={() => {
          dragRange = false
          controller.cancelSlide()
        }}
        onLostPointerCapture={() => {
          dragRange = false
          controller.cancelSlide()
        }}
      >
        {local.children}
      </div>
    </SliderContext.Provider>
  )
}

export { SliderMark, SliderRange, SliderThumb, SliderTrack } from './slider-parts'
export type {
  SliderMarkProps,
  SliderRangeProps,
  SliderThumbProps,
  SliderTrackProps,
} from './slider-parts'
