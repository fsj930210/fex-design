import { createSliderController } from '@fex-design/core/slider/create-slider-controller'
import type {
  SliderChangeMeta,
  SliderDirection,
  SliderOptions,
  SliderOrientation,
} from '@fex-design/core/slider/types'
import { getSliderValueFromPointer } from '@fex-design/core/slider/utils'
import { sliderRootClassName, type SliderStyleProps } from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import { useRef, type HTMLAttributes, type MutableRefObject, type Ref } from 'react'
import { useCoreStore } from '../../hooks/use-core-store'
import { useLazyRef } from '../../hooks/use-lazy-ref'
import { SliderContext } from './slider-context'

export interface SliderRootProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'onDragEnd'>,
    SliderStyleProps {
  value?: readonly number[]
  defaultValue?: readonly number[]
  min?: number
  max?: number
  step?: number | null
  marks?: readonly number[]
  minStepsBetweenThumbs?: number
  orientation?: SliderOrientation
  direction?: SliderDirection
  reverse?: boolean
  disabled?: boolean
  disabledThumbs?: readonly boolean[]
  keyboard?: boolean
  draggableRange?: boolean
  editable?: boolean
  minCount?: number
  maxCount?: number
  ref?: Ref<HTMLDivElement>
  onChange?: (value: number[], meta: SliderChangeMeta) => void
  onEnd?: (value: number[], meta: SliderChangeMeta) => void
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T) =>
    refs.forEach((ref) =>
      typeof ref === 'function' ? ref(node) : ref && ((ref as MutableRefObject<T>).current = node),
    )
}

export function SliderRoot({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  marks = [],
  minStepsBetweenThumbs = 0,
  orientation = 'horizontal',
  direction,
  reverse = false,
  disabled = false,
  disabledThumbs = [],
  keyboard = true,
  draggableRange = false,
  editable = false,
  minCount = 0,
  maxCount = Number.POSITIVE_INFINITY,
  size = 'md',
  className,
  ref,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  onChange,
  onEnd,
  ...props
}: SliderRootProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const dragRangeRef = useRef(false)
  const pointerOffsetRef = useRef(0)
  const resolvedDirection = direction ?? (props.dir === 'rtl' ? 'rtl' : 'ltr')
  const optionsRef = useRef<SliderOptions>({})
  Object.assign(optionsRef.current, {
    value,
    defaultValue,
    min,
    max,
    step,
    marks,
    minStepsBetweenThumbs,
    orientation,
    direction: resolvedDirection,
    reverse,
    disabled,
    disabledThumbs,
    keyboard,
    draggableRange,
    editable,
    minCount,
    maxCount,
    onChange,
    onEnd,
  })
  const controllerRef = useLazyRef(() => createSliderController(optionsRef.current))
  const snapshot = useCoreStore(controllerRef.current)
  const pointerValue = (event: { clientX: number; clientY: number }) => {
    const rect = rootRef.current!.getBoundingClientRect()
    return getSliderValueFromPointer(
      event.clientX,
      event.clientY,
      rect,
      snapshot.min,
      snapshot.max,
      snapshot.orientation,
      snapshot.direction,
      snapshot.reverse,
    )
  }

  return (
    <SliderContext value={{ controller: controllerRef.current, snapshot, rootRef }}>
      <div
        {...props}
        ref={composeRefs(rootRef, ref)}
        dir={direction ?? props.dir}
        data-slot="slider"
        data-disabled={snapshot.disabled || (snapshot.disabledThumbs.length > 0 && snapshot.disabledThumbs.every(Boolean)) ? '' : undefined}
        data-orientation={snapshot.orientation}
        data-reverse={snapshot.reverse ? '' : undefined}
        className={cn(sliderRootClassName({ size, orientation: snapshot.orientation }), className)}
        onPointerDown={(event) => {
          onPointerDown?.(event)
          if (event.defaultPrevented || snapshot.disabled || !rootRef.current) return
          const target = event.target as HTMLElement
          const thumbIndex = Number(
            target.closest('[data-slot="slider-thumb"]')?.getAttribute('data-index'),
          )
          rootRef.current.setPointerCapture(event.pointerId)
          const nextValue = pointerValue(event)
          if (Number.isInteger(thumbIndex)) {
            controllerRef.current.setActiveIndex(thumbIndex)
            pointerOffsetRef.current = snapshot.values[thumbIndex]! - nextValue
          } else pointerOffsetRef.current = 0
          dragRangeRef.current =
            !!target.closest('[data-slot="slider-range"]') && snapshot.draggableRange
          if (dragRangeRef.current) controllerRef.current.startRangeSlide(nextValue)
          else if (snapshot.editable && !target.closest('[data-slot="slider-thumb"]'))
            controllerRef.current.addValue(nextValue)
          else
            controllerRef.current.startSlide(
              Number.isInteger(thumbIndex) ? snapshot.values[thumbIndex]! : nextValue,
            )
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event)
          if (
            event.defaultPrevented ||
            snapshot.disabled ||
            !rootRef.current?.hasPointerCapture(event.pointerId)
          )
            return
          if (dragRangeRef.current) controllerRef.current.moveRangeSlide(pointerValue(event))
          else controllerRef.current.moveSlide(pointerValue(event) + pointerOffsetRef.current)
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event)
          if (!rootRef.current?.hasPointerCapture(event.pointerId)) return
          controllerRef.current.endSlide()
          dragRangeRef.current = false
          rootRef.current.releasePointerCapture(event.pointerId)
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event)
          dragRangeRef.current = false
          controllerRef.current.cancelSlide()
        }}
        onLostPointerCapture={(event) => {
          onLostPointerCapture?.(event)
          dragRangeRef.current = false
          controllerRef.current.cancelSlide()
        }}
      >
        {children}
      </div>
    </SliderContext>
  )
}
