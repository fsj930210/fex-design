<script setup lang="ts">
import { inputSuffixClassName } from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string }>()
</script>
<template>
  <span v-bind="$attrs" data-slot="input-suffix" :class="cn(inputSuffixClassName, props.class)"
    ><slot
  /></span>
</template>
