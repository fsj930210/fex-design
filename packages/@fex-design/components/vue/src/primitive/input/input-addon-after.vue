<script setup lang="ts">
import { inputAddonAfterClassName } from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string }>()
</script>
<template>
  <span
    v-bind="$attrs"
    data-slot="input-addon-after"
    :class="cn(inputAddonAfterClassName, props.class)"
    ><slot
  /></span>
</template>
