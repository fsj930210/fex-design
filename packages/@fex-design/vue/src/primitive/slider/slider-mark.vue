<script setup lang="ts">
import { convertValueToPercentage, isSliderMarkActive, isSliderReversed } from '@fex-design/core/slider/utils'
import { sliderMarkClassName } from '@fex-design/styles/slider'
import { cn } from '@fex/utils'
import { computed, useAttrs } from 'vue'
import { useSliderContext } from './context'
defineOptions({ name: 'SliderMark', inheritAttrs: false })
const props = defineProps<{ value: number }>()
const attrs = useAttrs()
const { snapshot } = useSliderContext('SliderMark')
const visualPercent = computed(() => {
  const percent = convertValueToPercentage(props.value, snapshot.value.min, snapshot.value.max)
  return isSliderReversed(
    snapshot.value.orientation,
    snapshot.value.direction,
    snapshot.value.reverse,
  )
    ? 100 - percent
    : percent
})
const markStyle = computed(() =>
  snapshot.value.orientation === 'vertical'
    ? { bottom: `${visualPercent.value}%` }
    : { left: `${visualPercent.value}%` },
)
const active = computed(() => isSliderMarkActive(snapshot.value.values, props.value))
const edge = computed(() =>
  visualPercent.value === 0 ? 'start' : visualPercent.value === 100 ? 'end' : undefined,
)
</script>
<template>
  <span
    v-bind="attrs"
    data-slot="slider-mark"
    :data-active="active ? 'true' : 'false'"
    :data-edge="edge"
    :data-orientation="snapshot.orientation"
    :class="cn(sliderMarkClassName, attrs.class as string | undefined)"
    :style="[markStyle, attrs.style]"
    ><span><slot /></span
  ></span>
</template>
