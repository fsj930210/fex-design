<script setup lang="ts">
import { colorPickerTransparencyGridClassName } from '@fex-design/components-styles/color-picker'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <span
    v-bind="attrs"
    :class="cn(colorPickerTransparencyGridClassName, attrs.class as string | undefined)"
  />
</template>
