<script setup lang="ts">
import { aspectRatioClassName } from '@fex-design/styles/aspect-ratio'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import type { AspectRatioOptions } from '@fex-design/core/aspect-ratio/types'
defineOptions({ inheritAttrs: false })
const props = defineProps<AspectRatioOptions>()
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="aspect-ratio"
    :class="cn(aspectRatioClassName, attrs.class as string | undefined)"
    :style="[{ aspectRatio: props.ratio }, attrs.style]"
  >
    <slot />
  </div>
</template>
