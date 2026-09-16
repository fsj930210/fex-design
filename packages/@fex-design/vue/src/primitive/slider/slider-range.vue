<script setup lang="ts">
import {
  convertValueToPercentage,
  getSliderRangeDisabledState,
  isSliderReversed,
} from '@fex-design/core/slider/utils'
import { sliderRangeClassName } from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import { computed, useAttrs } from 'vue'
import { useSliderContext } from './context'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const { snapshot } = useSliderContext('SliderRange')
const disabledState = computed(() =>
  getSliderRangeDisabledState(
    snapshot.value.values,
    snapshot.value.disabledThumbs,
    snapshot.value.orientation,
    snapshot.value.direction,
    snapshot.value.reverse,
  ),
)
const rangeStyle = computed(() => {
  const percentages = snapshot.value.values.map((value) =>
    convertValueToPercentage(value, snapshot.value.min, snapshot.value.max),
  )
  const start = snapshot.value.values.length > 1 ? Math.min(...percentages) : 0
  const endValue = Math.max(...percentages)
  const reversed = isSliderReversed(
    snapshot.value.orientation,
    snapshot.value.direction,
    snapshot.value.reverse,
  )
  const visualStart = reversed ? 100 - endValue : start
  const visualEnd = reversed ? start : 100 - endValue
  return snapshot.value.orientation === 'vertical'
    ? {
        bottom: `${visualStart}%`,
        top: `${visualEnd}%`,
        backgroundImage: disabledState.value.backgroundImage,
      }
    : {
        left: `${visualStart}%`,
        right: `${visualEnd}%`,
        backgroundImage: disabledState.value.backgroundImage,
      }
})
</script>

<template>
  <span
    data-slot="slider-range"
    v-bind="attrs"
    :data-disabled="snapshot.disabled || disabledState.disabled ? 'true' : undefined"
    :data-orientation="snapshot.orientation"
    :class="cn(sliderRangeClassName, attrs.class as string | undefined)"
    :style="[rangeStyle, attrs.style]"
  />
</template>
