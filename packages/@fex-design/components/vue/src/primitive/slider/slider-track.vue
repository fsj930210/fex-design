<script setup lang="ts">
import { sliderTrackClassName } from '@fex-design/components-styles/slider'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
import { useSliderContext } from './context'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const { snapshot } = useSliderContext('SliderTrack')
</script>

<template>
  <span
    data-slot="slider-track"
    v-bind="attrs"
    :data-disabled="
      snapshot.disabled ||
      (snapshot.disabledThumbs.length > 0 && snapshot.disabledThumbs.every(Boolean))
        ? 'true'
        : undefined
    "
    :data-orientation="snapshot.orientation"
    :class="cn(sliderTrackClassName, attrs.class as string | undefined)"
    ><slot
  /></span>
</template>
