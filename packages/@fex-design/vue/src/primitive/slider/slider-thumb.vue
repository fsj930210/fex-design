<script setup lang="ts">
import { convertValueToPercentage, isSliderReversed } from '@fex-design/core/slider/utils'
import { sliderThumbClassName } from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import { computed, useAttrs, type CSSProperties } from 'vue'
import { useSliderContext } from './context'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ index?: number; disabled?: boolean }>(), {
  index: 0,
  disabled: false,
})
const attrs = useAttrs()
const context = useSliderContext('SliderThumb')
const value = computed(
  () => context.snapshot.value.values[props.index] ?? context.snapshot.value.min,
)
const percent = computed(() =>
  convertValueToPercentage(value.value, context.snapshot.value.min, context.snapshot.value.max),
)
const visualPercent = computed(() =>
  isSliderReversed(
    context.snapshot.value.orientation,
    context.snapshot.value.direction,
    context.snapshot.value.reverse,
  )
    ? 100 - percent.value
    : percent.value,
)
const isDisabled = computed(
  () =>
    context.snapshot.value.disabled ||
    context.snapshot.value.disabledThumbs[props.index] ||
    props.disabled,
)
const thumbStyle = computed<CSSProperties>(() =>
  context.snapshot.value.orientation === 'vertical'
    ? {
        position: 'absolute',
        bottom: `${visualPercent.value}%`,
        left: '50%',
        transform: 'translate(-50%, 50%)',
      }
    : {
        position: 'absolute',
        top: '50%',
        left: `${visualPercent.value}%`,
        transform: 'translate(-50%, -50%)',
      },
)

function handleKeydown(event: KeyboardEvent) {
  const snapshot = context.snapshot.value
  if (event.defaultPrevented || isDisabled.value || !snapshot.keyboard) return
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
    context.controller.setValueAt(props.index, snapshot.min, { source: 'keyboard' })
  } else if (event.key === 'End') {
    event.preventDefault()
    context.controller.setValueAt(props.index, snapshot.max, { source: 'keyboard' })
  } else if (event.key in keyMap) {
    event.preventDefault()
    const direction = keyMap[event.key]!
    const visualDirection =
      isSliderReversed(snapshot.orientation, snapshot.direction, snapshot.reverse) &&
      event.key.startsWith('Arrow')
        ? -direction
        : direction
    context.controller.stepThumb(
      props.index,
      visualDirection > 0 ? 1 : -1,
      Math.abs(visualDirection),
    )
  }
}
</script>

<template>
  <span
    data-slot="slider-thumb"
    :data-index="props.index"
    v-bind="attrs"
    role="slider"
    :tabindex="isDisabled ? undefined : 0"
    :aria-valuemin="context.snapshot.value.min"
    :aria-valuemax="context.snapshot.value.max"
    :aria-valuenow="value"
    :aria-orientation="context.snapshot.value.orientation"
    :aria-disabled="isDisabled || undefined"
    :data-disabled="isDisabled ? '' : undefined"
    :data-orientation="context.snapshot.value.orientation"
    :class="cn(sliderThumbClassName, attrs.class as string | undefined)"
    :style="[thumbStyle, attrs.style]"
    @focus="context.controller.setActiveIndex(props.index)"
    @keydown="handleKeydown"
    @keyup="context.controller.endSlide()"
  />
</template>
