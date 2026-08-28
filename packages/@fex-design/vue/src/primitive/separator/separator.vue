<script setup lang="ts">
import { separatorClassName } from '@fex-design/styles/separator'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
import type { SeparatorOptions } from '@fex-design/core/separator/types'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SeparatorOptions>(), { orientation: 'horizontal' })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    role="separator"
    :aria-orientation="props.orientation"
    data-slot="separator"
    :data-orientation="props.orientation"
    :class="cn(separatorClassName, attrs.class as string | undefined)"
  />
</template>
