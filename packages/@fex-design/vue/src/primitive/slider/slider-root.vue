<script setup lang="ts">
import { createSliderController } from '@fex-design/core/slider/create-slider-controller'
import type {
  SliderChangeMeta,
  SliderDirection,
  SliderOrientation,
} from '@fex-design/core/slider/types'
import { getSliderValueFromPointer } from '@fex-design/core/slider/utils'
import { sliderRootClassName, type SliderStyleProps } from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import { computed, provide, ref, useAttrs } from 'vue'
import { useCoreStore } from '../../composables/use-core-store'
import { sliderContextKey } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    defaultValue?: number[]
    disabled?: boolean
    max?: number
    min?: number
    minStepsBetweenThumbs?: number
    orientation?: SliderOrientation
    direction?: SliderDirection
    reverse?: boolean
    marks?: number[]
    disabledThumbs?: boolean[]
    keyboard?: boolean
    draggableRange?: boolean
    editable?: boolean
    minCount?: number
    maxCount?: number
    size?: SliderStyleProps['size']
    step?: number | null
    value?: number[]
  }>(),
  {
    disabled: false,
    max: 100,
    min: 0,
    minStepsBetweenThumbs: 0,
    orientation: 'horizontal',
    reverse: false,
    marks: () => [],
    disabledThumbs: () => [],
    keyboard: true,
    draggableRange: false,
    editable: false,
    minCount: 0,
    maxCount: Number.POSITIVE_INFINITY,
    size: 'md',
    step: 1,
  },
)

const emit = defineEmits<{
  change: [value: number[], meta: SliderChangeMeta]
  end: [value: number[], meta: SliderChangeMeta]
}>()

const attrs = useAttrs()
const rootElement = ref<HTMLDivElement>()
let dragRange = false
let pointerOffset = 0
const options = {
  get value() {
    return props.value
  },
  get defaultValue() {
    return props.defaultValue
  },
  get min() {
    return props.min
  },
  get max() {
    return props.max
  },
  get step() {
    return props.step
  },
  get marks() {
    return props.marks
  },
  get minStepsBetweenThumbs() {
    return props.minStepsBetweenThumbs
  },
  get orientation() {
    return props.orientation
  },
  get direction() {
    return props.direction ?? (attrs.dir === 'rtl' ? 'rtl' : 'ltr')
  },
  get reverse() {
    return props.reverse
  },
  get disabledThumbs() {
    return props.disabledThumbs
  },
  get keyboard() {
    return props.keyboard
  },
  get draggableRange() {
    return props.draggableRange
  },
  get editable() {
    return props.editable
  },
  get minCount() {
    return props.minCount
  },
  get maxCount() {
    return props.maxCount
  },
  get disabled() {
    return props.disabled
  },
  onChange: (value: number[], meta: SliderChangeMeta) => emit('change', value, meta),
  onEnd: (value: number[], meta: SliderChangeMeta) => emit('end', value, meta),
}
const controller = createSliderController(options)
const storeSnapshot = useCoreStore(controller)
const snapshot = computed(() => {
  void storeSnapshot.value
  return controller.getSnapshot()
})

provide(sliderContextKey, { controller, rootElement, snapshot })

function pointerValue(event: PointerEvent) {
  const element = rootElement.value
  if (!element) return undefined
  return getSliderValueFromPointer(
    event.clientX,
    event.clientY,
    element.getBoundingClientRect(),
    snapshot.value.min,
    snapshot.value.max,
    snapshot.value.orientation,
    snapshot.value.direction,
    snapshot.value.reverse,
  )
}

function handlePointerDown(event: PointerEvent) {
  if (event.defaultPrevented || snapshot.value.disabled || !rootElement.value) return
  const value = pointerValue(event)
  if (value === undefined) return
  rootElement.value.setPointerCapture(event.pointerId)
  const target = event.target as HTMLElement
  const thumbIndex = Number(
    target.closest('[data-slot="slider-thumb"]')?.getAttribute('data-index'),
  )
  if (Number.isInteger(thumbIndex)) {
    controller.setActiveIndex(thumbIndex)
    pointerOffset = snapshot.value.values[thumbIndex]! - value
  } else pointerOffset = 0
  dragRange = !!target.closest('[data-slot="slider-range"]') && snapshot.value.draggableRange
  if (dragRange) controller.startRangeSlide(value)
  else if (snapshot.value.editable && !target.closest('[data-slot="slider-thumb"]'))
    controller.addValue(value)
  else controller.startSlide(Number.isInteger(thumbIndex) ? snapshot.value.values[thumbIndex]! : value)
}

function handlePointerMove(event: PointerEvent) {
  if (
    event.defaultPrevented ||
    snapshot.value.disabled ||
    !rootElement.value?.hasPointerCapture(event.pointerId)
  )
    return
  const value = pointerValue(event)
  if (value !== undefined)
    dragRange ? controller.moveRangeSlide(value) : controller.moveSlide(value + pointerOffset)
}

function handlePointerUp(event: PointerEvent) {
  if (!rootElement.value?.hasPointerCapture(event.pointerId)) return
  rootElement.value.releasePointerCapture(event.pointerId)
  controller.endSlide()
  dragRange = false
}

function handlePointerCancel() {
  dragRange = false
  controller.cancelSlide()
}
</script>

<template>
  <div
    v-bind="attrs"
    ref="rootElement"
    :data-disabled="snapshot.disabled || (snapshot.disabledThumbs.length > 0 && snapshot.disabledThumbs.every(Boolean)) ? 'true' : undefined"
    :data-orientation="snapshot.orientation"
    :data-reverse="snapshot.reverse ? '' : undefined"
    data-slot="slider"
    :class="
      cn(
        sliderRootClassName({ size: props.size, orientation: snapshot.orientation }),
        attrs.class as string | undefined,
      )
    "
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerCancel"
    @lostpointercapture="handlePointerCancel"
  >
    <slot :snapshot="snapshot" :values="snapshot.values" />
  </div>
</template>
